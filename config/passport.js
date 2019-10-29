var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var model =require("../model");

module.exports = function(passport){

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Local Login Strategy for Passport:
    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
        function(req, emailid, password, done) { 
            // check in mongo if a user with emal exists or not
            model.findOne({ 'emailid' :  emailid }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // email does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with email address '+ email);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );
        }
    )
    );


    var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
    }



    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Local Signup Strategy for Passport:

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
    },
        function(req, emailid, password, done) {
            console.log('in passport sign up');

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                model.findOne({ 'emailid' :  emailid }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with email address: '+emailid);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        // I'm not clear how this piece of code is working - what does User represent?  the import of my model used to be called User - want to make sure there is no confusion there.
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.emailid = emailid;
                        newUser.password = createHash(password);
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // next tick method seems to delay the execution of a function - I'm not sure why we'd want to do this... For Brian

            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        }
    )
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
