const express = require('express');
const router = express.Router();

const matches = {};

router.post('/create', (req, res) => {
  const { matchId, players } = req.body;
  if (matches[matchId]) return res.status(400).json({ message: 'Match already exists' });

  matches[matchId] = { players, result: null, status: 'ongoing' };
  res.json({ message: 'Match created', matchId });
});

router.post('/result', (req, res) => {
  const { matchId, result } = req.body;
  if (!matches[matchId]) return res.status(404).json({ message: 'Match not found' });

  matches[matchId].result = result;
  matches[matchId].status = 'finished';
  res.json({ message: 'Result saved' });
});

router.get('/:matchId', (req, res) => {
  const match = matches[req.params.matchId];
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

module.exports = router;
