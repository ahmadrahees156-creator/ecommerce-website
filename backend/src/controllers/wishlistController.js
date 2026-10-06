const mongoose = require("mongoose");
const Product = require("../models/product");
const Wishlist = require("../models/wishlist");

async function getWishlist(req, res, next) {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    next(error);
  }
}

async function addToWishlist(req, res, next) {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { products: productId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate("products");

    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    next(error);
  }
}

async function removeFromWishlist(req, res, next) {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    next(error);
  }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
