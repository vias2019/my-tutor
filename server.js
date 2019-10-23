var mongoose = require("mongoose");

var model = require("./model.js");

mongoose.connect("mongodb://localhost/maindatabase", { useNewUrlParser: true });

// // Configuring Passport
// var passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());

// const session = require('express-session')
// ...
// //sessions
// app.use(
//   session({
//   secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
//   resave: false, //required
//   saveUninitialized: false //required
//   })
// )

// // This is a console.log, that shows us the basic info that is in the user object
// app.use( (req, res, next) => {
//     console.log('req.session', req.session);
//     return next();
//   });

//   app.use( (req, res, next) => {
//     console.log('req.session', req.session);
//     next()
//   });
//   app.post('/user', (req, res) => {
//     console.log('user signup');
//     req.session.username = req.body.username;
//     res.end()
//   })




// // Require Database (This will be the route to the database, not ./database)
// const dbConnection = require('./database')
// const user = require('./routes/user')
// // ****In API routes, we need to write your mongoose request to save the new user.***

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



//Teacher reqistration - create a document in db - works
app.post("/submit-teacher", function(req, res) {
  model.create(req.body)
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});
//invitation sent to student -works
app.post("/send-invite", function(req, res) {
  model.create(req.body)
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});
//Student registration
app.post("/student-reg", function (req, res) {
  model.findOneAndUpdate({ "email": req.body.email }, { "isRegistered": true, "password": req.body.password }).then(function (err, result) {

    if (err) throw err;
    res.json({"message":"Email does not exist"});
  });
});

//Add Student button
//Should we search by student ID?
app.post("/add-student", function (req, res) {
const date = new Date();
const formatted = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + ':' + 'date.getMinutes()';

  model.findOneAndUpdate({ "email": req.body.email }, { "className": req.body.className, "tuition": req.body.tuition, "schedule": req.body.schedule, "date":req.body.date, "time": req.body.time }).then(function (err, result) {

    if (err) throw err;
    res.json({"message":"Email does not exist"});
  });
});

//Delete record
app.post("/delete", function (req, res) {
  model.findOneAndDelete({ "email": req.body.email }).then(function (err, result) {

    if (err) throw err;
    res.json({"message":"Record was deleted"});
  });
});

//Student view
app.get("/student-view", function (req, res) {
  model.findOne({ "email": req.body.email},{"teacherIs": res.body.teacherIs, "className": res.body.className, "tuition": res.body.tuition, "schedule":res.body.schedule, "date": res.body.date, "time": res.body.time, "tuitionOwed": res.body.tuitionOwed  }).then(function (err, result) {

    if (err) throw err;
    res.json(result);
  });
});

//get payment info
//add logic here
app.get("/payment", function (req, res) {
  model.findOne({ "email": req.body.email},{"tuitionOwed": res.body.tuitionOwed}).then(function (err, result) {

    if (err) throw err;
    res.json();
  });
});

//calendar read - firstname, lastname, date - works
app.get("/calendar", function (req, res) {
  responseArray=[];
  model.find({"isTeacher": false}, 'firstName lastName date class', function(err,result){
  res.json(result);
  });

  
  //{projection: {firstName, lastname, schedule, date, time}})
  // .then(function (err, result) {

  //      if (err) console.log("no records");
  //       res.json(result);
  // });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

