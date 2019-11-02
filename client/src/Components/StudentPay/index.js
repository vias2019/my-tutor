import React, { Component } from 'react';
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import './style.css';

class StudentPay extends React.Component {
    //state will be assigned to a prop that will be passed down. 
    state = {
        amount: 0
    }

    //Need to figure out why props isnt loading here. 
    componentDidUpdate() {
        var button = document.querySelector('.submit-button1')
        console.log(this.props.amountOwed)
        let amount = this.state.amount
        dropin.create({
            authorization: 'sandbox_tv289x3x_9tcq3ypzspqhjqk7',
            container: '.dropin-container1',
            paypal: {
                flow: 'checkout',
                amount: amount,
                currency: 'USD'
            }
        }, function (err, dropinInstance) {
            button.addEventListener('click', function () {
                dropinInstance.requestPaymentMethod()
                    .then(function (payload) {
                        console.log(payload)
                        axios.post('/checkout', { payload, amount })
                            .then(function (response) {
                                console.log('payload has been sent');
                                //add code here to remove the payment button if payment is successful
                                if (response.data) {
                                    console.log('success')
                                } else {
                                    console.log('fail')
                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
                    }).catch(function (err) {
                        console.log(err);
                    })
            })
        })
    }

    render() {
        return (
            <div className='studentPayView'>
                <br />
                <div className="card">
                    <div className="card-header">
                        Tuition and Fees
                </div>
                    <div className="card-body">
                        <h5 className="card-title">Your current fee balance is $
                             {this.props.amountOwed}</h5>
                        <div>
                            <div className='dropin-container1'></div>
                            <button className='submit-button1'>Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
                )
            }
        }
        
export default StudentPay;