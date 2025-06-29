exports.generateCaption = (req, res) => {
  const { imageUrl } = req.body;
  res.send(\Generated caption for: \\);
};
