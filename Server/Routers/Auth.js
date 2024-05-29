const express = require('express');
const auth = require('../Controllers/AuthController');

const router = express.Router();

router.post('/', auth.post_register);
router.put('/addfriend', auth.add_friend);
router.get('/users', auth.get_users);

module.exports = router;