const express = require('express');
const auth = require('../Controllers/AuthController');

const router = express.Router();

router.post('/', auth.post_register);
router.put('/addfriend', auth.add_friend);
router.put('/deletefriend', auth.delete_friend);
router.get('/:id', auth.get_friends);
router.get('/users', auth.get_users);

module.exports = router;