exports.setTheme = (req, res) => {
  res.send('Theme Set');
};
exports.getTheme = (req, res) => {
  res.send('Theme for User ' + req.params.userId);
};
