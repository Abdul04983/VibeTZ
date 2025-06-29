exports.pay = (req, res) => {
  const { amount, phone } = req.body;
  res.status(200).json({ message: `Airtel Money payment of ${amount} to ${phone} initiated successfully.` });
};
