var mongoose = require("mongoose");

var model = require("./model.js");

mongoose.connect("mongodb://localhost/maindatabase", { useNewUrlParser: true });

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
app.post("/submit-teacher", function (req, res) {
  model.create(req.body)
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//invitation sent to student -works
app.post("/send-invite", function (req, res) {
  model.find({ email: 'viktoriya@gmail.com' }).then(function (result) {
    if (result) {
      res.json({ success: false, message: 'user already exists in db' });
    } else {
      model.create(req.body)
        .then(function (dbUser) {
          res.json(dbUser);
        })
        .catch(function (err) {
          res.json(err);
        });
    }
  });
});

//Student registration - works
app.post("/student-reg", function (req, res) {
  model.findOneAndUpdate({ "email": req.body.email }, { "isRegistered": true, "password": req.body.password }).then(function (result) {
    res.json(result);
  }
  );
});

//Add Student button -works
app.post("/add-student", function (req, res) {
  // const date = new Date();
  // const formatted = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + ':' + 'date.getMinutes()';
  console.log(req.body);
  model.findOneAndUpdate({ "email": req.body.email }, { "tuition": req.body.tuition, "schedule": req.body.schedule, "date": req.body.date, "time": req.body.time }).then(function (result) {

    res.json(result);
  });
});

//Delete record -works
app.post("/delete", function (req, res) {
  model.findOneAndDelete({ "email": req.body.email }, function (result) {


    res.json({ "message": "Record was deleted" });
  });
});

//Student view
// TeacherName (dropdown selector)
// ClassName
// Monthly Rate -works
app.get("/student-view", function (req, res) {
  model.find({ "email": req.body.email }, "teacherIs className tuition tuitionOwed").then(function (result) {
    res.json(result);
  });
});

//drop-down menu - teachers
app.get("/teachers", function (req, res) {
  console.log('are we here?');
  arrayOfTeachers = [];
  const listOfTeachers = (response) => {
    console.log('are we in this fn?');
    for (var i = 0; i < response.length; i++) {
      arrayOfTeachers.push(response[i].teacherIs);
    }
    return arrayOfTeachers;
  }

  model.find({}, "teacherIs").then(function (result) {
    // console.log('are we here also?', err);
    // if (err) {
    //   console.log("error?");
    //   res.json(err);
    // }else{
    const teachersList = listOfTeachers(result);
    console.log('teachersList: ', teachersList);
    res.json(teachersList);

    //}
  });
});

//get payment info - works
//add logic here 
app.get("/payment", function (req, res) {
  model.find({ "email": req.body.email }, "tuitionOwed").then(function (result) {

    res.json(result);
  });
});

//calendar read - firstname, lastname, date - works
app.get("/calendar", function (req, res) {

  model.find({ "isTeacher": false }, 'firstName lastName date class', function (result) {
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

