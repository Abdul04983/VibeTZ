exports.getChallenges = (req, res) => {
  res.status(200).json({ message: 'Get all vibe challenges' });
};

exports.createChallenge = (req, res) => {
  res.status(201).json({ message: 'Vibe challenge created' });
};
