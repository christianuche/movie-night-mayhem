import express from "express";
import Event from "../models/Event.js";
import { getTrendingMovies, searchMovies } from "../public/js/tmdb.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const trending = await getTrendingMovies();

    // Get only *future* events sorted by date
    const events = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(5);
      
    res.render("pages/home", {
      title: "Movie Night Mayhem - Home",
      trending,
      events,
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.render("pages/home", {
      title: "Movie Night Mayhem - Home",
      trending: [],
      events: [],
      user: req.user
    });
  }
});

// Search movies
router.get("/search", async (req, res) => {
  const query = req.query.q || "";
  const results = query ? await searchMovies(query) : [];

  res.render("pages/search", {
    title: "Search Results",
    results,
    query
  });
});

export default router;
