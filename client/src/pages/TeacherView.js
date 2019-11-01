import React, { Component } from "react";
import Header from "../Components/Header";
import RegistrInvite from "../Components/RegistrInvite";
import TeacherScheduler from "../Components/TeacherScheduler";
import AddStudent from "../Components/AddStudent";
import EditStudent from "../Components/EditStudent";
import CalendarModal from "../Components/CalendarModal";

class TeacherView extends Component {
    state= {
        //TODO write function to pull data for adjusting state
        name: "Teacher Name",
        monthlyIncome: 500,
        outstandingFees: 1000,
        sessionPartner: "**student name",
        courseName: "Piano 101",
        date: "October 22, 2019",
        time: "2:00pm-3:00pm"
      };

    render() {
        return (
            <div>
            <Header name={this.state.name}></Header>
            <div className="col-md">
                <RegistrInvite /> 
                <AddStudent />
                <EditStudent />
                <CalendarModal sessionPartner={this.state.sessionPartner} courseName={this.state.courseName}date={this.state.date} time={this.state.time}/>
            </div>
            <TeacherScheduler monthlyIncome={this.state.monthlyIncome} outstandingFees={this.state.outstandingFees} />
            </div>
        )
    }
}

export default TeacherView;