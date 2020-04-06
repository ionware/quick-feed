const mongoose = require('mongoose');
const signupFormValidator = require('../validators/user.validate');

const UserModel = mongoose.model('User');

class UserController {
  static async post(req, res, next) {
    const {value, error} = signupFormValidator(req.body);
    if (error) {
      // Extract error messages to thier corresponding keys (form fields)
      const badInputs = error.details.reduce((errors, single) => {
        return Object.assign(errors, {[single.path[0]]: single.message});
      }, {});

      res.status(400).json({
        message: 'Bad inputs',
        errors: badInputs
      });
    }
    try {
      const user = await UserModel.create(value);
      res.json({
        message: 'Account created',
        data: user
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
