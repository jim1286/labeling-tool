import axios from "axios";

const SERVER_PORT = import.meta.env.VITE_SEVER_PORT;

const axiosInstance = axios.create({
  baseURL: `http://localhost:${SERVER_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
