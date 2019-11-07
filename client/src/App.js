import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import { LoginPage } from "./Components/LoginPage/index.js";
import { RegisterStudentPage } from './Components/RegisterStudentPage';
import { RegisterTeacherPage } from './Components/RegisterTeacherPage';
import StudentView from "./pages/StudentView";
import TeacherView from "./pages/TeacherView";



// ***********************

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li><Link to="/">Log In</Link></li>
            <li><Link to="/student-registration">Student Registration</Link></li>
            <li><Link to="/teacher-registration">Teacher Registration</Link></li>
            <li><Link to="/studentview">Student View</Link></li>
            <li><Link to="/teacherview">Teacher View</Link></li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route exact path="/student-registration" component={RegisterStudentPage}/>
            <Route exact path="/teacher-registration" component={RegisterTeacherPage}/>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/studentview" component={StudentView} />
            <Route exact path="/teacherview" component={TeacherView} />
        </Switch>
    </div>
    </Router>
    )

}

export default App;


