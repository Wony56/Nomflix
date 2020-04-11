import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

const parameters = {
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US"
  }
};

export const tvApi = {
         topRated: () => api.get("tv/top_rated", parameters),
         popular: () => api.get("tv/popular", parameters),
         airingToday: () => api.get("tv/airing_today", parameters),
         showDetail: id =>
           api.get(`tv/${id}`, {
             params: {
               ...parameters["params"],
               append_to_response: "videos"
             }
           }),
         search: term =>
           api.get("search/tv", {
             params: {
               ...parameters["params"],
               query: encodeURIComponent(term)
             }
           })
       };

export const moviesApi = {
         nowPlaying: () => api.get("movie/now_playing", parameters),
         upcoming: () => api.get("movie/upcoming", parameters),
         popular: () => api.get("movie/popular", parameters),
         movieDetail: id =>
           api.get(`movie/${id}`, {
             params: {
               ...parameters["params"],
               append_to_response: "videos"
             }
           }),
         search: term =>
           api.get("search/movie", {
             params: {
               ...parameters["params"],
               query: encodeURIComponent(term)
             }
           })
       };