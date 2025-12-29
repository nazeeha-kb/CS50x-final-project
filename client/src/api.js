import axios from "axios";

const api = axios.create({
  baseURL: "/api", //because we've set proxy base is just /api
});

export default api;
