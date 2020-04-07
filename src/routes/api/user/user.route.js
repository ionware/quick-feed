const router = require('express').Router();
const controller = require('../../../controllers/user.controller');

router.post('/', controller.post);
router.get('/me', controller.get);

module.exports = router;
