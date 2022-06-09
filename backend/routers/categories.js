const express = require("express");
const Category = require("../models/categories");
const Product = require("../models/products");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
});

router.post("/", auth, authAdmin, async (req, res) => {
  // if user have isAdmin = true --> Admin
  // Only admin can create, update and delete categories

  let category = await Category.findOne({ name: req.body.name });

  if (category) {
    res.status(400).send("The category already exists.");
    return;
  }

  category = new Category(req.body);

  await category.save();

  res.json(category);
});

router.put("/:id", auth, authAdmin, async (req, res) => {
  let category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );

  if (!category) {
    res.status(404).send("The category with the given ID was not found.");
  }

  category = await Category.findOne({ _id: req.params.id });

  res.json(category);
});

router.delete("/:id", auth, authAdmin, async (req, res) => {
  const product = await Product.findOne({ category: req.params.id });

  if (product) {
    res.status(400).send("Please delete all products related to the category.");
    return;
  }

  const category = await Category.findByIdAndDelete({ _id: req.params.id });

  if (!category) {
    res.status(404).send("The category with the given ID was not found.");
    return;
  }

  res.json(category);
});

module.exports = router;
