const express = require('express');
const router = express.Router();
const vibeVerseController = require('../controllers/vibeVerseController');
router.get('/rooms', vibeVerseController.getRooms);
router.post('/join', vibeVerseController.joinRoom);
module.exports = router;
