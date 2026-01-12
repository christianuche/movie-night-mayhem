import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Generate JWT
function createToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// GET SIGNUP PAGE
router.get("/signup", (req, res) => {
  res.render("pages/signup", { title: "Sign Up" });
});

// GET LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login" });
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("/");

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("/");

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// PROFILE
router.get("/profile", requireAuth, (req, res) => {
  res.render("pages/profile", { 
    title: "My Profile", 
    user: req.user 
  });
});

export default router;
