

import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './style.css';
import moment from 'moment';

//send teacher email when click edit student button
export default class FormUser extends React.Component {

  constructor() {
      super();
      this.state = {
        emailid: '',

        tuition:'',
        time: '',
        date: '',
        className:'',
        tuitionOwed: 0,
        showModal: false,
        students: [],
        teacherIs: 'testTeacher@test.com'
      };
    };

  toggleShow = (shouldShow) => {
    this.setState({
      showModal: shouldShow
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.name == 'emailid') {
      console.log('this is an email id: ' + event.target.value);
      axios.get('/student-info', { params: { emailid: event.target.value}})
      .then(res => {
        console.log(res);
        if (res.data[0].class) {
        //const students = res.data;
        // console.log(res.data[0].class)
        var dateFix1 = res.data[0].class.date +' '+ res.data[0].class.time;
        console.log(dateFix1)
        var dateFixing = moment.utc(dateFix1)
        var dateFix2 = dateFixing.local().format('YYYY-MM-DD HH:mm');
        console.log(dateFix2)
        var dateFix3 = dateFix2.split(' ')[1];
        console.log(dateFix3);
       
        this.setState({ tuition: res.data[0].class.tuition, className: res.data[0].class.className, date: res.data[0].class.date, time: dateFix3 });}

     
      else {
        this.setState({ tuition: '', className: '', date: '', time: '' });
        console.log('nothing to populate')
      }
    
    }
    
    )}
  };

  //need to send teacher login information for selecting students

  componentDidMount() {

    var teacherIsVar = this.state.teacherIs;
    console.log('teacher is ' + teacherIsVar);

    axios.get('/students-list', { params: { teacherIs: teacherIsVar}})

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


    console.log('testing if this works' + emailid)
    

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
          Add/Edit Student
        </Button>

        <Modal show={this.state.showModal} onHide={() => this.toggleShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit schedule for student</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Student List</Form.Label>

                            <Form.Control as="select" onChange={this.handleChange} name="emailid" value={this.state.value}>
                            <option value="" selected disabled>Select student</option>
                            {
                                this.state.students.map((student) => <option name="emailid" value={student.emailid} onChange={this.handleChange} >{student.name}</option>)
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