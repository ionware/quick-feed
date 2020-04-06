const Joi = require('@hapi/joi');

function validator(value) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    fullname: Joi.string().forbidden(),
    password: Joi.string()
      .required()
      .min(8)
      .alphanum()
      .message('Must contain alphanumeric character not less than 8')
  });

  return schema.validate(value, {abortEarly: false});
}

module.exports = validator;
