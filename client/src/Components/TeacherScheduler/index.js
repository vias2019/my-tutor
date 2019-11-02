import React from "react";
// import logo from './images/logo-placeholder.png';
import Calendar from '../Calendar'

function TeacherScheduler(props) {
    return (
        <div>
            <div className="row mb-5">
                <div className="col-md">
                    <span className="font-weight-bold h1">Expected Monthly Income: ${props.monthlyIncome} </span>
                </div>
                <div className="col-md">
                    <span className="font-weight-bold h1">Outstanding Fees: ${props.outstandingFees}</span>
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

export default TeacherScheduler;