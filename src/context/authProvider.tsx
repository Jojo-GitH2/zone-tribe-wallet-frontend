import React, { useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { login, register, logout, getToken, refreshAccessToken } from "../services/authService";
import { AuthContext } from "./authContext";
import { mapClaimsToUser } from "../utils/mapClaims";
import { User } from "../types/user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Rehydrate user state from localStorage on app initialization
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const decodedToken = jwtDecode<any>(token);

          // Check if the token is expired
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            // Attempt to refresh the token
            try {
              const newAccessToken = await refreshAccessToken();
              const newDecodedToken = jwtDecode<any>(newAccessToken);
              const mappedUser = mapClaimsToUser(newDecodedToken);
              setUser(mappedUser);
              localStorage.setItem("user", JSON.stringify(mappedUser)); // Persist user
            } catch (refreshError) {
              console.error("Failed to refresh token:", refreshError);
              handleLogout();
            }
          } else {
            // Token is valid, set the user state
            const mappedUser = mapClaimsToUser(decodedToken);
            setUser(mappedUser);
            localStorage.setItem("user", JSON.stringify(mappedUser)); // Persist user
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          handleLogout();
        }
      } else {
        // Rehydrate user from localStorage if token is missing
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const token = await login({ email, password });
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
      {children}
    </AuthContext.Provider>
  );
};
