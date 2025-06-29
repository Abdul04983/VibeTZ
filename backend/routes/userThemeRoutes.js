const express = require('express');
const router = express.Router();
const { getUserTheme, updateUserTheme } = require('../controllers/userThemeController');

router.get('/:userId', getUserTheme);
router.put('/update', updateUserTheme);

module.exports = router;
