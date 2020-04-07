const passport = require('passport');
const jwt = require('jsonwebtoken');
const Mapper = require('../helpers/object-mapper');

class AuthController {
  /**
   * Sign In a User into the app: it validates their email and password
   * combination and generate them a valid token upon success validation.
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {func} next
   */
  static logIn(req, res, next) {
    passport.authenticate('local', {session: false}, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Auth failed'
        });
      }
      const payload = Mapper.project(user, [
        '_id',
        'firstName',
        'lastName',
        'email'
      ]);
      // generate token.
      const token = jwt.sign(payload, 'key-secret');
      return res.json({
        message: 'Auth success',
        token
      });
    })(req, res, next);
  }

  /**
   * Ensures that the requester is authenticated via token. It enforce token
   * is presented and it is valid.
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {func} next
   */
  static isLoggedIn(req, res, next) {
    passport.authenticate('jwt', {session: false}, (error, user) => {
      if (error || !user) {
        return res.status(401).json({
          message: 'Authentication required.'
        });
      }
      return req.login(user, {session: false}, err => {
        if (err) return next(err);
        return next();
      });
    })(req, res, next);
  }
}

module.exports = AuthController;
