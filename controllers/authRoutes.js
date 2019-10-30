var express = require('express');
var router = express.Router();
var model = require('../model');
const passport = require('../config/passport');
//some examples use express router to handle these routes but I read that that isn't necessary
// const app = express();

//i have no idea what is going on in this function...
// var isAuthenticated = function (req, res, next) {
// 	// if user is authenticated in the session, call the next() to call the next request handler 
// 	// Passport adds this method to request object. A middleware is allowed to add properties to
// 	// request and response objects
// 	if (req.isAuthenticated()) {
//         return next();
//     }
		
//     // if the user is not authenticated then redirect him to the login page  
//     res.redirect('/');
// }

// module.exports = function(passport){

    //when url doesn't hit an route that is an API, it will hit our aplication and automatically flow into the react router
    // router.get("/", isAuthenticated, function(req, res)  {
    //     console.log('in app.get/');
    //     res.sendFile(path.join(__dirname, "../client/public/index.html"));
    // });

    // router.post('/login', 
    //     passport.authenticate('local', { failureRedirect: '/login' }),
    //     function(req, res) {
    //         res.redirect('/');
    //     });

    // router.post('/signup', function(req, res) {
    //     const { emailid, firstName, lastName, password } = req.body

    //     model.create({
    //         emailid: emailid,
    //         password: password,
    //         firstName: firstName,
    //         lastName: lastName
    //     }).then(res => {
    //         console.log(res)
    //     })
    //     res.send(req.body)
    // });
  
router.post('/signup', (req, res) => {
    console.log('user signup');

    const { emailid, firstName, lastName, password } = req.body
    // ADD VALIDATION
    model.findOne({ emailid: emailid }, (err, user) => {
        if (err) {
            console.log('model.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the email address: ${emailid}`
            })
        }
        else {
            console.log('in new user');
            const newUser = new model({
                emailid: emailid,
                password: password
            })
            console.log('newUser: ', newUser);
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
                console.log('savedUser: ', savedUser);
            })
        }
    })
});

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        // next()
    },
//     passport.authenticate('local'),
//     (req, res) => {
//         console.log('logged in', req.user);
//         var userInfo = {
//             username: req.user.firstName
//         };
//         res.send(userInfo);
//     }
// )
    

//     logout = fsunction(req, res) {
//         req.session.destroy(function(err) {
//             res.redirect('/');
//         });
//     }
// }

module.exports = router;



	/* Handle Login POST */
	// app.post('/login', passport.authenticate('login', {
	// 	successRedirect: '/home',
	// 	failureRedirect: '/',
	// 	failureFlash : true  
    // }));
    
    

	/* GET Registration Page */
	

	/* Handle Registration POST */
	// app.post('/signup', passport.authenticate('signup', {
	// 	successRedirect: '/home',
	// 	failureRedirect: '/signup',
	// 	failureFlash : true  
	// }));

	// /* GET Home Page */
	// app.get('/home', isAuthenticated, function(req, res){
	// 	res.render('home', { user: req.user });
	// });

	// /* Handle Logout */
	// app.get('/signout', function(req, res) {
	// 	req.logout();
	// 	res.redirect('/');
	// });

	// return router;

