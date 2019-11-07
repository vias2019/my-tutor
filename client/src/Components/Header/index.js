  
import React from "react";
import { Redirect } from 'react-router-dom'
//import logo from './images/logo-placeholder.png';
import logo from "./images/owllogo.jpg";
import API from "../../Utils/api";
import "./style.css";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to='/' />
        };
        return (
            <div className="owl" >
                <div className="row bg-light pt-4 pb-4" >
                    <div className="col-md" >
                        <div>
                            <span className="font-weight-bold h1" style={{color: "#401801"}}>Welcome to My-Tutor</span><br/>
                            <span className="font-weight-bold h1">{this.props.name}</span>
                        </div>
                        <button 
                            type="submit" 
                            name="button" 
                            className="btn login_btn"
                            onClick={() => { 
                                API.logoutUser() 
                                    .then(res => {
                                        if (res.status == 200) {
                                            this.setRedirect();
                                        }
                                    })
                            }}>
                            Logout
                        </button>
                        
                    </div>
                    <div className="col-md">
                        <img src={logo} alt="logo" width="auto" height="100px" className="mx-auto" />
                    </div>
                </div>           
            </div>
        )}
}
