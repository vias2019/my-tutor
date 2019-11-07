import React, { Component } from "react";
import Header from "../Components/Header";

class TeacherRegistration extends Component {
    state= {
        //Name will not exist on this page
        name: ""
      };

    render() {
        return (
            <div>
            <Header name={this.state.name} />
            <p>PLACEHOLDER FOR REGISRATION FORM</p>
            </div>
        )
    }
}

export default TeacherRegistration;