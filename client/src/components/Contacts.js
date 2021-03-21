import React from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Contacts() {
    
    const { contacts } = useContacts()
    
    return (
        <ListGroup variant="flush">
            {
                contacts.map((item, i) => {
                  return  <ListGroup.Item key={i} className="dark-bg">{item.name}</ListGroup.Item>
                })
            }
        </ListGroup>
    )
}
