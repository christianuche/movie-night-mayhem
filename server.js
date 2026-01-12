import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/database/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import homeRoutes from "./src/routes/homeRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

const app = express();
const __dirname = path.resolve();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ STATIC FILES MUST COME BEFORE ROUTES
app.use(express.static(path.join(__dirname, "src", "public")));

// View engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Routes — after static files
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/events", eventRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
