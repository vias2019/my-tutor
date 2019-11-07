const bcrypt = require("bcryptjs");
// const bcrypt_SALT_ROUNDS = 12;

const passport = require('passport'),
localStrategy = require('passport-local').Strategy,
db = require('../model'),
JWTstrategy = require('passport-jwt').Strategy,
ExtractJWT = require('passport-jwt').ExtractJwt;

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
console.log('*** serializeUser called, user: ')
console.log(user) // the whole raw user object!
console.log('---------')
done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
console.log('DeserializeUser called')
User.findOne(
{ _id: id },
'username',
(err, user) => {
console.log('*** Deserialize user, user:')
console.log(user)
console.log('--------------')
done(null, user)
}
)
})





// Generates hash using bCrypt
var createHash = function(password){
    var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
    console.log('hashed password:', hashedPassword);
    return hashedPassword;
}


passport.use(
'registerTeacher',
new localStrategy(
{
usernameField: 'emailid',
passwordField: 'password',
session: false,
},
(emailid, password, done) => {
try {
db.findOne({
emailid: emailid,
}).then(user => {
if (user != null) {
console.log('email address already taken');
return done(null, false, { message: 'emailid already taken' });
} else {
db.create({ 
    emailid, 
    password: createHash(password),
    isRegistered: true,
    isTeacher:true
}).then(user => {
    console.log('user created', user);
    // note the return needed with passport local - remove this return for passport JWT to work
    return done(null, user);
});
}
});
} catch (err) {
done(err);
}
},
),
);


passport.use(
    'registerStudent',
    new localStrategy(
        {
        usernameField: 'emailid',
        passwordField: 'password',
        session: false,
        },
        (emailid, password, done) => {

        
        //try nested find queries
            
            db.find({
                emailid: emailid,
            }).then(user => {
                console.log('user from find in passport: ', user);
                if (user == null) {
                    return done(null, false, { message: 'You have not been invited by a teacher in our system'} )      
                    // if (user[0].isRegistered){
                    //     return done(null, false, { message: 'A student has already registered with this email address' });
                    // } else {
                    } else {
                        
                    var hashedPassword = createHash(password).toString();
                    console.log('found the updated password', hashedPassword);
                    db.findOneAndUpdate(
                        { emailid: emailid },
                        { password: hashedPassword }, 
                        { new: true  }
                        ).then(updatedUser => {
                            console.log('updatedUser created', updatedUser);
                            // note the return needed with passport local - remove this return for passport JWT to work
                            return done(null, updatedUser);
                        });
                    }
                })
        
        },
    ),
);

passport.use(
'login',
new localStrategy(
{
usernameField: 'emailid',
passwordField: 'password',
session: false,
},
(emailid, password, done) => {
try {
db.findOne({
emailid: emailid,
}).then(user => {
if (user === null) {
return done(null, false, { message: 'Your email and/or password is not valid.  Please try again.' });
} else {
console.log('in passport showing user: ', user);
console.log('in passport showing password: ', password);
const passwordsMatch = bcrypt.compareSync(password, user.password);//.then(response => {

if (!passwordsMatch) {
console.log('passwords do not match');
return done(null, false, { message: 'Your email and/or password is not valid.  Please try again.' });
}
console.log('user found & authenticated');

// note the return needed with passport local - remove this return for passport JWT
return done(null, user);
// });
}
});
} catch (err) {
done(err);
}
},
),
);

const opts = {
jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
secretOrKey: process.env.TOKEN, // get jwt secret from environment variable,
};

passport.use(
'jwt',
new JWTstrategy(opts, (jwt_payload, done) => {
try {
db.findOne({
where: {
emailid: jwt_payload.id,
},
}).then(user => {
if (user) {
console.log('user found in db in passport');
// note the return removed with passport JWT - add this return for passport local
done(null, user);
} else {
console.log('user not found in db');
done(null, false);
}
});
} catch (err) {
done(err);
}
}),
);

module.exports = passport