const db = require("../model");
const jwt = require('jsonwebtoken');
const passport = require('passport');


module.exports = app => {


    // const isAuthenticated = function (req, res, next) {
    //     if(req.isAuthenticated()) return next();
    //     else res.redirect('/login')
      
    //   }
    //   app.get('/', isAuthenticated, function (req, res, next) {
    //       res.render('index', {
    //           title: 'Express'
    //       });
    //   });

  app.post('/login', (req, res, next) => {
      console.log('hitting passport authenticate');
      console.log('req.body that is coming from the axios call: ', req.body);

    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log('error returned by passport: ', err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          db.findOne({
              emailid: user.emailid
          }).then(user => {
            const token = jwt.sign({ id: user.emailid }, process.env.TOKEN);
            res.status(200).send({
              auth: true,
              token: token,
              message: 'user found & logged in',
            });
          });
        });
      }
    })(req, res, next);
  });
};