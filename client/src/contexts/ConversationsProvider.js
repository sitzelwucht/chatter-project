import React, { useContext, createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = createContext()


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
        // set selected to true if index matches selected index
        const selected = i === selectedConvIndex
        return {...conversations, recipients, selected}
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
