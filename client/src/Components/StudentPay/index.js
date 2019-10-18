import React from 'react';
import './style.css';

function StudentPay(props) {
    return (
        <div className='studentPayView'>
            <div class="card">
                <div class="card-header">
                    Tuition and Fees
                </div>
                <div class="card-body">
                    <h5 class="card-title">Your current fee balance is 
                {/* TO DO: UPDATE WITH DATABASE INFO */}
                    {props.tuitionOwed}</h5>
                    <p class="card-text">Click below to pay your tutor today.</p>
                    <a href="#" class="btn btn-primary">Pay</a>
                </div>
            </div>
        </div>

    )
}

export default StudentPay;