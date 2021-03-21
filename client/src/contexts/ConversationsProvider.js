import React, { useContext, createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

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
    const { contacts } = useContacts()
    const [selectedConvIndex, setSelectedConvIndex] = useState(0)

    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    const addMsgToConversation = ({ recipients, text, sender }) => {
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
    }

    const sendMsg = (recipients, text) => {
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
        const selected = i === selectedConvIndex
        return {...conversations, messages, recipients, selected}
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
