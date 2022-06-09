const { User } = require("../models/users");

const authAdmin = async (req, res, next) => {
  // Get user inforamtion by id
  const user = await User.findOne({
    _id: req.user._id,
  });

  if (user.isAdmin === false) {
    res.status(403).send("Admin resources access denied.");
    return;
  }

  next();
};

module.exports = authAdmin;
