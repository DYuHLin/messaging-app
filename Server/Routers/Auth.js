const express = require('express');
const auth = require('../Controllers/AuthController');

const router = express.Router();

router.post('/', auth.post_register);

module.exports = router;