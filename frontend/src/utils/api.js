import axios from "axios";

// 🔥 hardcode temporarily to eliminate env issues
const api = axios.create({
  baseURL: "https://snack-view-backend.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;