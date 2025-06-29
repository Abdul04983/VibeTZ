exports.watchAd = (req, res) => {
  res.send('User watched ad and earned points');
};
exports.referFriend = (req, res) => {
  const { referredUser } = req.body;
  res.send(\User referred \ and earned bonus\);
};
exports.boostContent = (req, res) => {
  res.send('User boosted content with points');
};
