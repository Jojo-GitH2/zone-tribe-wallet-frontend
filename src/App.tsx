import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import { NotificationProvider } from "./context/notificationContext";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./components/privateRoute";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
