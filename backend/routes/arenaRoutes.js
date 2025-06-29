const express = require('express');
const router = express.Router();
const arenaController = require('../controllers/arenaController');
router.get('/games', arenaController.listGames);
router.get('/enter/:gameId', arenaController.enterGame);
module.exports = router;
