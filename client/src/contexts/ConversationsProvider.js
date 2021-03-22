import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = createContext()


 // check if all elements in arrays match
const arraysEqual = (a, b) => {
    if (a === null || b === null) return false
    if (a.length !== b.length) return false

    a.sort()
    b.sort()
   
    return a.every((elem, i) => {
        return elem === b[i]
    })
}


export const useConversations = () => {
    return useContext(ConversationsContext)
}


export const ConversationsProvider = ({children, id}) => {

    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConvIndex, setSelectedConvIndex] = useState(0)
    const { contacts } = useContacts()
    const socket = useSocket()
    

    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    const addMsgToConversation = useCallback(({ recipients, text, sender }) => {
        setConversations(prevConversations => {
            let changesMade = false
            const newMsg = { sender, text }

            const newConvos = prevConversations.map(convo => {
                if (arraysEqual(convo.recipients, recipients)) {
                    changesMade = true
                    return {...convo, messages: [...convo.messages, newMsg]}
                }
                return convo
            })

            if (changesMade) {
                return newConvos
            }
            else {
                return [...prevConversations, { recipients, messages: [newMsg] }]
            }
        })
    }, [setConversations])


    useEffect(() => {
        if (socket == null) return
        socket.on('receive-message', addMsgToConversation)

        return () => socket.off('receive-message')
    }, [socket, addMsgToConversation])

    const sendMsg = (recipients, text) => {
        socket.emit('send-message', { recipients, text })
        addMsgToConversation({ recipients, text, sender: id })
    }

    const formattedConvos = conversations.map((item, i) => {
        const recipients = item.recipients.map((recipient, i) => {
            const contact = contacts.find(item => {
                return item.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages = item.messages.map(msg => {
            const contact = contacts.find(item => {
                return item.id === msg.sender
            })
            const name = (contact && contact.name) || msg.sender
            const fromMe = id === msg.sender
            return {...msg, senderName: name, fromMe}
        })
        // set selected to true if index matches selected index
        const isSelected = i === selectedConvIndex
        return {...conversations, messages, recipients, isSelected}
    })

    
    return (
        <ConversationsContext.Provider value={{ 
            conversations: formattedConvos, 
            selectedConv: formattedConvos[selectedConvIndex],
            sendMsg,
            selectConvIndex: setSelectedConvIndex, 
            createConversation }}>
            {children}
        </ConversationsContext.Provider>
    )
}
