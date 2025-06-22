import { createContext } from "react";
import { User } from "../types/user";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean; // <-- Add this line
}

export const AuthContext = createContext<AuthContextType | null>(null);
