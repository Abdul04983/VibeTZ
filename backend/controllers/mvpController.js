exports.getStatus = (req, res) => {
  res.status(200).json({ status: 'MVP backend active' });
};
