const express = require('express');
const group = require('../Controllers/GroupController');

const router = express.Router();

router.post('/', group.create_group);
router.put('/:id/add', group.add_members);
router.delete('/:id/delete', group.delete_group);

module.exports = router;