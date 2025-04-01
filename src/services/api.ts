import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5063/api", // Fallback to localhost if not defined
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;