exports.getMoodFeed = (req, res) => {
  res.status(200).json({ message: 'Get mood feed' });
};

exports.updateMood = (req, res) => {
  res.status(200).json({ message: 'Mood updated' });
};
