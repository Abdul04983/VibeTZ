const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/supportController');

router.post('/ticket', ctrl.submitTicket);
router.post('/delete-account', ctrl.deleteRequest);

module.exports = router;
