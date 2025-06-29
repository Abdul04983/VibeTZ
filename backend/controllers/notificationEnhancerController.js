exports.sendNotification = (req, res) => {
  const { to, message } = req.body;
  res.json({ status: 'sent', to, message });
};
