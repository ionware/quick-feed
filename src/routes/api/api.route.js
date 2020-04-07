const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const authRoute = require('./auth/auth.route');
const userRoute = require('./user/user.route');
const storyRoute = require('./story/story.route');
const swaggerSpec = require('../../../config/openapi');
const {isLoggedIn} = require('../../controllers/auth.controller');

router.use('/auth', authRoute);
// Requires Authentication all through.
router.use('/user', isLoggedIn, userRoute);
router.use('/story', storyRoute);

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;
