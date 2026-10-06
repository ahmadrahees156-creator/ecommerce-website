const mongoose = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/review");

async function getProductReviews(req, res, next) {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
}

async function addProductReview(req, res, next) {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    if (typeof comment !== "string" || !comment.trim() || comment.trim().length > 500) {
      return res.status(400).json({ success: false, message: "Comment must be 1 to 500 characters" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const existingReview = await Review.findOne({ product: productId, user: req.user._id });
    if (existingReview) {
      return res.status(409).json({ success: false, message: "You already reviewed this product" });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment: comment.trim(),
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "You already reviewed this product" });
    }
    next(error);
  }
}

module.exports = { getProductReviews, addProductReview };
