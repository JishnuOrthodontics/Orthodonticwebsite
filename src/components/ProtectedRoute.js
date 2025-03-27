import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ userRole, roleRequired, children }) {
  // Check if the user's role matches the required role
  if (!userRole || userRole !== roleRequired) {
    // Redirect to login if the user isn't authenticated or the role doesn't match
    return <Navigate to={`/${roleRequired}/login`} />;
  }

  // Render the protected route
  return children;
}

export default ProtectedRoute;