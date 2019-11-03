const db = require("../model");
const passport = require('passport');

module.exports = app => {
    app.post('/student-registration', (req, res, next) => {
        var wasInvited = false;
        var passwordsMatch = false;
        var reqBody = req.body;
        console.log('request body: ', reqBody);

            db.findOne({
                emailid: reqBody.emailid,
            }).then(user => {
                console.log('user object after findOne: ', user);
                if (user != null) {
                    wasInvited = true;
                    if (req.body.password === req.body.confirmpassword){
                        passwordsMatch = true;
                    }
                }
                else{
                    console.log('student does not exist');
                    wasInvited = false;
                };
            
                if (wasInvited && passwordsMatch){
                    passport.authenticate('registerStudent', (err, user, info) => {
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
                                    password: user[0].password,
                                    emailid: user[0].emailid,
                                    isRegistered: true
                                };
                                console.log('req.user: ', req.user);
                                console.log('user in auth route: ', user);
                                console.log('email address in data object in auth route: ', data.emailid);
                                db.findOneAndUpdate({
                                emailid: data.emailid,
                                },
                                {
                                firstName: data.firstName,
                                lastName: data.lastName,
                                password: data.password,
                                isTeacher:false,
                                isRegistered: data.isRegistered
                                },
                                {new: true}).then(routeUpdatedUser => {
                                    console.log('routeUpdateUser: ', routeUpdatedUser);
                                    console.log('user created in db');
                                    res.status(200).send({ message: 'user created' });
                                });
                            });
                        }
                    })(req, res, next);
                }
            });
    });

};