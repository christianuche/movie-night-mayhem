import express from "express";
import { searchMovies } from "../public/js/tmdb.js";
import { requireAuth } from "../middleware/auth.js";
import * as eventController from "../controllers/eventController.js";

const router = express.Router();

// Get all events for logged-in user
router.get("/", requireAuth, eventController.getEventsPage);

// Create event form (GET)
router.get("/create", requireAuth, eventController.showCreateEventPage);

// Create event (POST)
router.post("/create", requireAuth, eventController.createEvent);

// API endpoint for movie search in modal
router.get("/search-movie", async (req, res) => {
  const q = req.query.q;
  const results = await searchMovies(q);
  res.json(results);
});

export default router;
