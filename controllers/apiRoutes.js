var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var braintree = require('braintree');

//require db for hitting is auth method;
const db = require('../model');


//payment api setup. If we want to have dynamic payments sent directly to the logged in teacher, we need the teacher to provide their merchant id, public key, and private key. Change that below dynamically. 
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '9tcq3ypzspqhjqk7',
  publicKey: '6k79n6k7bq4tg38j',
  privateKey: '2198178311d1a642203ecc7ff935239a'
});

//Payment Routes
router.post('/checkout', function (req, res) {
  var nonceFromTheClient = req.body.payload.nonce;
  var amount = req.body.amount;
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    res.send(true);
  });
});

var model = require("../model");
const nodemailer = require('nodemailer');
const log = console.log;

mongoose.connect("mongodb://localhost/maindatabase", { useNewUrlParser: true });
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//Teacher reqistration - create a document in db /tested
//Teacher=true; however, Postman doesn't show true, but DB is updated
router.post("/registration-teacher", function (req, res) {
  model.find({ "emailid": req.body.emailid }).then(function (result) {
    if (result.length == 0) {
      model.create(req.body)
        .then(function (dbUser) {
          model.findOneAndUpdate({ "emailid": req.body.emailid }, { "isTeacher": true }).then(function (result) {
            res.json(result);
          }
          );
        })
        .catch(function (err) {
          res.json(err);
        });
    } else {
      res.json({ success: false, message: 'user already exists in db' });
    }
  });
});

//invitation sent to student /tested/ Steph add teacher's email as teacherIs
router.post("/send-invite", function (req, res) {
  model.find({ "emailid": req.body.emailid }).then(function (result) {
    //console.log (result);
    if (result.length > 0) {
      res.json({ success: false, message: 'user already exists in db' });
    } else {
      model.create(req.body)
        .then(function (dbUser) {
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

          res.json({ email: 'sent' });
        })

        .catch(function (err) {
          res.json(err);
        });
    }
    
  });//add get req. to check if email exists, let register||message
});

  //Add Student button -works
  // router.post("/add-student", function (req, res) {
  //   // const date = new Date();
  //   // const formatted = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + ':' + 'date.getMinutes()';

    // console.log(req.body);
    // model.findOneAndUpdate({ "emailid": req.body.emailid }, { "class": {"className": req.body.className, "tuition": req.body.tuition, "time": req.body.utcNewTime, "date": req.body.utcNewDate,}, "tuitionOwed": req.body.tuition}).then(function (result) {
      
  //     res.json(result);
  //   });
  // });

router.post("/populate-edit-student", function (req, res) {
  console.log(req.body);
  model.find({ "emailid": req.body.emailid }).then(function (result) {

    res.json(result);
  });
});

router.post("/edit-student", function (req, res) {
  model.findOneAndUpdate({ "emailid": req.body.emailid }, { class: { "tuition": req.body.class.tuition, "time": req.body.class.time, "date": req.body.class.date, "className": req.body.class.className}, "isTeacher": false}, { upsert: false, new: true }).then(function (result) {

    res.json(result);
  });
});
//add get req. for students to check if email exists, let register||message /tested
router.post("/registration-student", function (req, res) {
  model.find({ "emailid": req.body.emailid }).then(function (result) {
    console.log('result: ', result);
    if (result.length == 0) {
      console.log("Crazy");
      res.json({ success: false, message: 'user registers by invite only' });
    } else {
      model.findOneAndUpdate({ "emailid": req.body.emailid }, { firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password, isRegistedred: true }, { upsert: false })
        .then(function (dbUser) {
          console.log("crazy1", dbUser);
          res.json({ message: "You are registered!" });
        })
        .catch(function (err) {
          res.json(err);
        });

    }
  });
});

