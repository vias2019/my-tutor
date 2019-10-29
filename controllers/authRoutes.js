var express = require('express');
var db = require('../model');
//some examples use express router to handle these routes but I read that that isn't necessary
const app = express();

//i have no idea what is going on in this function...
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
    // if the user is not authenticated then redirect him to the login page
        
	    res.redirect('/');
}

module.exports = function(passport){

    //when url doesn't hit an route that is an API, it will hit our aplication and automatically flow into the react router
    app.get("/", isAuthenticated, function(req, res)  {
        console.log('in app.get/');
        res.sendFile(path.join(__dirname, "../client/public/index.html"));
    });

    logout = function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    }
}



// 	/* Handle Login POST */
// 	app.post('/login', passport.authenticate('login', {
// 		successRedirect: '/home',
// 		failureRedirect: '/',
// 		failureFlash : true  
// 	}));

// 	/* GET Registration Page */
// 	app.get('/signup', function(req, res){
// 		res.render('register',{message: req.flash('message')});
// 	});

// 	/* Handle Registration POST */
// 	app.post('/signup', passport.authenticate('signup', {
// 		successRedirect: '/home',
// 		failureRedirect: '/signup',
// 		failureFlash : true  
// 	}));

// 	/* GET Home Page */
// 	app.get('/home', isAuthenticated, function(req, res){
// 		res.render('home', { user: req.user });
// 	});

// 	/* Handle Logout */
// 	app.get('/signout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});

// 	return router;
// }
