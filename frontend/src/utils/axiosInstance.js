import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.userMessage =
        "Request timed out. NASA API may be slow — please try again.";
      return Promise.reject(error);
    }
    if (!error.response) {
      error.userMessage = "No internet connection. Please check your network.";
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const messages = {
      400: "Invalid request. Please check your inputs.",
      404: "Data not found.",
      429: "Too many requests. Please wait a moment.",
      500: "NASA API is currently unavailable. Please try again later.",
      503: "Service unavailable. Please try again later.",
    };

    error.userMessage =
      messages[status] || "Something went wrong. Please try again.";
    return Promise.reject(error);
  },
);

export default axiosInstance;
