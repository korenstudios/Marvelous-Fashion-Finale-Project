const Product = require("../models/products");

const inStock = async (id, quantity, stock) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      in_stock: stock - quantity,
    }
  );
};

module.exports = inStock;
