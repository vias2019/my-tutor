import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './style.css';


function RegistrPageStudent() {

    
  return (
    <>
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
            <Form.Row>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Button variant="primary" >
                Confirm Registration
                </Button>
            </Form.Row>
        </Form>
    </>
  );
}

export default RegistrPageStudent;