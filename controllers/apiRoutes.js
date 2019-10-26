var express = require('express')
var router = express.Router()
var mongoose = require("mongoose");
var braintree = require('braintree');


var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '9tcq3ypzspqhjqk7',
    publicKey:    '6k79n6k7bq4tg38j',
    privateKey:   '2198178311d1a642203ecc7ff935239a'
});

//Payment Routes
router.post('/checkout',function(req,res){
    var nonceFromTheClient = req.body.payload.nonce
    var amount = req.body.amount
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement:true
        }
    },function(err,result){
        res.send(true)
    })
})




mongoose.connect("mongodb://localhost/maindatabase", { useNewUrlParser: true });
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });
//Teacher reqistration - create a document in db - works
router.post("/submit-teacher", function (req, res) {
    model.create(req.body)
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  
  //invitation sent to student -works
  router.post("/send-invite", function (req, res) {
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
  router.post("/student-reg", function (req, res) {
    model.findOneAndUpdate({ "email": req.body.email }, { "isRegistered": true, "password": req.body.password }).then(function (result) {
      res.json(result);
    }
    );
  });
  
  //Add Student button -works
  router.post("/add-student", function (req, res) {
    // const date = new Date();
    // const formatted = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + ':' + 'date.getMinutes()';
    console.log(req.body);
    model.findOneAndUpdate({ "email": req.body.email }, { "tuition": req.body.tuition, "schedule": req.body.schedule, "date": req.body.date, "time": req.body.time }).then(function (result) {
  
      res.json(result);
    });
  });
  
  //Delete record -works
  router.post("/delete", function (req, res) {
    model.findOneAndDelete({ "email": req.body.email }, function (result) {
  
  
      res.json({ "message": "Record was deleted" });
    });
  });
  
  //Student view
  // TeacherName (dropdown selector)
  // ClassName
  // Monthly Rate -works
  router.get("/student-view", function (req, res) {
    model.find({ "email": req.body.email }, "teacherIs className tuition tuitionOwed").then(function (result) {
      res.json(result);
    });
  });
  
  //drop-down menu - teachers
  router.get("/teachers", function (req, res) {
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
      
      const teachersList = listOfTeachers(result);
      console.log('teachersList: ', teachersList);
      res.json(teachersList);
  
      //}
    });
  });
  
  //get payment info - works
  //add logic here 
  router.get("/payment", function (req, res) {
    model.find({ "email": req.body.email }, "tuitionOwed").then(function (result) {
  
      res.json(result);
    });
  });
  
  //calendar read - firstname, lastname, date - works
  router.get("/calendar", function (req, res) {
  
    model.find({ "isTeacher": false }, 'firstName lastName date class', function (result) {
      res.json(result);
    });
  
  });
  module.exports = router;