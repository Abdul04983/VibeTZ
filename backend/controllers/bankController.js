exports.pay = (req, res) => {
  const { amount, account, bank } = req.body;
  res.status(200).json({ message: `Bank transfer of ${amount} to account ${account} at ${bank} initiated successfully.` });
};
