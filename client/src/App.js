import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import LoginPage from "../src/Components/LoginPage";

import StudentView from "./pages/StudentView";
import TeacherView from "./pages/TeacherView";

import TeacherRegistration from "./pages/TeacherRegistration";
import StudentRegistration from "./pages/StudentRegistration";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/studentregistration" component={StudentRegistration} />
          <Route exact path="/teacherregistration" component={TeacherRegistration} />
          <Route exact path="/studentview" component={StudentView} />
          <Route exact path="/teacherview" component={TeacherView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


