const express = require('express');
const auth = require('../Controllers/AuthController');

const router = express.Router();

router.post('/', auth.post_register);
router.put('/:id', auth.update_acc);
router.put('/updateimg', auth.update_image);
router.put('/addfriend', auth.add_friend);
router.put('/deletefriend', auth.delete_friend);
router.get('/getusers', auth.get_users);

module.exports = router;