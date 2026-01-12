import Event from "../models/Event.js";
import { searchMovies } from "../public/js/tmdb.js";

// Render all events
export const getEventsPage = async (req, res) => {
  try {
    const events = await Event.find().populate("host", "name");
    res.render("pages/events", { title: "My Events", events, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching events");
  }
};

// Show create event form
export const showCreateEventPage = (req, res) => {
  res.render("pages/createEvent", { title: "Create Event", user: req.user });
};

// Handle create event
export const createEvent = async (req, res) => {
  try {
    const { title, date, time, movieId, movieTitle, invites } = req.body;

    // Split invites into array if provided
    const inviteArray = invites ? invites.split(",").map(email => email.trim()) : [];

    await Event.create({
      title,
      date,
      time,
      movieId,
      movieTitle,
      invites: inviteArray,
      host: req.user.id,
    });

    res.json({ message: "Event created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
};
