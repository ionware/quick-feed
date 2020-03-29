const router = require('express').Router();
const feedsRoute = require('./feeds/feed.route');

router.use('/feeds', feedsRoute);

module.exports = router;
