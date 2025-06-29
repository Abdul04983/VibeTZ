const games = {}; // In-memory storage for demo

function generateUniqueGameId() {
  return Math.random().toString(36).substr(2, 9);
}

const startGame = (req, res) => {
  const gameId = generateUniqueGameId();
  const { players } = req.body; // expect array of player IDs

  games[gameId] = {
    players,
    status: "active",
    moves: [],
    score: {},
  };

  res.status(200).json({ message: "Game started", gameId });
};

const recordMove = (req, res) => {
  const { gameId, playerId, move } = req.body;

  if (!games[gameId]) {
    return res.status(404).json({ error: "Game not found" });
  }
  if (games[gameId].status !== "active") {
    return res.status(400).json({ error: "Game not active" });
  }

  // Record move
  games[gameId].moves.push({ playerId, move, timestamp: new Date() });

  // Example: update score (dummy logic)
  if (!games[gameId].score[playerId]) {
    games[gameId].score[playerId] = 0;
  }
  games[gameId].score[playerId] += 1;

  res.status(200).json({ message: "Move recorded", currentScore: games[gameId].score });
};

const endGame = (req, res) => {
  const { gameId } = req.body;

  if (!games[gameId]) {
    return res.status(404).json({ error: "Game not found" });
  }

  games[gameId].status = "ended";

  res.status(200).json({ message: "Game ended", results: games[gameId] });
};

module.exports = {
  startGame,
  recordMove,
  endGame,
};
