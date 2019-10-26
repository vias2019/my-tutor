import React, {Component} from 'react';
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import './style.css';

class StudentPay extends Component {

    componentDidMount(){
        var button = document.querySelector('.submit-button1')
        dropin.create({
            authorization: 'sandbox_tv289x3x_9tcq3ypzspqhjqk7',
            container: '.dropin-container1'
        },function(err,dropinInstance){
            button.addEventListener('click',function(){
                dropinInstance.requestPaymentMethod()
                .then(function(payload){
                    console.log(payload.nonce)
                    axios.post('/checkout', {payload})
                    .then(function(response){
                        console.log('payload has been sent');
                    })
                    .catch(function(err){
                        console.log(err);
                    })

                }).catch(function(err){
                    console.log(err);
                })
            })
        })
    }

    render(){
        return(
            <div>
                <div className='dropin-container1'></div>
                <button className='submit-button1'>Purchase</button>
            </div>
        )
    }
}

export default StudentPay;