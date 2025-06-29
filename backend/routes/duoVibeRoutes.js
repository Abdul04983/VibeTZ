const express = require("express");
const router = express.Router();
const { createDuoVibe, getUserDuoVibes } = require("../controllers/duoVibeController");

router.post("/", createDuoVibe);
router.get("/:userId", getUserDuoVibes);

module.exports = router;
