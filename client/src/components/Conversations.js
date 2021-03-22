import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'



export default function Conversations() {

    const { conversations, selectConvIndex } = useConversations()

    return (
        <ListGroup variant="flush" >
        {
            conversations.map((item, i) => (
             <ListGroup.Item className="dark-bg"
             variant="light"
             key={i}
             action
             active={item.isSelected}
             onClick={() => {selectConvIndex(i)}}>
              {item.recipients.map(recipient => recipient.name).join(', ')}
              </ListGroup.Item>
            ))
        }
        </ListGroup>
    )
}
