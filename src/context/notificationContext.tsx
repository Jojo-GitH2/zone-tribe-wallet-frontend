import React, { createContext, useState, ReactNode } from "react";

export interface Notification {
  id: string; // was number
  message: string;
  type?: "success" | "error" | "info";
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    message: string,
    type?: "success" | "error" | "info",
    id?: string
  ) => void;
  clearNotifications: () => void;
  clearNotificationById?: (id: string) => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    message: string,
    type: "success" | "error" | "info" = "info",
    id?: string
  ) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: id ?? `${Date.now()}-${Math.random()}`,
        message,
        type,
        timestamp: new Date(),
      },
    ]);
  };

  const clearNotifications = () => setNotifications([]);

  const clearNotificationById = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        clearNotificationById,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
