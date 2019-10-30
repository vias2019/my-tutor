import * as React from 'react';
import './style.css';
import Footer from "../Footer/index";
import axios from 'axios';

export class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            passwordValue: ''
        };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ emailValue: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ passwordValue: event.target.value });
    }

    login = event => {
        event.preventDefault();
        console.log('login');
        const currentUser = {
            emailid: this.state.emailValue,
            password: this.state.passwordValue
        }
        axios.post('/login', currentUser) 
            .then(res => {
                console.log(res);
            })
        }
    render () {
        return (
        <>
            <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                    <p>Welcome to MyTutor</p>
                    <img src="./images/teacherOwl.png" className="brand_logo" alt="Logo"/>
                </div>
            </div>

            <div className="d-flex justify-content-center form_container">
                <form onSubmit={this.login}>
                    <div >
                        <label>
                            Email:
                            <input 
                                className="form-control input_user"
                                type="text" 
                                name="email" 
                                value={this.state.emailValue} 
                                placeholder="email"
                                onChange={this.handleEmailChange}
                            />
                        </label>
                    </div>
                    <div >
                        <label>
                            Password:
                            <input 
                                className="form-control input_pass"
                                type="password" 
                                name="password" 
                                value={this.state.passwordValue}
                                placeholder="password"
                                onChange={this.handlePasswordChange}
                            />
                        </label>
                    </div>
                    <div className="d-flex justify-content-center mt-3 login_container">
                        <button 
                            type="submit" 
                            name="button" 
                            className="btn login_btn" 
                            value="Sign In">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            <div className="center-div">
                Don't have an account?
                <div><a href="/student-registration">Register as new student</a></div> 
                <div><a href="/teacher-registration">Register as new teacher</a></div> 
            </div>
            <Footer/>
        </>
        )
    }
};
