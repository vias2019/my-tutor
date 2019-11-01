const express = require('express');
const router = express.Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const db = require("../model");


router.post("/teacher-registration", (req, res, next) => {
  console.log(req.body, "inside teacher sign up post");
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailid: req.body.emailid,
    password: req.body.password,
    isTeacher: true
  };

  db.create(newUser).then(data => {

    //mongo id syntax??

    const token = jwt.sign({
      userId: data._id,
      emailid: data.emailid,
      firstName: data.firstName,
      lastName: data.lastName
    }, process.env.JWT_SECRET);

    const result = {
      data,
      token
    };

    return res.json(result);
    }).catch(err => {
      if (err) {
        console.log(err);
        return res.json({ error: err.message });
      }
    })

});

  router.post("/student-registration", (req, res, next) => {
    console.log(req.body, "inside post student sign up");
    db.findOne({ where: { emailid: req.body.emailid } }).then
    {
        const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailid: req.body.emailid,
        password: req.body.password
        };
    
        db.create(newUser).then(data => {
    
        const token = jwt.sign({
            userId: data._id,
            emailid: data.emailid,
            firstName: data.firstName,
            lastName: data.lastName
        }, process.env.JWT_SECRET);
    
        const result = {
            data,
            token
        };
    
        return res.json(result);
        }).catch(err => {
            if (err) {
            console.log(err);
            return res.json({ error: err.message });
            }
        })
      }
    })

router.post("/login", (req, res) => {

  db.find({ emailid: req.body.emailid }).then(function (result) {
console.log(req.body, "inside teacher sign up post");
console.log(req.body.password, "req.body.password");
console.log(result[0].password, "database - password");
    // is this authentication my passwords without my "checkpassword method?

    if (bcrypt.compareSync(req.body.password, result[0].password)) {

        console.log('comparesync successful');
      const token = jwt.sign({
        userId: result[0]._id,
        emailid: result[0].emailid,
        firstName: result[0].firstName,
        lastName: result[0].lastName
      }, process.env.TOKEN);
      console.log('show res: ', res.json);
      return res.json({
        userId: result[0]._id,
        emailid: result[0].emailid,
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        token: token
      });
      
    } else {
      console.log("not authenticated")
      return res.json({
        error: "Invalid emailid/password"
      });
    }}).catch(err => {
      console.log(err);
    });

});

//test route to see all users 
router.get("/users", (req, res) => {
  db.findAll({}).then(result => {
    res.json(result)
  })
})


module.exports = router;
