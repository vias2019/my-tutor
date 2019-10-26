
import Form from 'react-bootstrap/Form';
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
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Teacher Name: </Form.Label>
                            <Form.Control as="select">
                            <option value="" selected disabled>Please select</option>
                            <option>Gary Green</option>
                            <option>Hannah Hutchinson</option>
                            <option>Izzy Isaacs</option>

                            </Form.Control>
                    </Form.Group>
                    <p class="card-text">Course Name: {props.courseName}</p>
                    <p class="card-text">Monthly Fee: ${props.monthlyFee}</p>

                </div>
            </div>
        </div>
    )
}

export default StudentScheduler;