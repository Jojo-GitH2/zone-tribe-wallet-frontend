import React, { useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { login, register, logout, getToken } from "../services/authService";
import { AuthContext } from "./authContext";
import { mapClaimsToUser } from "../utils/mapClaims";
import { User } from "../types/user";


export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const mappedUser = mapClaimsToUser(decodedToken);
      setUser(mappedUser);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const token = await login({ email, password });
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode<any>(token);
    const mappedUser = mapClaimsToUser(decodedToken);
    setUser(mappedUser);
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
