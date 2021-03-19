import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'


export default function Sidebar({id}) {


    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    // true if conversations key is active
    const convOpen = activeKey === CONVERSATIONS_KEY


    function closeModal() {
      setModalOpen(false)
    }


    return (

        <div className="d-flex flex-column">
          <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
              <Nav className="justify-content-center" variant="pills" defaultActiveKey={CONVERSATIONS_KEY} onSelect={setActiveKey}>
                  <Nav.Item>
                      <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                  </Nav.Item>
              </Nav>
              <Tab.Content className="border-right overflow-auto flex-grow-1">
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                  <Conversations />
                </Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}>
                  <Contacts />
                </Tab.Pane>
              </Tab.Content>

              <div className="p-2 border-top border-right small">
                <div className="text-muted">User id: {id}</div>
              </div>
              
              <Button onClick={() => {setModalOpen(true)}} variant="info" className="round">
                New {convOpen ? 'Conversation' : 'Contact'}
              </Button>
          </Tab.Container>


      <Modal show={modalOpen} onHide={closeModal} >
        { convOpen ? 
          <NewConversationModal closeModal={closeModal} /> :
          <NewContactModal closeModal={closeModal} />
         }
      </Modal>

        </div>
    )
}
