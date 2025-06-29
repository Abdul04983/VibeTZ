const MiniGame = require('../models/MiniGame');

exports.createGame = async (req, res) => {
  try {
    const game = new MiniGame({ name: req.body.name, players: [req.body.creatorId] });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create game' });
  }
};

exports.joinGame = async (req, res) => {
  try {
    const game = await MiniGame.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    if (game.players.length >= 2) return res.status(400).json({ error: 'Game is full' });
    game.players.push(req.body.playerId);
    game.status = 'ongoing';
    await game.save();
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to join game' });
  }
};

exports.finishGame = async (req, res) => {
  try {
    const game = await MiniGame.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    game.status = 'finished';
    game.result = req.body.result;
    await game.save();
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to finish game' });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await MiniGame.find().populate('players', 'username');
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};
