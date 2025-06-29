const express = require('express');
const router = express.Router();
const { getUserChats, sendMessage } = require('../controllers/chatController');

router.get('/:userId', getUserChats);
router.post('/send', sendMessage);

module.exports = router;
