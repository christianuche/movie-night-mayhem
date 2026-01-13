import Event from "../models/Event.js";
import User from "../models/User.js";
import { searchMovies } from "../public/js/tmdb.js";
import { sendInvitationEmail } from "../services/emailService.js";

// Render all events for logged-in user
export const getEventsPage = async (req, res) => {
  try {
    // Show only events created by the current user
    const events = await Event.find({ host: req.user.id })
      .populate("host", "name email")
      .populate("attendees", "name email")
      .sort({ date: 1 });
    
    res.render("pages/events", { 
      title: "My Events", 
      events, 
      user: req.user 
    });
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

    const event = await Event.create({
      title,
      date,
      time,
      movieId,
      movieTitle,
      invites: inviteArray,
      host: req.user.id,
    });

    // Send invitation emails
    if (inviteArray.length > 0) {
      const host = await User.findById(req.user.id);
      inviteArray.forEach(email => {
        sendInvitationEmail(email, title, date, time, movieTitle, host.name).catch(err => {
          console.error(`Failed to send email to ${email}:`, err);
        });
      });
    }

    res.json({ message: "Event created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
};

// View event details and handle RSVP
export const viewEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("host", "name email")
      .populate("attendees", "name email");
    
    if (!event) {
      return res.status(404).send("Event not found");
    }

    console.log("🔍 Event Host ID:", event.host._id);
    console.log("👤 Current User ID:", req.user.id);
    console.log("✅ Is Host?", event.host._id.toString() === req.user.id);

    res.render("pages/eventDetail", { 
      title: event.title, 
      event, 
      user: req.user 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching event");
  }
};

// Handle RSVP to event
export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Initialize attendees array if it doesn't exist
    if (!event.attendees) {
      event.attendees = [];
    }

    // Check if user already RSVPed
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already RSVP'd" });
    }

    // Add user to attendees
    event.attendees.push(req.user.id);
    await event.save();

    res.json({ message: "RSVP successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error RSVPing to event", error: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is the host
    if (event.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the host can delete this event" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting event", error: err.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { title, date, time, movieId, movieTitle, invites } = req.body;
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is the host
    if (event.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the host can update this event" });
    }

    // Update event fields
    event.title = title || event.title;
    event.date = date || event.date;
    event.time = time || event.time;
    event.movieId = movieId || event.movieId;
    event.movieTitle = movieTitle || event.movieTitle;
    
    if (invites) {
      event.invites = invites.split(",").map(email => email.trim());
    }

    await event.save();
    res.json({ message: "Event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
};
