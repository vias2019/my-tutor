import React from "react";
import logo from './images/logo-placeholder.png';
import mail from './images/mail.jpg';
import Calendar from '../Calendar'

function TeacherScheduler() {
    return (
        <div>
            <div className="row bg-light pt-4 pb-4">
                <div className="col-md">
                    <span className="font-weight-bold h1">Welcome</span><br/>
                    <span className="font-weight-bold h1">Teacher Name</span>
                </div>
                <div className="col-md">
                    <img src={logo} alt="logo" width="auto" height="100px" className="mx-auto" />
                </div>
                <div className="col-md">
                <img src={mail} alt="logo" width="auto" height="100px" className="float-right align-bottom" />
                    <button type="button" class="btn btn-lg btn-dark float-right">Add a student!</button><br/><br/>
                    <button type="button" class="btn btn-lg btn-dark float-right">Edit a student!</button>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md">
                    <span className="font-weight-bold h1">Expected Monthly Income:</span>
                </div>
                <div className="col-md">
                    <span className="font-weight-bold h1">Outstanding Tuition:</span>
                </div>
            </div>
            <div className="row ml-2 mr-2">
                <div className="col-md">
                    <Calendar/>
                </div>
            </div>
        </div>
    )
}

export default TeacherScheduler