import axios from "axios";

// Set up axios instance
const api = axios.create({
  baseURL: "/api", //because we've set proxy base is just /api
});

export default api;
