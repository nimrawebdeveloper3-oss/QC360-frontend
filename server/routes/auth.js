import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Helper to create token and user safe payload
function createAuthResponse(user) {
  const payload = { id: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "devsecret", {
    expiresIn: "1h",
  });

  const safeUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return { accessToken: token, user: safeUser };
}

// Register a new user (POST /api/auth/register and /api/auth/sign-up)
async function handleRegister(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashed,
      role: role || undefined,
    });

    await newUser.save();

    const authResp = createAuthResponse(newUser);
    res.status(201).json(authResp);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
}

// Login a user (POST /api/auth/login and /api/auth/sign-in)
async function handleLogin(req, res) {
  try {
    const { email, emailOrUsername, username, password } = req.body;

    // Accept either email, emailOrUsername, or username
    const query = {};
    if (email) query.email = email;
    else if (emailOrUsername)
      query.$or = [{ email: emailOrUsername }, { username: emailOrUsername }];
    else if (username) query.username = username;
    else
      return res
        .status(400)
        .json({
          message: "email/emailOrUsername/username and password are required",
        });

    const user = await User.findOne(query);

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const authResp = createAuthResponse(user);
    res.status(200).json(authResp);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}

router.post("/register", handleRegister);
router.post("/sign-up", handleRegister);

router.post("/login", handleLogin);
router.post("/sign-in", handleLogin);

export default router;
