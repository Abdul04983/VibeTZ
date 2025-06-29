const express = require('express');
const router = express.Router();
const aiVibeTwinController = require('../controllers/aiVibeTwinController');
// Add other controllers similarly

router.get('/:userId', aiVibeTwinController.getAiVibeTwin);
// Add other routes similarly

module.exports = router;
