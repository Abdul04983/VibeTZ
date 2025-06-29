const express = require('express');
const router = express.Router();
const controller = require('../controllers/viewTrackingController');

router.post('/log', controller.logView);
router.get('/earnings/:userId', controller.getViewerEarnings);

module.exports = router;
