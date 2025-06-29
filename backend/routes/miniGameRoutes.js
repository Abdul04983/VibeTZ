const express = require('express');
const router = express.Router();
const minigameController = require('../controllers/minigameController');

router.post('/', minigameController.createGame);
router.post('/:id/join', minigameController.joinGame);
router.post('/:id/finish', minigameController.finishGame);
router.get('/', minigameController.getGames);

module.exports = router;
