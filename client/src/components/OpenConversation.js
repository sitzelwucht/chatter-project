import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'


export default function OpenConversation() {

    const [text, setText] = useState('')

    const setRef = useCallback(node => {
        if (node) node.scrollIntoView({ smooth: true})
    }, [] )
    
    const { sendMsg, selectedConv } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMsg(
            selectedConv.recipients.map(recipient => recipient.id),
            text)
        setText('')
    }


    return (

        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-5 py-5 ">
                { selectedConv.messages.map((msg, i) => {
                    const isLastMsg = selectedConv.messages.length - 1 === i
                    return (
                        <div 
                        ref={isLastMsg ? setRef : null }
                        key={i} 
                        className={`my-1 d-flex flex-column ${msg.fromMe ? 'align-self-end' : ''}`}>
                        
                            <div 
                                className={`rounded px-2 py-1 ${msg.fromMe ? 'bg-dark text-white' : 'bg-light text-dark'}`}>{msg.text}
                            </div>
                            
                            <div 
                                className={`text-muted small ${msg.fromMe ? 'text-right' : ''}`}>{msg.fromMe ? 'you' : msg.senderName}
                            </div>
                        </div>
                    )
                })}

                </div>
            </div>
            <Form onSubmit={handleSubmit} className="m-5">
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
