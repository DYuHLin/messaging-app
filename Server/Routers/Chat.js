const express = require('express');
const chat = require('../Controllers/ChatController');

const router = express.Router();

router.post('/', chat.post_chat);
router.put('/:id', chat.delete_chat);

module.exports = router;