import React from 'react';
import TeacherScheduler from './Components/TeacherScheduler'
import './App.css';
import { LogIn } from "./Components/LoginPage/index.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LogIn />
        <TeacherScheduler/>
      </header>
    </div>
  )
};

export default App;
