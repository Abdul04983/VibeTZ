const express = require('express');
const router = express.Router();
const aiTwinController = require('../controllers/aiTwinController');
const verifyToken = require('../middleware/verifyToken');

router.post('/chat', verifyToken, aiTwinController.chatWithAiTwin);

module.exports = router;

