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
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await api.post("/auth/refresh-token", { refreshToken });
                const { accessToken } = response.data;

                // Update the access token in localStorage
                localStorage.setItem("accessToken", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (err) {     
                console.error("Failed to refresh access token:", err);
                throw err;
            }
        }

        return Promise.reject(error);
    }
);

export default api;