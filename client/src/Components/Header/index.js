  
import React from "react";
//import logo from './images/logo-placeholder.png';
import logo from "./images/owllogo.jpg";
// import mail from './images/mail.jpg';
import "./style.css";

function Header(props) {
    return (
        <div className="owl" >
            <div className="row bg-light pt-4 pb-4" >
                <div className="col-md" >
                    <span className="font-weight-bold h1" style={{color: "#401801"}}>Welcome to My-Tutor</span><br/>
                    <span className="font-weight-bold h1">{props.name}</span>
                </div>
                <div className="col-md">
                    <img src={logo} alt="logo" width="auto" height="100px" className="mx-auto" />
                </div>
                {/* <div className="col-md">
                {/* <img src={mail} alt="logo" width="auto" height="100px" className="float-right align-bottom" />
                <button type="button" class="btn btn-lg btn-dark float-right">Add a student!</button><br/><br/>
                <button type="button" class="btn btn-lg btn-dark float-right">Edit a student!</button> */}

                {/* <RegistrInvite /> <br/>
                <AddStudent /> <br/>
                <EditStudent />
                // </div> */} 
            </div>           
        </div>
    )
}

export default Header;