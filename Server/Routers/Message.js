const express = require('express');
const message = require('../Controllers/MessageController');

const router = express.Router();

router.post('/', message.post_message);
router.delete('/:id', message.delete_message);

module.exports = router;