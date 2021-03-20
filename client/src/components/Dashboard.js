import React from 'react'
import Sidebar from './Sidebar'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'

export default function Dashboard({id}) {

    
    return (
        <ContactsProvider>
        <ConversationsProvider>
            <div className="d-flex" style={{height: '100vh'}}>

                <Sidebar id={id}/>
            </div>
        </ConversationsProvider>
        </ContactsProvider>
       
    )
}
