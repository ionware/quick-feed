const cors = require('cors');
const router = require('express').Router();
const config = require('config');
const apiRoute = require('./api/api.route');
const limitRequest = require('../configs/limiter.config');

const apiConfig = config.api;

router.get('/', (req, res) => {
  res.json({
    message: 'System OK'
  });
});

router.use(`/api/${apiConfig.version}/`, cors(), limitRequest, apiRoute);

module.exports = router;
