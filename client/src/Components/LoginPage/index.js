import * as React from 'react';
import "./style.css";

// import { Button, Form, FormGroup, Label, Input }
// from 'reactstrap';
// import  { GoogleLoginButton } from 'react-social-login-buttons';

export const LogIn = () => {
    
    return (
        <div classNameName="container h-100">
            <div classNameNameName="d-flex justify-content-center h-100">
                <div classNameName="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <p>Welcome to MyTutor</p>
                            <img src="./images/teacherOwl.png" className="brand_logo" alt="Logo"/>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center form_container">
                        <form className="login-form" id="signin" name="signin" method="post" action="signin">
                            <div className="input-group mb-3">
                                <div className="input-group-append"></div>
                                <input type="text" name="email" className="form-control input_user" value=""
                                    placeholder="email"/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                </div>
                                <input type="password" name="password" className="form-control input_pass" value=""
                                    placeholder="password"/>
                            </div>

                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button type="submit" name="button" className="btn login_btn" value="Sign In">Login</button>
                            </div>

                        </form>
                        <div className> hi</div>
                    </div>

                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <br/>
                                <a href="/teacherReg" className="ml-2">Register as a Teacher</a> 
                                <br/>
                                <a href="/studentReg" className="ml-2">Register as a Student</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};