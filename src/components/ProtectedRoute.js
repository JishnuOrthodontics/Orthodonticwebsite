import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role, userRole }) {
  // Check if the user's role matches the required role for the route
  if (userRole === role) {
    return children; // Render the component
  } else {
    return <Navigate to="/login" />; // Redirect to login if unauthorized
  }
}

export default ProtectedRoute;