import React, { Component } from "react";
import StudentPay from "../Components/StudentPay";
import Header from "../Components/Header";
import StudentScheduler from "../Components/StudentScheduler";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Calendar from '../Components/Calendar';
import moment from 'moment';
import axios from "axios";
import Footer from '../Components/Footer';

class StudentView extends Component {
    state = {
        //TODO write function to pull data for adjusting state
        firstName: '',
        lastName: '',
        emailid: '',
        tuition: 0,
        amountOwed: 0,
        teacherIs: '',
        className: ''
    };

    componentDidMount() {
        console.log(window.localStorage.getItem('emailid'))
        let emailid = window.localStorage.getItem('emailid') 
        axios.post('/student-view', { emailid })
            .then((res) => {
                //shortened variable for res.data.
                let data = res.data
                //combining the date and time from database to a momentjs readable string.
                let combinedUtcDateTime = data.class.date + 'T' + data.class.time
                let utcFormat = 'YYYY-MM-DDTHH:mm'
                //convert utc dateTime from database into the local date and time.
                let local = moment.utc(combinedUtcDateTime, utcFormat).local().format('YYYY-MM-DDTHH:mm')
                //split the combined dateTime string into two.
                let localTime = local.split('T')[1]
                let localDate = local.split('T')[0]
                //conver the date to a dayname (mon,tues,wed,etc)
                let localDayName = moment(localDate).format("dddd")
                let dayNumber
                //depending on the dayname, assign a number value.
                switch (localDayName) {
                    case "Sunday":
                        dayNumber = '0'
                        break
                    case "Monday":
                        dayNumber = '1'
                        break
                    case "Tuesday":
                        dayNumber = '2'
                        break
                    case "Wednesday":
                        dayNumber = '3'
                        break
                    case "Thursday":
                        dayNumber = '4'
                        break
                    case "Friday":
                        dayNumber = '5'
                        break
                    case "Saturday":
                        dayNumber = '6'
                        break
                    default:
                        console.log("Error getting dayName")
                }
                //Create an array of objects that has the class information for the calendar.
                let calendarArray = []
                let calendarEvent = {
                    daysOfWeek: [dayNumber],
                    title: data.class.className,
                    startRecur: localDate,
                    startTime: localTime
                }
                calendarArray.push(calendarEvent);
                //set the state to the students information and pass these states down into the child components as props.
                let teacherEmail = data.teacherIs
                axios.post('/teacher-name', {teacherEmail})
                    .then((result) => {
                        this.setState({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            emailid: data.emailid,
                            tuition: data.class.tuition,
                            amountOwed: data.amountOwed,
                            className: data.class.className,
                            classObj: calendarArray,
                            teacherIs: result.data
                        })
                        console.log(this.state)
                    })
            })
    }


    render() {
        return (
            <div>
            <Header name={this.state.name}/>
            <Container>
                <Row>
                    <Col md={4} lg={4}>
               
                        <StudentScheduler 
                        teacherName={this.state.teacherIs}
                        courseName = {this.state.className}
                        monthlyFee = {this.state.tuition}
                        /> 
                    
                        <StudentPay/>
                    </Col>
                    <br/>
                    <Col>
                    <br />
                        <Calendar
                        events={this.state.classObj}
                        />
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default StudentView;