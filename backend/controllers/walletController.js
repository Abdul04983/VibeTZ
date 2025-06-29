const wallets = {};

exports.fundWallet = (req, res) => {
  const { userId, amount } = req.body;
  if (!wallets[userId]) wallets[userId] = 0;
  wallets[userId] += amount;
  res.status(200).json({ success: true, balance: wallets[userId] });
};

exports.transferFunds = (req, res) => {
  const { fromUser, toUser, amount } = req.body;
  if ((wallets[fromUser] || 0) < amount) {
    return res.status(400).json({ success: false, message: 'Insufficient funds' });
  }
  wallets[fromUser] -= amount;
  if (!wallets[toUser]) wallets[toUser] = 0;
  wallets[toUser] += amount;
  res.status(200).json({ success: true, message: 'Transfer complete' });
};

exports.getWalletBalance = (req, res) => {
  const userId = req.params.userId;
  const balance = wallets[userId] || 0;
  res.status(200).json({ success: true, balance });
};
