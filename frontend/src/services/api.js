import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.125.208:5000", // your Flask backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