//Add Student button /tested
router.post("/add-student", function (req, res) {
  // const date = new Date();
  // const formatted = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + ':' + 'date.getMinutes()';

  console.log(req.body);
  model.findOneAndUpdate({ "emailid": req.body.emailid }, { "class": {"className": req.body.className, "tuition": req.body.tuition, "time": req.body.utcNewTime, "date": req.body.utcNewDate,}, "tuitionOwed": req.body.tuition, "isTeacher": false}, { upsert: false }).then(function (result) {
    res.json(result);

  // model.findOneAndUpdate({ "emailid": req.body.emailid }, { class: { "tuition": req.body.class.tuition, "time": req.body.class.time, "date": req.body.class.date, "className": req.body.class.className}, "isTeacher": false}, { upsert: false }).then(function (result) {
    // console.log('in here: ', result);
    // model.findOneAndUpdate({ "emailid": req.body.emailid }, { "tuitionOwed": req.body.class.tuition }, { upsert: false }).then(function (result) { res.json(result); });

  });
});

//Delete record/ tested
router.post("/delete", function (req, res) {
  model.findOneAndDelete({ "emailid": req.body.emailid }, function (result) {
    res.json({ "message": "Record was deleted" });
  });



});

//Student view. Gets all the logged in students information.
router.post("/student-view", function (req, res) {
  model.findOne({ "emailid": req.body.emailid }).then(function (result) {
    res.json(result)
  })
})

router.post('/teacher-name',function(req,res){
  model.findOne({ "emailid": req.body.teacherEmail }, "firstName lastName").then(function (result) {
    teacherName = result.firstName + ' ' + result.lastName
    res.send(teacherName)
  })
});



//drop-down menu - teachers
// router.get("/teachers", function (req, res) {

//   arrayOfTeachers = [];
//   const listOfTeachers = (response) => {

//     for (var i = 0; i < response.length; i++) {
//       arrayOfTeachers.push(response[i].teacherIs);
//     }
//     return arrayOfTeachers;
//   }

//   model.find({}, "teacherIs").then(function (result) {

//     const teachersList = listOfTeachers(result);
//     //console.log('teachersList: ', teachersList);
//     res.json(teachersList);

//     //}
//   });
// });

//drop-down menu - students/ tested / Needs to add Teacher's email in request
router.get("/students-list", function (req, res) {
  console.log('are we here?');
  
  var arrayOfStudents = [];

 

  const listOfStudents = (response) => {
    console.log('are we in this fn?');

    for (var i = 0; i < response.length; i++) {
      var list={
        name: "",
        emailid: "",

    
      };
      list.name=response[i].firstName + " " + response[i].lastName;
      list.emailid=response[i].emailid;
    
      //arrayOfStudents.push(response[i].firstName + " " + response[i].lastName);
      arrayOfStudents.push(list);
    }
    //return arrayOfStudents.sort();
    return arrayOfStudents;
  };

  model.find({ "teacherIs": req.query.teacherIs}).then(function (result) {
    console.log("What 2222?"+result);
    const studentsList = listOfStudents(result);
    //console.log('studentsList: ', studentsList);
    res.json(studentsList);
  });
});

router.get("/student-info", function (req, res) {
  console.log("student info result1: " + res)
  console.log("is this the email id?" + req.query.emailid)

  model.find({ "emailid": req.query.emailid }).then(function (result) {
    console.log("student info result2: " + result);

    res.json(result);
  });
});

//get payment info /tested
router.get("/payment", function (req, res) {
  model.find({ "emailid": req.body.emailid }, "tuitionOwed").then(function (result) {
    console.log(result);
    res.json(result);
  });
});

//Route to get all classes for the teacher.
router.post("/teacher-view", function (req, res) {

  model.find({ "teacherIs": req.body.teacherIs }, "firstName lastName class amountOwed").then(function (result) {
    console.log(result);
    res.json(result);
  });

});

function ensureAuthenticated(req, res, next) {
    console.log('req.user from passport on front end: ', req.user);
    console.log('req', req);
    if (req.isAuthenticated())
        return next();
    else{
        res.redirect('/users/login')
    }
}

module.exports = router;