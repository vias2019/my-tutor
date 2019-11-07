const db = require("../model");
const passport = require('passport');

module.exports = app => {
  app.post('/teacher-registration', (req, res, next) => {
      console.log('in post route for reacher reg');
    passport.authenticate('registerTeacher', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(201).send(info.message);
      } else {
        req.logIn(user, err => {
            console.log('user from passport: ', user);
          const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: user.password,
            emailid: user.emailid
          };
          db.findOneAndUpdate({
              emailid: data.emailid,
          },{
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            isTeacher:true
          },
          {new: true}).then(updatedUser => {
            console.log('updateUser: ', updatedUser);
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
          });
        });
      }
    })(req, res, next);
  });
};