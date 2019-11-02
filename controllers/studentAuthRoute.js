const db = require("../model");
const passport = require('passport');

module.exports = app => {
  app.post('/student-registration', (req, res, next) => {
    passport.authenticate('registerStudent', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
          console.log('req.body: ', req.body);
          console.log('user: ', user);
          
        req.logIn(user, err => {
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
          isTeacher:false
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