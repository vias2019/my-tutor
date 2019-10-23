// var mongoose = require("mongoose");

// var model = require("./model.js");

// mongoose.connect("mongodb://localhost/maindatabase", { useNewUrlParser: true });

require('dotenv').config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const nodemailer = require('nodemailer');
const log = console.log;
// const dropin = require('braintree-web-drop-in')

// dropin.create({
//   authorization: 'sandbox_tv289x3x_9tcq3ypzspqhjqk7',
//   container: '.dropin-container'
// }, function(err,res){
//   console.log('@@@@DONE@@@@');
// })

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Student registration email notification: 
// Step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD 
  }
});

// Step 2
let mailOptions = {
  from: 'mytutortest@gmail.com', 
  // TODO: email receiver - pull from registrinvite form submit
  to: 'mytutortest@gmail.com', 
  subject: 'Welcome to My Tutor!',
  text: 'Welcome to My Tutor! Please register here to get started with your tutoring sessions.'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
      return log('There is an error with your nodemailer component in server.js');
  }
  return log('Email sent!!!');
});

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
