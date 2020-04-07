const router = require('express').Router();
const controller = require('../../../controllers/auth.controller');

router.post('/login', controller.logIn);

module.exports = router;
