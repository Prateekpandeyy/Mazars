import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const IdleTimeOutModal = ({showModal, lTime, handleContinue, handleLogout}) => {
    const [time, setTime] = useState('')
   const [cont, setCont] = useState(true)
   let   show = true;
  
    return (
        <Modal show={showModal}  onHide={handleContinue}>
            <Modal.Header closeButton>
            <Modal.Title>Session Logging out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your session is Timed Out. You want to stay?</Modal.Body>
            <Modal.Footer>
              <div style={{display : "block", width: "100%"}}>
              <h4>You are going to logout in {lTime} second </h4>
                  </div>
            <Button variant="danger" onClick={() => handleLogout()}>
                Logout
            </Button>
            <Button variant="primary" onClick={() => handleContinue()}>
                Continue Session
            </Button>
            </Modal.Footer>
        </Modal>
    )
}