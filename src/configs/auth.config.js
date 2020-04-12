const config = require('config');
const mongoose = require('mongoose');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const JWTExtract = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const UserModel = mongoose.model('User');

// Configure Local strategy for login.
passport.use(
  // eslint-disable-next-line func-names
  new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    // Find the user bearing the email:
    UserModel.findOne({email})
      .then(async user => {
        if (!user) return done(null, false, "Email doesn't exists");
        // Try to validate the user password with the supplied password
        // An helper method is available on model document to do that: check user.model.js
        const isValid = await user.validatePassword(password);
        if (!isValid) return done(null, false, 'Password mismatch');

        return done(null, user, 'Auth success');
      })
      .catch(error => done(error, false));
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret
    },
    // eslint-disable-next-line func-names
    function (jwtPayload, done) {
      // eslint-disable-next-line no-underscore-dangle
      UserModel.findById(jwtPayload._id)
        .then(user => done(null, user))
        .catch(error => done(error, false));
    }
  )
);
