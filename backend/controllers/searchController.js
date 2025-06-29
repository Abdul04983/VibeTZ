const User = require("../models/User");

exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q;
    const users = await User.find({
      username: { $regex: query, $options: "i" }
    }).select("username profilePicture _id");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};
