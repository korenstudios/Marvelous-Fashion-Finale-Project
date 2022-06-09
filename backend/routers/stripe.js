const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Stripe = require("../models/stripe");
const { User } = require("../models/users");
const inStock = require("../controllers/inStockManager");
const sold = require("../controllers/soldManager");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", auth, authAdmin, async (req, res) => {
  const payments = await Stripe.find();

  res.json(payments);
});

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("name email cart");

  if (!user) {
    res.status(400).send("User does not exist.");
    return;
  }

  const stripePayment = await stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "USD",
  });

  const payment = new Stripe({
    user_id: user._id,
    name: user.name,
    email: user.email,
    cart: user.cart,
    paymentID: stripePayment.id,
    address: {
      ...stripePayment.billing_details.address,
      recipient_name: stripePayment.billing_details.name,
    },
  });

  user.cart.filter((item) => {
    return inStock(item._id, item.quantity, item.in_stock);
  });

  user.cart.filter((item) => {
    return sold(item._id, item.quantity, item.sold);
  });

  await payment.save();

  res.json(payment);
});

module.exports = router;
