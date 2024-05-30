const express = require('express');
const auth = require('../Controllers/AuthController');

const router = express.Router();

router.post('/', auth.post_register);
router.put('/addfriend', auth.add_friend);
router.put('/deletefriend', auth.delete_friend);
router.get('/getusers', auth.get_users);

module.exports = router;