/*
 * Passport configuration file
 */

// Dependencies
const passport = require('passport');
const passportJWT = require("passport-jwt");
const User = require('../model/user');
const configuration = require('./configuration');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: configuration.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(new Strategy(params,
  function(jwt_payload, done) {
    User.findOne({ '_id': jwt_payload.id }, function (err, user) {
      if (err)
        return done(err);

      if (user)
        done(null, user);
      else
        done(null, false);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
