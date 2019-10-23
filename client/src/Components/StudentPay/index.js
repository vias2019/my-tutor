import React, {Component} from 'react';
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import './style.css';

class StudentPay extends Component {
    state = {};

    componentDidMount(){
        const button = document.querySelector('.submit-button')

        dropin.create({
            authorization: 'sandbox_tv289x3x_9tcq3ypzspqhjqk7',
            selector: '.dropin-container'
          }, function (err, dropinInstance) {
            button.addEventListener('click', function () {
              instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                
              });
            });
          });
    }

        render(){
            return(
                <div>
                <div className='dropin-container'></div>
                <button className='submit-button'> Request payment method</button>
            </div>
            )
    }
}




export default StudentPay;
// tuitionOwed={this.state.tuitionOwed}