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
  const error = req.query.error || null;
  res.render("pages/signup", { title: "Sign Up", error });
});

// GET LOGIN PAGE
router.get("/login", (req, res) => {
  const error = req.query.error || null;
  res.render("pages/login", { title: "Login", error });
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.redirect(`/signup?error=${encodeURIComponent("All fields are required")}`);
    }
    if (password.length < 6) {
      return res.redirect(`/signup?error=${encodeURIComponent("Password must be at least 6 characters")}`);
    }
    let existing = await User.findOne({ email });
    if (existing) {
      return res.redirect(`/signup?error=${encodeURIComponent("Email already exists")}`);
    }
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
    res.redirect(`/signup?error=${encodeURIComponent("An error occurred. Please try again.")}`);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.redirect(`/login?error=${encodeURIComponent("Email and password are required")}`);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect(`/login?error=${encodeURIComponent("Invalid email or password")}`);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.redirect(`/login?error=${encodeURIComponent("Invalid email or password")}`);
    }
    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/");
  } catch (err) {
    res.redirect(`/login?error=${encodeURIComponent("An error occurred. Please try again.")}`);
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
