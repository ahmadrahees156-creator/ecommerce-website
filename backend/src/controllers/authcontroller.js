const bcrypt = require("bcryptjs");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendOtpEmail } = require("../config/email");

const OTP_TTL_MINUTES = 5;

function createToken(user) {
  const secret = process.env.JWT_SECRET || "development-secret";

  return jwt.sign(
    { sub: user._id.toString() },
    secret,
    { expiresIn: "1d" }
  );
}

function safeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function generateOtp() {
  return randomInt(100000, 1000000).toString();
}

async function issueOtp(user) {
  const otp = generateOtp();
  user.otp = await bcrypt.hash(otp, 10);
  user.otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
  await user.save();
  await sendOtpEmail(user.email, otp);
}

async function sendOtp(req, res, next) {
  try {
    const { email, name, password } = req.body || {};

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof password !== "string" ||
        !password.trim() ||
        password.length < 8
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Name and password (minimum 8 characters) are required to create a new account",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      });
    }

    await issueOtp(user);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      requiresOtpVerification: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    next(error);
  }
}

async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body || {};

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof otp !== "string" ||
      !otp.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+otp +otpExpiresAt"
    );

    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (new Date() > new Date(user.otpExpiresAt)) {
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();

      return res.status(401).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const isValidOtp = await bcrypt.compare(otp.trim(), user.otp);

    if (!isValidOtp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).json({
      success: true,
      token: createToken(user),
      user: safeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body || {};

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail }).select(
      "+passwordHash"
    );
    const isExistingUser = Boolean(user);

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatches) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      }
    } else {
      const passwordHash = await bcrypt.hash(password, 12);
      user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      });
    }

    await issueOtp(user);

    res.status(isExistingUser ? 200 : 201).json({
      success: true,
      requiresOtpVerification: true,
      message: isExistingUser
        ? "A new OTP was sent. Verify it to continue."
        : "OTP sent successfully. Verify it to complete registration.",
      user: safeUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+passwordHash");

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      token: createToken(user),
      user: safeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

function getMe(req, res) {
  res.status(200).json({
    success: true,
    user: safeUser(req.user),
  });
}

module.exports = { register, login, getMe, sendOtp, verifyOtp };
