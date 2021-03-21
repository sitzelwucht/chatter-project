import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'


export default function OpenConversation() {

    const [text, setText] = useState('')
    const { sendMessage, selectedConv } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(
            selectedConv.recipients.map(recipient => recipient.id),
            text)
        setText('')
    }

    return (


        <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 overflow-auto">

        </div>
            <Form>
                <Form.Group>
                    <InputGroup>
                    <Form.Control 
                    as="textarea" 
                    value={text} 
                    onChange={e => setText(e.target.value)}
                    style={{height: '70px', resize: 'none'}}
                    required
                    />

                    <InputGroup.Append>
                    <Button 
                    type="submit" 
                    variant="dark"> Send</Button>
                    </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
