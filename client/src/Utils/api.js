import axios from "axios";
import Auth from "./AUTH";
require('dotenv').config();

//checkinto ///////??????????????????????????????????????
const headers = () => {
  const options = {};
  // if authenticated create Authorization header to add to api calls
  if (Auth.isAuthenticated()) {
    options["headers"] = {
      "Authorization": `Bearer ${Auth.getToken()}`
    }
  }
  return options;
}


export default {
createTeacher: function(userInfo){
    console.log(userInfo, "inside api createTeacher axios request");
    return axios.post("/teacher-registration", userInfo);

    //test link
    // return axios.post("http://localhost:3000/api/auth/signup", userInfo);
  },
  createStudent: function(userInfo){
    console.log(userInfo, "inside create students axios api request");
    return axios.post("/student-registration", userInfo);

    //test link
    // return axios.post("http://localhost:3000/api/auth/signup", userInfo);
  },
  loginUser: function(userCredentials) {
    console.log(userCredentials, "inside axios log in request");
    return axios.post("/login", userCredentials);
    // return axios.post("http://localhost:3000/api/auth/login", userCredentials);
  },
  logoutUser: function(userCredentials) {
    console.log(userCredentials, "inside axios logout request");
    return axios.post("/logout", userCredentials);
    // return axios.post("http://localhost:3000/api/auth/login", userCredentials);
  }
}