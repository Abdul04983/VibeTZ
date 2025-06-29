exports.submitTicket = (req, res) => {
  const { userId, message } = req.body;
  res.send(\Support ticket submitted by \: \\);
};
exports.deleteRequest = (req, res) => {
  res.send('User requested data deletion');
};
