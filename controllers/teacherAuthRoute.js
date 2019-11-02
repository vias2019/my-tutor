const db = require("../model");
const passport = require('passport');

module.exports = app => {
  app.post('/teacher-registration', (req, res, next) => {
    passport.authenticate('registerTeacher', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailid: req.body.emailid
          };
          db.findOne({
            where: {
              emailid: data.emailid,
            },
          }).then(user => {
            db.update({
                first_name: data.first_name,
                last_name: data.last_name,
                emailid: data.emailid,
                isTeacher:true
              })
              .then(() => {
                console.log('user created in db');
                res.status(200).send({ message: 'user created' });
              });
          });
        });
      }
    })(req, res, next);
  });
};