const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productImage: String,
  productBrand: String,
  productName: String,
  productCategory: String,
  productQuantity: Number,
  productMinQuantity: Number,
  productMaxQuantity: Number,
  productPrice: Number,
  productDescription: String,
  adminid: String,
});

const ProductModel = mongoose.model("ProductSchema", ProductSchema);
module.exports = ProductModel
