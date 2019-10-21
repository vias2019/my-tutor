import React from 'react';
import TeacherScheduler from './Components/TeacherScheduler'
import './App.css';
import { LoginPage } from "./Components/LoginPage/index.js";
import { RegisterStudentPage } from './Components/RegisterStudentPage';
import { RegisterTeacherPage } from './Components/RegisterTeacherPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function App() {
  return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Log In</Link>
            </li>
            <li>
              <Link to="/student-registration">Student Registration</Link>
            </li>
            <li>
              <Link to="/teacher-registration">Teacher Registration</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/student-registration">
            <RegisterStudentPage />
          </Route>
          <Route path="/teacher-registration">
            <RegisterTeacherPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
