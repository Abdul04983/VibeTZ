const express = require('express');
const router = express.Router();
const enhancedNotificationController = require('../controllers/enhancedNotificationController');

router.get('/', enhancedNotificationController.getNotifications);
router.post('/mark-read', enhancedNotificationController.markAsRead);

module.exports = router;
