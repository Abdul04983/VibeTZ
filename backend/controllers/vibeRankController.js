exports.getUserRank = (req, res) => {
  const points = 1500; // example
  const rank = points >= 1000 ? 'Vibe Master' : 'Viber';
  res.send({ points, rank });
};
