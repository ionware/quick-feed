const signupFormValidator = require('../validators/user.validate');
const {createUser} = require('../services/user.service');
const Mapper = require('../helpers/object-mapper');

class UserController {
  /**
   * Create a new user account.
   *
   * @param {object} req express request
   * @param {object} res express response object
   * @param {func} next
   */
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
      const user = await createUser(null, value);
      res.json({
        message: 'Account created',
        data: user
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get the logged in (token) user's information (account info)
   *
   * @param {object} req express request object
   * @param {object} res express response object
   */
  static async get(req, res) {
    const response = Mapper.except(req.user.toObject(), ['__v', 'password']);
    res.json({
      message: 'Your Info',
      data: response
    });
  }
}

module.exports = UserController;
