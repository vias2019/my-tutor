import axios from 'axios';

export default {
    studentRegister: function() {
        return axios.get("http://localhost:3000/");
    }
}