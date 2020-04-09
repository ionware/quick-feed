/**
 * Maps Joi error object into something useful for client
 * handlers.
 *
 * Joi errors are turned to something like:
 * {
 *    "field_name": "error_message"
 * }
 */
module.exports = function joiErrorsMap(errorObject) {
  return errorObject.details.reduce((errors, single) => {
    return Object.assign(errors, {[single.path[0]]: single.message});
  }, {});
};
