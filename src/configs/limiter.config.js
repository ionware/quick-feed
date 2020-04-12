const config = require('config');
const limitRequest = require('express-rate-limit');

module.exports = limitRequest({
  windowMs: config.api.request.time,
  max: config.api.request.maxRequest
});
