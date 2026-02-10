// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../utils/api";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  // Not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route but user is not admin
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // All checks passed, render the protected component
  return children;
};

export default ProtectedRoute;