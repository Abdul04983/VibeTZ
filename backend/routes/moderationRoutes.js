const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
router.post('/scan', moderationController.scanContent);
module.exports = router;
