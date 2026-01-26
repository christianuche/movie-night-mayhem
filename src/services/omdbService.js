import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

// Fetch movie ratings by IMDb ID
export const getMovieRatings = async (imdbId) => {
  if (!imdbId) return null;
  try {
    const res = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, i: imdbId }
    });
    if (res.data.Response === "True") {
      return {
        imdbRating: res.data.imdbRating,
        rottenTomatoes: res.data.Ratings.find(r => r.Source === "Rotten Tomatoes")?.Value || null,
        metacritic: res.data.Metacritic || null
      };
    }
    return null;
  } catch (err) {
    console.error("OMDb error:", err);
    return null;
  }
};