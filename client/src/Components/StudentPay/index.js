import React, {Component} from 'react';
import axios from 'axios';
import braintree from 'braintree';
import dropin from 'braintree-web-drop-in';
import './style.css';

class StudentPay extends Component {
    state = {};
    //When the component mounts, get request is made to the server. Server generates and sends back a client token. Once we have the client token, create the payment button using the token.
    componentDidMount(){
        let button = document.querySelector('.submit-button');
        axios.get('/client_token')
        .then(res => {
            let clientToken = res
            braintree.dropin.create({
                authorization: clientToken,
                container: '.dropin-container'
              }, function (err, instance) {
                  button.addEventListener('click',function(){
                      instance.requestPaymentMethod(function(err,payload){
                          axios.post('/checkout', payload)
                          .then(console.log('payload sent to server'))
                          })
                      })
                  })
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