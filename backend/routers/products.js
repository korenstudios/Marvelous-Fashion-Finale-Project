const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const ProductsManager = require("../controllers/productsManager");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", async (req, res) => {
  const features = new ProductsManager(Product.find(), req.query)
    .filtering()
    .sorting()
    .paginating();

  const products = await features.query;

  res.json(products);
});

router.post("/", auth, authAdmin, async (req, res) => {
  let product = await Product.findOne({ product_id: req.body.product_id });

  if (product) {
    res.status(400).send("The product already exists.");
    return;
  }

  product = new Product({ ...req.body, title: req.body.title.toLowerCase() });

  await product.save();

  res.json(product);
});

router.put("/:id", auth, authAdmin, async (req, res) => {
  let product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );

  if (!product) {
    res.status(404).send("The product with the given ID was not found.");
    return;
  }

  product = await Product.findOne({ _id: req.params.id });

  res.json(product);
});

router.delete("/:id", auth, authAdmin, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404).send("The product with the given ID was not found.");
    return;
  }

  res.json(product);
});

module.exports = router;
