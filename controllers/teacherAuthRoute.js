const db = require("../model");
const passport = require('passport');

module.exports = app => {
  app.post('/registerTeacher', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            emailid: req.body.emailid
          };
          db.findOne({
            where: {
              emailid: data.emailid,
            },
          }).then(user => {
            user
              .update({
                first_name: data.first_name,
                last_name: data.last_name,
                emailid: data.emailid
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