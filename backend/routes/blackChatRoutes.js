const express = require("express");
const router = express.Router();
const { sendBlackChatMessage, getBlackChatMessages } = require("../controllers/blackChatController");

router.post("/", sendBlackChatMessage);
router.get("/:roomId", getBlackChatMessages);

module.exports = router;
