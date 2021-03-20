import React, { useContext, createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationsContext = createContext()


export const useConversations = () => {
    return useContext(ConversationsContext)
}


export const ConversationsProvider = ({children}) => {

    const [conversations, setConversations] = useLocalStorage('conversations', [])

    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }


    return (
        <ConversationsContext.Provider value={{ conversations, createConversation }}>
            {children}
        </ConversationsContext.Provider>
    )
}
