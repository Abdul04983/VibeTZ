exports.airtelPayment = (req, res) => {
  const { userId, phone, amount } = req.body;
  res.status(200).json({ success: true, message: 'Airtel payment received' });
};

exports.mpesaPayment = (req, res) => {
  const { userId, phone, amount } = req.body;
  res.status(200).json({ success: true, message: 'M-Pesa payment received' });
};

exports.tigoPayment = (req, res) => {
  const { userId, phone, amount } = req.body;
  res.status(200).json({ success: true, message: 'Tigo payment received' });
};
