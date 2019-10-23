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

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post('/send-invite',(req,res) => {
  console.log(req.body);

 

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
  to: req.body.emailid, 
  subject: 'Welcome to My Tutor!',
  text: 'Welcome to My Tutor, ' + req.body.firstName + '! Please register here to get started with your tutoring sessions.' 
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
      return log('There is an error with your nodemailer component in server.js');
  }
  return log('Email sent!!!');
});

res.json({email: 'sent'})
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
