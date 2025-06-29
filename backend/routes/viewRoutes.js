const express = require('express');
const { viewPost } = require('../controllers/viewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:postId', protect, viewPost);

module.exports = router;
