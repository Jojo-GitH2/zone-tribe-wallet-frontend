import React, { createContext, useState, ReactNode } from "react";

export interface Notification {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
  clearNotifications: () => void;
}

export const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message, type, timestamp: new Date() },
    ]);
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};