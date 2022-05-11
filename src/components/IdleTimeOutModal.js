import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const IdleTimeOutModal = ({showModal, handleLogout2,   handleContinue, handleLogout,  remainingTime}) => {
    const [time, setTime] = useState('')
   const [cont, setCont] = useState(true)
   let   show = true;
  
    useEffect(() => {
     console.log("show", show)
        var timerOn = true;
       
        function timer(remaining) {
          var s = remaining % 60;
          s = s < 10 ? '0' + s : s;
          setTime(remaining)
          remaining -= 1;
          if (remaining > 0 && timerOn) {
            setTimeout(function () {
              timer(remaining);
            }, 1000);
            return;
          }
         else if(show === true && remaining === 0){
   console.log("iscoutn", cont)
          handleLogout()
     
         }
    
        }
        timer(10);
        return () => {
          timerOn = false
        }
      }, [cont]);
      const cont2 = () => {
       
        show = false;
        setCont(false)
        handleContinue()
       
      }
    return (
        <Modal show={showModal} onHide={handleContinue}>
            <Modal.Header closeButton>
            <Modal.Title>Session Logging out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your session is Timed Out. You want to stay?</Modal.Body>
            <Modal.Footer>
              <div style={{display : "block", width: "100%"}}>
              <h4>You are going to logout in {time} second </h4>
                  </div>
            <Button variant="danger" onClick={handleLogout}>
                Logout
            </Button>
            <Button variant="primary" onClick={() => cont2()}>
                Continue Session
            </Button>
            </Modal.Footer>
        </Modal>
    )
}