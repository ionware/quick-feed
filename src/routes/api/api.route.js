const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const feedsRoute = require('./feeds/feed.route');
const storyRoute = require('./story/story.route');
const swaggerSpec = require('../../../config/openapi');

router.use('/story', storyRoute);
router.use('/feeds', feedsRoute);

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;
