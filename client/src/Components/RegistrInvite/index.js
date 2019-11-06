import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './style.css';


export default class FormUser extends React.Component {

  constructor() {
      super();
      this.state = {
        firstName: '',
        lastName: '',
        emailid: '',
        showModal: false
      };
    };

  toggleShow = (shouldShow) => {
    this.setState({
      showModal: shouldShow
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();

    const {firstName, lastName, emailid} = this.state;

    let amountOwed = 0

    let teacherIs = window.localStorage.getItem('emailid')

    axios.post('/send-invite', ({ firstName, lastName, emailid, teacherIs, amountOwed } )) 
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    const { firstName, lastName, emailid} = this.state;
    return (
      <>
        <Button variant="primary" onClick={() => this.toggleShow(true)}>
          Invite New Student
        </Button>

        <Modal show={this.state.showModal} onHide={() => this.toggleShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Invite New Student to Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Col>
                  
                  <Form.Label>First Name:  <Form.Control type="text" name="firstName" value={firstName} onChange={this.handleChange} required /></Form.Label><br/>
                
                </Col>

                <Col>
                  <Form.Label>Last Name:  <Form.Control type="text" name="lastName" value={lastName} onChange={this.handleChange} required /></Form.Label>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                  <Form.Label>Email:  <Form.Control type="text" name="emailid" value={emailid} onChange={this.handleChange} required /></Form.Label>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                </Col>
                <Col>
                  <Button variant="secondary" onClick={() => this.toggleShow(false)}> 
                      Cancel
                  </Button>
            
                  <Button type="submit" variant="primary" onClick={() => this.toggleShow(false)}>
                      Send Invite
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer> </Modal.Footer>
        </Modal>
      </>
    )
  }
}