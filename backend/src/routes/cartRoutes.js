const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getCart, addToCart, removeFromCart, updateCartItem  } = require("../controllers/cartController");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/items/:productId", protect, removeFromCart);
router.patch("/items/:productId", protect, updateCartItem);   
module.exports = router;