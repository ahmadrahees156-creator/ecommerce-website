const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, cancelOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.patch("/:id/cancel", protect, cancelOrder);
router.get("/:id", protect, getOrderById);
module.exports = router;
