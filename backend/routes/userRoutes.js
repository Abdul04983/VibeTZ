const express = require('express');
const router = express.Router();
const { getMyProfile, getUserProfile, editUser, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.get('/me', verifyToken, getMyProfile);
router.get('/profile/:id', verifyToken, getUserProfile);
router.put('/:id', verifyToken, editUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;
