import React, { Component } from "react";
import './App.css';
import RegistrInvite from './Components/RegistrInvite';
// import AddStudent from "./Components/AddStudent";
// import EditStudent from "./Components/EditStudent";

//import StudentPay from "./Components/StudentPay";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
         
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
<RegistrInvite />
      </div>
    );
  }
}

export default App;


