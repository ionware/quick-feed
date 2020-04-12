const router = require('express').Router();
const controller = require('../../../controllers/user.controller');

router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;
