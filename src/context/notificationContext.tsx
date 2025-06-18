import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import api from "../services/api";
import { AuthContext } from "./authContext";
import {
  startSignalRConnection,
  stopSignalRConnection,
} from "../services/signalRService";

export type Notification = {
  id: string;
  userId: string;
  message: string;
  type: "success" | "error" | "info";
  createdAt: string;
  isRead: boolean;
};

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    message: string,
    type?: "success" | "error" | "info",
    id?: string
  ) => Promise<void>;
  addTemporaryNotification?: (
    message: string,
    type?: "success" | "error" | "info"
  ) => void;
  clearNotifications: () => Promise<void>;
  clearNotificationById?: (id: string) => Promise<void>;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const userId = authContext?.user?.id;
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
      setNotifications([]);
      return;
    }

    // Fetch notifications on login or when user changes
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();

    // Listen for real-time notifications
    startSignalRConnection(
      () => {},
      (notification: any) => {
        setNotifications((prev) => {
          const idx = prev.findIndex((n) => n.id === notification.id);
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = { ...prev[idx], ...notification };
            return updated;
          }
          return [notification, ...prev];
        });
      }
    );

    return () => stopSignalRConnection();
  }, [authContext?.user?.id]);

  // You can remove addNotification if backend handles all notification creation
  const addNotification = async (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    // Optionally, you can POST to backend if you want to trigger a notification from frontend
    const userId = authContext?.user?.id;
    if (!userId) return;

    const notif = {
      userId,
      message,
      type,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    try {
      await api.post("/notifications", notif);
      // No need to update local state, backend will push via SignalR
    } catch {}
  };

  const addTemporaryNotification = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const tempId = `temp-${Date.now()}`;
    setNotifications((prev) => [
      ...prev,
      {
        id: tempId,
        userId: "local",
        message,
        type,
        createdAt: new Date().toISOString(),
        isRead: false,
      },
    ]);
    // Remove after 10 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== tempId));
    }, 10000);
  };

  const clearNotifications = async () => {
    setNotifications([]);
    try {
      await api.delete("/notifications");
    } catch {}
  };

  const clearNotificationById = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await api.delete(`/notifications/${id}`);
    } catch {}
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        addTemporaryNotification,
        clearNotifications,
        clearNotificationById,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
