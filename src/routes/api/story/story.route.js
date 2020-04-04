const router = require('express').Router();
const storyController = require('../../../controllers/story.controller');

router.get('/', storyController.get);

module.exports = router;
