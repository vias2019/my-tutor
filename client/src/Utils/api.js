import axios from 'axios';

export default {
    studentRegister: function() {
        console.log('in student register');
        return axios.get("http://localhost:3000/");
    }
}