import React, { useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { login, register, logout, getToken } from "../services/authService";
import { AuthContext } from "./authContext";

interface User {
  id: string;
  email: string;
  // Add other fields as per your JWT payload
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const token = await login({ email, password });
    const decodedUser = jwtDecode<User>(token);
    setUser(decodedUser);
  };

  const handleRegister = async (email: string, password: string) => {
    await register({ email, password });
  };

  const handleLogout = () => {
    logout();
    setUser(null);
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
