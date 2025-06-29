exports.pay = (req, res) => {
  const { amount, phone } = req.body;
  res.status(200).json({ message: `M-Pesa payment of ${amount} to ${phone} initiated successfully.` });
};
