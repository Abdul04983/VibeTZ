const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');
router.post('/set', themeController.setTheme);
router.get('/:userId', themeController.getTheme);
module.exports = router;
