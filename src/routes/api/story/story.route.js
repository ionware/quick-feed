const router = require('express').Router();
const {isLoggedIn} = require('../../../controllers/auth.controller');
const storyController = require('../../../controllers/story.controller');

router.get('/', storyController.get);
router.post('/', isLoggedIn, storyController.post);
router.delete('/:id', isLoggedIn, storyController.delete);

module.exports = router;
