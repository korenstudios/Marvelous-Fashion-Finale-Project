const express = require("express");
const router = express.Router();
const { validateUser, User } = require("../models/users");
const Paypal = require("../models/paypal");
const Stripe = require("../models/stripe");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  // Validate user's input
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  if (req.body.password !== req.body.confirm_password) {
    res.status(400).send("Password is not match.");
    return;
  }

  // Validate system
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).send("User already exists.");
    return;
  }

  // Process
  user = new User(req.body);

  // Password Encryption
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Save to mongodb
  await user.save();

  // Response
  res.send(_.pick(user, ["name", "phone", "email", "isAdmin", "_id"]));
});

router.get("/info", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(400).send("User does not exist.");
    return;
  }

  res.json(user);
});

router.get("/", auth, authAdmin, async (req, res) => {
  const users = await User.find().select("-password");

  res.json(users);
});

router.get("/history/paypal", auth, async (req, res) => {
  const history = await Paypal.find({ user_id: req.user._id });

  res.json(history);
});

router.get("/history/stripe", auth, async (req, res) => {
  const history = await Stripe.find({ user_id: req.user._id });

  res.json(history);
});

router.put("/profile/:id", auth, async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  if (req.body.password !== req.body.confirm_password) {
    res.status(400).send("Password is not match.");
    return;
  }

  const existUser = await User.findOne({ email: req.body.email });

  if (existUser) {
    res.status(400).send("User already exists.");
    return;
  }

  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);

  if (!user) {
    res.status(400).send("User does not exist.");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  user = await User.findOne({ _id: req.params.id });

  res.json(_.pick(user, ["name", "phone", "email", "isAdmin", "_id"]));
});

router.patch("/status/:id", auth, authAdmin, async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }

  user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { isAdmin: req.body.isAdmin }
  );

  user = await User.findById(req.params.id);

  res.json(_.pick(user, ["name", "phone", "email", "isAdmin", "_id"]));
});

router.delete("/:id", auth, authAdmin, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404).send("The user with the given ID was not found.");
    return;
  }

  res.json(_.pick(user, ["name", "phone", "email", "isAdmin", "_id"]));
});

module.exports = router;
