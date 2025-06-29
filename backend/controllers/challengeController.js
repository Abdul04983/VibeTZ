exports.getChallenges = (req, res) => {
  res.json([{ id: 1, type: 'caption', status: 'open' }]);
};
