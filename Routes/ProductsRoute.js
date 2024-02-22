// routes/upload.js
const express = require("express");
const ProductModel = require("../models/ProductModel.js");
const UserModel = require("../models/UserModel.js");
const router = express.Router();

router.post("/:UserId", async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const admin = await UserModel.findOne({email: UserId})  
    const {
      productImage,
      productBrand,
      productName,
      productCategory,
      productQuantity,
      productMinQuantity,
      productMaxQuantity,
      productPrice,
      productDescription,
    } = req.body;
    // Save the file details and product details to MongoDB
    const newProductModel = new ProductModel({
      productImage,
      productBrand,
      productName,
      productCategory,
      productQuantity,
      productMinQuantity,
      productMaxQuantity,
      productPrice,
      productDescription,
      adminid: admin.adminid,
    });
    await newProductModel.save();
    res
      .status(201)
      .json({ message: "File and product details uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getproducts/:UserId", async (req,res) => {
  try {
      const UserId = req.params.UserId;
      const admin = await UserModel.findOne({email: UserId});
      const adminid = admin.adminid;
      const products = await ProductModel.find({adminid: adminid});
      res.json(products);
  }catch (error){
      res.send(error)
  }

})

router.get("/getproductsinfo/:id", async (req,res) => {
  try {
    const id = req.params.id;
    const getProduct = await ProductModel.findById({_id: id})
    res.json(getProduct);
  }catch (error) {
    res.json(error)
  }
})

router.put("/updateproducts/:id", async (req,res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await ProductModel.findByIdAndUpdate({_id: id}, {productImage: req.body.productImage, productBrand: req.body.productBrand, productName: req.body.productName, productCategory: req.body.productCategory, productQuantity: req.body.productQuantity, productMinQuantity: req.body.productMinQuantity, productMaxQuantity: req.body.productMaxQuantity, productPrice: req.body.productPrice, productDescription: req.body.productDescription})
    res.json(updatedProduct);

  }catch (error) {
    res.json(error)
  }
})
router.delete("/deleteproduct/:id", async (req,res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await ProductModel.findByIdAndDelete({_id: id});
    res.json(deleteProduct);
  } catch (error){
    res.json(error);
  }
})


module.exports = router;
