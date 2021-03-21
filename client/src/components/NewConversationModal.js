import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'


export default function NewConversationModal(props) {

    
    const [selectedIds, setSelected] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        createConversation(selectedIds)
        props.closeModal()
    }



    const handleCheckBoxChange = (id) => {
        setSelected(previousSelectedIds => {
            return previousSelectedIds.includes(id) ? previousSelectedIds.filter(prev => {return id !== prev}) : [...previousSelectedIds, id]

        })
    }



    return (
        <div>
        <Modal.Header closeButton>Start conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                {
                    contacts.map((item, i) => (
                    <Form.Group controlId={item.id} key={i}>
                    <Form.Check 
                    type="checkbox" 
                    value={selectedIds.includes(item.id)} 
                    label={item.name}
                    onChange={() => handleCheckBoxChange(item.id)} />
                    </Form.Group>
                    ))
                }
                
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
    </div>)
}
