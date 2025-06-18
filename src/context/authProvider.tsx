import React, { useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { login, register, logout, getToken } from "../services/authService";
import { AuthContext } from "./authContext";
import { mapClaimsToUser } from "../utils/mapClaims";
import { User } from "../types/user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Rehydrate user state from localStorage on app initialization
  useEffect(() => {
    const token = getToken();

    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const mappedUser = mapClaimsToUser(decodedToken);
      setUser(mappedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const token = await login({ email, password });
    localStorage.setItem("accessToken", token); // Save token to localStorage
    const decodedToken = jwtDecode<any>(token);
    const mappedUser = mapClaimsToUser(decodedToken);
    setUser(mappedUser);
    localStorage.setItem("user", JSON.stringify(mappedUser)); // Persist user
  };

  const handleRegister = async (email: string, password: string) => {
    await register({ email, password });
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem("user"); // Clear persisted user
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
