const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const userRoute = require('./user/user.route');
const storyRoute = require('./story/story.route');
const swaggerSpec = require('../../../config/openapi');

router.use('/user', userRoute);
router.use('/story', storyRoute);

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;
