import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// OMDb
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = "http://www.omdbapi.com/";

const getOMDbRatings = async(imdbId) => {
    if (!imdbId) return null;
    try {
        const res = await axios.get(OMDB_BASE_URL, {
            params: { apikey: OMDB_API_KEY, i: imdbId }
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

// TRENDING MOVIES
export const getTrendingMovies = async() => {
    try {
        const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
            params: { api_key: API_KEY }
        });
        const movies = res.data.results;
        // Enrich with ratings
        const enriched = await Promise.all(movies.map(async(movie) => {
            const ratings = await getOMDbRatings(movie.imdb_id);
            return {...movie, ratings };
        }));
        return enriched;
    } catch (err) {
        console.error("TMDb trending error:", err);
        return [];
    }
};

// SEARCH MOVIES
export const searchMovies = async(query) => {
    try {
        const res = await axios.get(`${BASE_URL}/search/movie`, {
            params: { api_key: API_KEY, query }
        });
        const movies = res.data.results;
        // Enrich with ratings
        const enriched = await Promise.all(movies.map(async(movie) => {
            const ratings = await getOMDbRatings(movie.imdb_id);
            return {...movie, ratings };
        }));
        return enriched;
    } catch (err) {
        console.error("TMDb search error:", err);
        return [];
    }
};