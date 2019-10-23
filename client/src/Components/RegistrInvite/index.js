import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './style.css';


function RegistrInvite() {

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Invite New Student
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite New Student to Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* TODO ADD ID FOR CAPTURING DATA */}
                    <Form>
                        <Form.Row>
                            <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="First name" />
                            </Col>
                            <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Last name" />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                    Send Invite
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RegistrInvite;