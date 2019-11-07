import * as React from 'react';
import './style.css';
import API from "../../Utils/api";
import Auth from "../../Utils/AUTH";

export class RegisterTeacherPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailid: '',
            password: '',
            confirmpassword: '',
            isTeacher: true,
            isRegistered: '',
            redirect: false
        };
        
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ emailid: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleConfirmPasswordChange(event) {
        this.setState({ confirmpassword: event.target.value });
    }

    registerTeacher = event => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmpassword){
            alert('The "password" and "confirm password" fields do not match.  Please try again. Thank you!');
            console.log('in register teacher function');
        } else {
            API.createTeacher(this.state).then(res => {
                console.log('res: ', res);
                if (!res.data.emailid){
                    alert(res.data);
                } else {
                this.props.history.push({ pathname: '/' });
                }
            }).catch(err => console.log(err))
        }
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
                <form onSubmit={this.registerTeacher}>
                    <div >
                        <label>
                            First name:
                            <input 
                                className="form-control input_user"
                                type="text" 
                                value={this.state.firstName} 
                                placeholder="first name"
                                onChange={this.handleFirstNameChange}
                            />
                        </label>
                    </div>  
                    <div >
                        <label>
                            Last name:
                            <input 
                                className="form-control input_user"
                                type="text" 
                                value={this.state.lastName} 
                                placeholder="last name"
                                onChange={this.handleLastNameChange}
                            />
                        </label>
                    </div>  
                    <div >
                        <label>
                            Email:
                            <input 
                                className="form-control input_user"
                                type="text" 
                                name="email" 
                                value={this.state.emailid.toLowerCase()} 
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
                                value={this.state.password}
                                placeholder="password"
                                onChange={this.handlePasswordChange}
                            />
                        </label>
                    </div>
                    <div >
                        <label>
                            Confirm password:
                            <input 
                                className="form-control input_pass"
                                type="password" 
                                name="password-confirm" 
                                value={this.state.confirmpassword}
                                placeholder="password-confirm"
                                onChange={this.handleConfirmPasswordChange}
                            />
                        </label>
                    </div>
                    <div className="d-flex justify-content-center mt-3 login_container">
                        <button 
                            type="submit" 
                            name="button" 
                            className="btn login_btn" 
                            value="Sign In">
                            Register
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-4">
                <div className="d-flex justify-content-center links">
                    Already have an account? <br/>
                        <a href="/teacherReg" className="ml-2">Log In</a> 
                </div>
            </div>
        </>
        )
    }
};