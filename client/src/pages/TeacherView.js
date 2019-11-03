import React, { Component } from "react";
import Header from "../Components/Header";
import RegistrInvite from "../Components/RegistrInvite";
import TeacherScheduler from "../Components/TeacherScheduler";

import EditStudent from "../Components/EditStudent";
import CalendarModal from "../Components/CalendarModal";
import axios from "axios";
import moment from 'moment'

class TeacherView extends Component {
    state= {
        //TODO write function to pull data for adjusting state
        name: '',
        email: window.localStorage.getItem('emailid'),
        monthlyIncome: 500, //update this
        outstandingFees: 1000,//update this
        sessionPartner: "**student name" //do we need this?
      };

      componentDidMount(){
          let teacherIs = window.localStorage.getItem('emailid')
          let teacherEmail = teacherIs
          axios.post('/teacher-view', {teacherIs})
            .then((res)=>{
                let data = res.data
                let calendarArray = []
                let income = 0
                let outstanding = 0
                for(let i = 0; i<data.length; i++){
                    let combinedUTCDateTime = data[i].class.date + 'T' + data[i].class.time
                    let utcFormat = 'YYYY-MM-DDTHH:mm'
                    let local = moment.utc(combinedUTCDateTime,utcFormat).local().format('YYYY-MM-DDTHH:mm')
                    let localTime = local.split('T')[1]
                    let localDate = local.split('T')[0]
                    let localDayName = moment(localDate).format('dddd')
                    let dayNumber
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
                    let calendarTitle = data[i].class.className + ' With ' + data[i].firstName + ' ' + data[i].lastName
                    let calendarEvent = {
                        daysOfWeek: [dayNumber],
                        title: calendarTitle, 
                        startRecur: localDate,
                        startTime: localTime
                    }
                    calendarArray.push(calendarEvent)
                    income = income + data[i].class.tuition
                    outstanding = outstanding + data[i].amountOwed
                }
                axios.post('/teacher-name',{teacherEmail})
                .then((result)=>{
                    console.log(result.data)
                    this.setState({
                        classObj: calendarArray,
                        income: income,
                        outstanding: outstanding,
                        name: result.data
                    })
                })

            })
      }

    render() {
        return (
            <div>
            <Header name={this.state.name}></Header>
            <div className="col-md">
                <RegistrInvite 
                /> 

                <EditStudent />
                <CalendarModal sessionPartner={this.state.sessionPartner} courseName={this.state.courseName}date={this.state.date} time={this.state.time}/>
            </div>
            <TeacherScheduler 
            monthlyIncome={this.state.income} 
            outstandingFees={this.state.outstanding} 
            events={this.state.classObj}
            //pass the calendar prop into here.
            />
            </div>
        )
    }
}

export default TeacherView;