const router = require('express').Router();
const config = require('config');
const apiRoute = require('./api/api.route');

const apiConfig = config.api;

router.get('/', (req, res) => {
  res.json({
    message: 'System OK'
  });
});

router.use(`/api/${apiConfig.version}/`, apiRoute);

module.exports = router;
