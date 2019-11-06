const db = require("../model");
const passport = require('passport');

module.exports = app => {
  app.post('/teacher-registration', (req, res, next) => {
    passport.authenticate('registerTeacher', (err, user, info) => {
      if (err) {
        console.log(err);
        alert('We were not able to register you.  Please try again.')
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
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