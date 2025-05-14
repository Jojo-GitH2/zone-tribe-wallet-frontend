import api from "./api";

export interface RegisterRequestDTO {
    email: string;
    password: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export const register = async (data: RegisterRequestDTO) => {
    const response = await api.post("/auth/register", data); // Use the `api` instance
    return response.data;
};

export const login = async (data: LoginRequestDTO) => {
    const response = await api.post("/auth/login", data); // Use the `api` instance
    const { accessToken, refreshToken } = response.data;

    // Save the token to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
};

export const getToken = () => {
    return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

    try {
        const response = await api.post("/auth/refresh-token", { refreshToken });
        const { accessToken } = response.data;

        // Update the access token in localStorage
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};