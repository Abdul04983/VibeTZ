const express = require("express");
const router = express.Router();

const { startGame, recordMove, endGame } = require("../controllers/miniGamesController");

router.post("/start", startGame);
router.post("/move", recordMove);
router.post("/end", endGame);

module.exports = router;
