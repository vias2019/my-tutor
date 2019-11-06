const db = require("../model");
const passport = require('passport');

module.exports = app => {
    app.post('/student-registration', (req, res, next) => {
        var wasInvited = false;
        var reqBody = req.body;
        console.log('request body: ', reqBody);

            db.findOne({
                emailid: reqBody.emailid,
            }).then(user => {
                console.log('user object after findOne: ', user);
               
                    passport.authenticate('registerStudent', (err, user, info) => {
                        console.log('req.body from passport: ', req.body);

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
                                    emailid: req.user.emailid,
                                    password: req.user.password,
                                    isRegistered: true,
                                    amountOwed: 0,
                                    class: {
                                        className: '',
                                        tuition: 0,
                                        time: '',
                                        date: ''
                                    }
                                };
                                console.log('req.user: ', req.user);
                                console.log('user in auth route: ', user);
                                console.log(data)
                                console.log('email address in data object in auth route: ', data.emailid);
                                db.findOneAndUpdate({
                                    emailid: data.emailid,
                                },
                                {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    password: data.password,
                                    isTeacher:false,
                                    isRegistered: data.isRegistered,
                                    amountOwed: data.amountOwed,
                                    class: data.class
                                },
                                {new: true}).then(routeUpdatedUser => {
                                    console.log('routeUpdateUser: ', routeUpdatedUser);
                                    console.log('user created in db');
                                    res.status(200).send({ message: 'user created' });
                                });
                            });
                        }
                    })(req, res, next);
                
            });
    });

};