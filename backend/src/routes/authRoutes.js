const express = require("express");
const {
  register,
  login,
  getMe,
  sendOtp,
  verifyOtp,
} = require("../controllers/authcontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/signup", register);
router.post("/sign-up", register);
router.post("/login", login);
router.post("/signin", login);
router.post("/sign-in", login);
router.post("/send-otp", sendOtp);
router.post("/sendOtp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/verifyOtp", verifyOtp);
router.get("/me", protect, getMe);

module.exports = router;
