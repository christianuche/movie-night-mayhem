import express from "express";
import { searchMovies } from "../public/js/tmdb.js";
import { requireAuth } from "../middleware/auth.js";
import * as eventController from "../controllers/eventController.js";

const router = express.Router();

// Get all events for logged-in user
router.get("/", requireAuth, eventController.getEventsPage);

// Create event form (GET)
router.get("/create", requireAuth, eventController.showCreateEventPage);

// API endpoint for movie search in modal (must come before /:id routes)
router.get("/search-movie", async (req, res) => {
  const q = req.query.q;
  const results = await searchMovies(q);
  res.json(results);
});

// Create event (POST)
router.post("/create", requireAuth, eventController.createEvent);

// View event details (GET)
router.get("/:id", requireAuth, eventController.viewEvent);

// RSVP to event (POST)
router.post("/:id/rsvp", requireAuth, eventController.rsvpEvent);

// Update event (PUT)
router.put("/:id", requireAuth, eventController.updateEvent);

// Delete event (DELETE)
router.delete("/:id", requireAuth, eventController.deleteEvent);

export default router;
