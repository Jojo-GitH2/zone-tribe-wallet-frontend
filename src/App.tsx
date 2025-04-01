import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./components/privateRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <h1>Dashboard</h1>
              </PrivateRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
};

export default App;
