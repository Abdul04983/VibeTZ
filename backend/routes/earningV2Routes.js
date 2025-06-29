const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/earningV2Controller');

router.post('/ad', ctrl.watchAd);
router.post('/refer', ctrl.referFriend);
router.post('/boost', ctrl.boostContent);

module.exports = router;
