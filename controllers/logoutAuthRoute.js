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

    app.get('/logout', function(req, res){
        req.logout();
        res.json({
            success:true,
            redirect: '/'
        })
      });
};