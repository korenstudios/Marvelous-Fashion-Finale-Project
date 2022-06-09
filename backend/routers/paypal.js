const express = require("express");
const router = express.Router();
const Paypal = require("../models/paypal");
const { User } = require("../models/users");
const inStock = require("../controllers/inStockManager");
const sold = require("../controllers/soldManager");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", auth, authAdmin, async (req, res) => {
  const payments = await Paypal.find();

  res.json(payments);
});

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("name email");

  if (!user) {
    res.status(400).send("User does not exist.");
    return;
  }

  const payment = new Paypal({
    user_id: user._id,
    name: user.name,
    email: user.email,
    cart: req.body.cart,
    paymentID: req.body.paymentID,
    address: req.body.address,
  });

  req.body.cart.filter((item) => {
    return inStock(item._id, item.quantity, item.in_stock);
  });

  req.body.cart.filter((item) => {
    return sold(item._id, item.quantity, item.sold);
  });

  await payment.save();

  res.json(payment);
});

module.exports = router;
