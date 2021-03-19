import React, { useRef, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

export default function Login(props) {


    const idRef = useRef()


    function handleSubmit(e) {
        e.preventDefault()

        props.onIdSubmit(idRef.current.value)
    }

    function createNewId() {
        props.onIdSubmit(uuidV4())
    }

    return (
        <Container className="login-signup">
            <Form onSubmit={handleSubmit} className="w-50">
                <Form.Group>
                    <Form.Label>Enter id:</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Button type="submit" variant="dark" className="mr-2">Log in</Button>
                <Button onClick={createNewId} variant="link">Generate new id</Button>
            </Form>
        </Container>
    )
}
