import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  date: Date,
  time: String,
  movieId: String,          // TMDb movie ID
  movieTitle: String,       // Movie title for display
  invites: [String],        // Array of invited emails
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who RSVP'd
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
