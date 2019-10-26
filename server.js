var mongoose = require("mongoose");
var mongo = require ("./controllers/apiRoutes");
// This is the route to the database
var model = require("./model.js");


// const user = require('./routes/user')
// // ****In API routes, we need to write your mongoose request to save the new user.***

require('dotenv').config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
//setting up express session - this will allow us to maintain persistence in our loggedin user
const session = require('express-session')
const authRoutes = require('./controllers/authRoutes')
const nodemailer = require('nodemailer');
const log = console.log;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Configuring Passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

//Setting up express-session
app.use(
  session({
  secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
  resave: false, //required
  saveUninitialized: false //required
  })
);

app.use(mongo);

//we’re using serializeUser and deserializeUser callbacks. The first one will be invoked on authentication, and its job is to serialize the user instance with the information we pass to it (the user ID in this case) and store it in the session via a cookie. The second one will be invoked every subsequent request to deserialize the instance, providing it the unique cookie identifier as a “credential”. 

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
      cb(err, user);
    });
  });


// app.post('/send-invite',(req,res) => {
//   console.log(req.body);

 

// //Student registration email notification: 
// // Step 1

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD 
//   }
// });

// // Step 2
// let mailOptions = {
//   from: 'mytutortest@gmail.com', 
//   // TODO: email receiver - pull from registrinvite form submit
//   to: req.body.emailid, 
//   subject: 'Welcome to My Tutor!',
//   text: 'Welcome to My Tutor, ' + req.body.firstName + '! Please register here to get started with your tutoring sessions.' 
// };

// // Step 3
// transporter.sendMail(mailOptions, (err, data) => {
//   if (err) {
//       return log('There is an error with your nodemailer component in server.js');
//   }
//   return log('Email sent!!!');
// });


// res.json({email: 'sent'})
// });
// Define API routes here




// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

