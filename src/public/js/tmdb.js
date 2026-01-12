import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// TRENDING MOVIES
export const getTrendingMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY }
    });
    return res.data.results;
  } catch (err) {
    console.error("TMDb trending error:", err);
    return [];
  }
};

// SEARCH MOVIES
export const searchMovies = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query }
    });
    return res.data.results;
  } catch (err) {
    console.error("TMDb search error:", err);
    return [];
  }
};
