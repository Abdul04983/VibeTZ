const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reportController');
router.post('/', ctrl.reportContent);
module.exports = router;
