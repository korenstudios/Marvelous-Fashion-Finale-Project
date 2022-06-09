const express = require("express");
const auth = require("../middleware/auth");
const { User } = require("../models/users");
const router = express.Router();

router.patch("/", auth, async (req, res) => {
  let user = await User.findById(req.user._id);

  if (!user) {
    res.status(400).send("User does not exist.");
    return;
  }

  user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      cart: req.body.cart,
    }
  );

  res.json(user);
});

module.exports = router;
