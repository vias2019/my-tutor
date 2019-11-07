import React, { Component } from "react";
import Header from "../Components/Header";
import RegistrPageStudent from "../Components/RegistrPageStudent";

class StudentRegistration extends Component {

    render() {
        return (
            <div>
            <Header />
            <RegistrPageStudent />
            </div>
        )
    }
}

export default StudentRegistration;