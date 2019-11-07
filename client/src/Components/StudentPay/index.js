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
            }, (err, dropinInstance) => {
                button.addEventListener('click', ()=> {
                    dropinInstance.requestPaymentMethod()
                        .then((payload)=> {
                            console.log(payload)
                            axios.post('/checkout', { payload, amount })
                                .then((response)=> {
                                    //add code here to remove the payment button if payment is successful
                                    if (response.data == true) {
                                        //db update amount owed, update state. tear down the payment button
                                        axios.post('/payment',{emailid})
                                            .then((res)=>{
                                                this.setState({
                                                    amountOwed: 0
                                                })
                                                let parent = document.querySelector(".topDiv")
                                                let parent2 = document.querySelector(".braintree-dropin")
                                                let child = document.querySelector('.submit-button1')
                                                let child2 = document.querySelector('.braintree-large-button')
                                                parent.removeChild(child)
                                                parent2.removeChild(child2)
                                                let lineBreak = document.createElement("br")
                                                let parent4 = document.querySelector('.braintree-methods.braintree-methods-initial')
                                                parent4.append(lineBreak, "Thank you for your payment!")
                                            })
                                        console.log('success')
                                    } else {
                                        console.log('failed payment')
                                        let lineBreak = document.createElement("br")
                                        let parent3 = document.querySelector('h5.card-title')
                                        parent3.append(lineBreak,"Payment failed. Please try again.")
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
                        <div className='topDiv'>
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