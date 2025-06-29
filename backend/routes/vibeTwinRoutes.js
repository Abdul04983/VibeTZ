const express = require("express");
const router = express.Router();
const { generateTwinReply } = require("../controllers/vibeTwinController");

router.post("/reply", generateTwinReply);

module.exports = router;
