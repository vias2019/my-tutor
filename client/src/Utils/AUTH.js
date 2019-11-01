  
const TOKEN_KEY = 'applepie';

export default {

  // checks to see if authenticated by checking for token in localstorage
  isAuthenticated: function () {
    const token = localStorage.getItem(TOKEN_KEY);
    return token && token !== null;
  },

  // sets the token in localstorage
  setToken: function (token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  destroyToken: function () {
    localStorage.removeItem(TOKEN_KEY);
  },

  // gets token from localstorage
  getToken: function () {
    return localStorage.getItem(TOKEN_KEY);
  }
}