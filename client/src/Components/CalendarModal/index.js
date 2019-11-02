
import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import './style.css';


function CalendarModal(props) {
    const [show, setShow] = React.useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          **Calendar modal**
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Calendar Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p> You are scheduled for a {props.courseName} session with {props.sessionPartner} </p>
              <p> Date: {props.date} </p>
              <p> Time: {props.time} </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }
  


export default CalendarModal;