const ArenaGame = require('../models/ArenaGame');

exports.getGames = async (req, res) => {
  try {
    const games = await ArenaGame.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch arena games' });
  }
};

exports.joinGame = async (req, res) => {
  try {
    const { gameId, userId } = req.body;
    if (!gameId || !userId) return res.status(400).json({ error: 'Missing data' });

    const game = await ArenaGame.findById(gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    game.players.push(userId);
    await game.save();

    res.status(200).json({ message: 'Joined game successfully', game });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join game' });
  }
};
