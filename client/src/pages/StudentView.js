import React, { Component } from "react";
import StudentPay from "../Components/StudentPay";
import Header from "../Components/Header";
import StudentScheduler from "../Components/StudentScheduler";

class StudentView extends Component {
    state= {
        //TODO write function to pull data for adjusting state
        name: "Student Name",
        tuitionOwed: 200
      };

    render() {
        return (
            <div>
            <Header name={this.state.name}/>
            <StudentPay tuitionOwed={this.state.tuitionOwed}/>
            <StudentScheduler />
            </div>
        )
    }
}

export default StudentView;