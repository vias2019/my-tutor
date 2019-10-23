import React, { Component } from "react";
import Header from "../Components/Header";
import RegistrInvite from "../Components/RegistrInvite";
import TeacherScheduler from "../Components/TeacherScheduler";
import AddStudent from "../Components/AddStudent";
import EditStudent from "../Components/EditStudent";

class TeacherView extends Component {
    state= {
        //TODO write function to pull data for adjusting state
        name: "Teacher Name",
        monthlyIncome: 500,
        outstandingFees: 1000
      };

    render() {
        return (
            <div>
            <Header name={this.state.name}></Header>
            <div className="col-md">
                <RegistrInvite /> 
                <AddStudent />
                <EditStudent />
            </div>
            <TeacherScheduler monthlyIncome={this.state.monthlyIncome} outstandingFees={this.state.outstandingFees} />
            </div>
        )
    }
}

export default TeacherView;