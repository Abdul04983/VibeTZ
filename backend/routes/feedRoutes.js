const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
router.get('/smart', feedController.getSmartFeed);
module.exports = router;
