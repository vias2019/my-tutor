
import React from 'react';
import './style.css';

function StudentScheduler(props) {
    return (
        <div className='studentScheduler'>
            <br/>
            <div class="card">
                <div class="card-header">
                    Course Information
                </div>
                <div class="card-body">
                    <p class="card-text">Teacher: {props.teacherName}</p>
                    <p class="card-text">Course Name: {props.courseName}</p>
                    <p class="card-text">Monthly Fee: ${props.monthlyFee}</p>

                </div>
            </div>
        </div>
    )
}

export default StudentScheduler;