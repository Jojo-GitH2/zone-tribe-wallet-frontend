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
    const token = response.data.token;

    // Save the token to localStorage
    localStorage.setItem("token", token);

    return token;
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token");
};