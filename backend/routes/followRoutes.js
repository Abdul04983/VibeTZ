const express = require('express');
const router = express.Router();
const { followUser, unfollowUser } = require('../controllers/followController');
const verifyToken = require('../middleware/verifyToken');

router.put('/follow/:id', verifyToken, followUser);
router.put('/unfollow/:id', verifyToken, unfollowUser);

module.exports = router;
