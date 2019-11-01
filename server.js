var mongoose = require("mongoose");
var mongo = require ("./controllers/apiRoutes")
// This is the route to the database
var model = require("./model.js");
const authRoutes = require('./controllers/authRoutes');


// const user = require('./routes/user')
// // ****In API routes, we need to write your mongoose request to save the new user.***

require('dotenv').config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
//setting up express session - this will allow us to maintain persistence in our loggedin user
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
// Route requires

const log = console.log;


// Define middleware her
// app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Configuring Passport
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
app.use(authRoutes);
// Routes
// app.use('/user', user);

// //load routes
// require('./controllers/authRoutes')(app, passport);

// //load passport strategies
// require('./config/passport')(passport, model);

// // app.post('/send-invite',(req,res) => {
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

