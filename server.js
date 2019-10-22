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

//Package for payment function.
const braintree = require("braintree");
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "9tcq3ypzspqhjqk7",
  publicKey: "6k79n6k7bq4tg38j",
  privateKey: "2198178311d1a642203ecc7ff935239a"
});
gateway.clientToken.generate({}, function (err, response) {
  var clientToken = response.clientToken
});

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
app.get('/client_token',function(req,res){
  gateway.clientToken.generate({},function(err,response){
    res.send(response.clientToken);
  })
})

app.post("/checkout", function (req, res) {
  var clientNonce = req.body.payload;
  gateway.transaction.sale({
    amount: "200.00",
    paymentMethodNonce: clientNonce}, function (err, result) {
  });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
