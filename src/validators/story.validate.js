const Joi = require('@hapi/joi');

function validator(value) {
  const schema = Joi.object({
    type: Joi.string().valid('feed', 'poll').required(),
    excerpt: Joi.string().required(),
    title: Joi.string().required(),

    // [options, end] fields are only required and allowed for type 'poll'
    options: Joi.alternatives().conditional('type', {
      is: 'poll',
      then: Joi.array().required(),
      otherwise: Joi.forbidden()
    }),
    end: Joi.alternatives().conditional('type', {
      is: 'poll',
      then: Joi.string().optional(),
      otherwise: Joi.forbidden()
    }),

    // [description] field is only allowed for type 'feed'.
    description: Joi.alternatives().conditional('type', {
      is: 'feed',
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    })
  });

  return schema.validate(value, {abortEarly: false});
}

module.exports = validator;
