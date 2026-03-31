import axios from "axios";

const axiosInstance = axios.create({
  baseURL: " https://dynamic-portfolio-backend-gbv9.onrender.com"
});

// Attach the token automatically for all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ensure token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
