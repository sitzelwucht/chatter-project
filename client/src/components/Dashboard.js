import React from 'react'
import Sidebar from './Sidebar'
import { useConversations } from '../contexts/ConversationsProvider'
import OpenConversation from './OpenConversation'

export default function Dashboard({id}) {

    const { selectedConv } = useConversations()
    
    return (
            <div className="d-flex" style={{height: '100vh'}}>

                <Sidebar id={id}/>
                { selectedConv && <OpenConversation /> }
            </div>

    )
}
