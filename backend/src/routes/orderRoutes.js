const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, cancelOrder, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.patch("/:id/cancel", protect, cancelOrder);
router.patch("/:id/status", protect, requireAdmin, updateOrderStatus);
router.get("/:id", protect, getOrderById);
module.exports = router;
