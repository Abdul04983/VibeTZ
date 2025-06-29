exports.pay = (req, res) => {
  const { amount, email } = req.body;
  res.status(200).json({ message: `PayPal payment of ${amount} to ${email} initiated successfully.` });
};
