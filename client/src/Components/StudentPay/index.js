import React, { Component } from 'react';
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import './style.css';

class StudentPay extends React.Component {
    //state will be assigned to a prop that will be passed down. 
    state = {
        amountOwed: 0
    }

    //Need to figure out why props isnt loading here. 
    componentDidMount(){
        let emailid = window.localStorage.getItem('emailid')
    axios.post('/student-view',{emailid})
        .then((res)=>{
            console.log('res after componentDidMount: ', res);
            this.setState({
                amountOwed: res.data.amountOwed
            })
            let amount = this.state.amountOwed
            var button = document.querySelector('.submit-button1')
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
                                    console.log(response.data)
                                    //add code here to remove the payment button if payment is successful
                                    if (response.data === true) {
                                        //db update amount owed, update state. tear down the payment button
                                        console.log('success')
                                    } else {
                                        //payment did not go through
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
                             {this.state.amountOwed}</h5>
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