const express = require('express');
const router = express.Router();

const games = [
  { id: "pool", name: "Pool" },
  { id: "checkers", name: "Checkers" },
  { id: "cards", name: "Cards" },
  { id: "ticTacToe", name: "Tic Tac Toe" }
];

router.get('/games', (req, res) => {
  res.json(games);
});

module.exports = router;
