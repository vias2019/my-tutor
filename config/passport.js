const bcrypt = require("bcryptjs");

const bcrypt_SALT_ROUNDS = 12;

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  db = require('../model'),
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'emailid',
      passwordField: 'password',
      session: false,
    },
    (emailid, password, done) => {
      try {
        db.findOne({
            emailid: emailid
        }).then(user => {
          if (user != null) {
            console.log('email address already taken');
            return done(null, false, { message: 'emailid already taken' });
          } else {
            bcrypt.hash(password, bcrypt_SALT_ROUNDS).then(hashedPassword => {
              User.create({ emailid, password: hashedPassword }).then(user => {
                console.log('user created', user);
                // note the return needed with passport local - remove this return for passport JWT to work
                return done(null, user);
              });
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
  'login',
  new localStrategy(
    {
      emailidField: 'emailid',
      passwordField: 'password',
      session: false,
    },
    (emailid, password, done) => {
      try {
        db.findOne({
            emailid: emailid
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad email address' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log('user found & authenticated');
              // note the return needed with passport local - remove this return for passport JWT
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

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.TOKEN, // get jwt secret from environment variable,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
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