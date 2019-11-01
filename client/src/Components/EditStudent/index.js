

import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './style.css';
import moment from 'moment';


export default class FormUser extends React.Component {

  constructor() {
      super();
      this.state = {
        emailid: 'test@test.com',

        tuition:0,
        time: '',
        date: '',
        className:'',
        tuitionOwed: 0,
        showModal: false,
        students: []
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

  componentDidMount() {
    axios.get('/students-list')
      .then(res => {
        const students = res.data;
        this.setState({ students });
      })
  }


  handleSubmit = event => {
    event.preventDefault();

    const {emailid, tuition, time, date, className, tuitionOwed} = this.state;
    console.log(this.state.date);
    var dateTime = this.state.date + 'T' + this.state.time;
    var utcDateTime = moment(dateTime).utc().format('YYYY-MM-DDTHH:mm');
    var utcNewDate = utcDateTime.split('T')[0];
    var utcNewTime = utcDateTime.split('T')[1];
    console.log('date...', utcNewDate);
    console.log('time...', utcNewTime);
    //this.setState({date : utcNewDate, time: utcNewTime}, () => console.log('async is fun',this.state));
    console.log(this.state.time)


    console.log('testing if this works')

    axios.post('/add-student', ({ emailid, tuition, utcNewTime, utcNewDate, className, tuitionOwed } )) 
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    const { tuition, time, date, className } = this.state;
    return (
      <>
        <Button variant="primary" onClick={() => this.toggleShow(true)}>
          Edit Student
        </Button>

        <Modal show={this.state.showModal} onHide={() => this.toggleShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit student schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* TODO ADD ID FOR CAPTURING DATA */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Student List</Form.Label>
                            {/* TODO ADD FOR IMPORTING STUDENT NAME DATA */}
                            <Form.Control as="select">
                            {
                                this.state.students.map((student) => <option value={student}>{student}</option>)
                            }
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Monthly Fee</Form.Label>
                        <Form.Control type="number" name="tuition" value={tuition} onChange={this.handleChange} placeholder="$" />
                    </Form.Row>

                    <Form.Row>
                        <Col>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" name="date" value={date} onChange={this.handleChange} />
                        </Col>
                        <Col> 

                        {/* TODO CHANGE TIME TO MILITARY                    */}
                        <Form.Label>Tutor Session Time</Form.Label>
                        <Form.Control type="time" name="time" value={time} onChange={this.handleChange} />
                        </Col>
                    </Form.Row>

      
                    <Form.Row>
                        <Form.Label>Tutor Session Subject</Form.Label>
                        <Form.Control type="text" placeholder="Curriculum" name="className" value={className} onChange={this.handleChange}/>
                    </Form.Row>
                    <Form.Row>
                        <Button variant="secondary" onClick={() => this.toggleShow(false) }>
                        Cancel
                        </Button>
                        <Button variant="primary" type="submit" onClick={() => this.toggleShow(false)}>
                        Save
                        </Button>
                    </Form.Row>

                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>

      </>
    )
  }
}