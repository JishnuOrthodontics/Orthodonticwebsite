import React from "react";
import { useAuth } from "../AuthContext";

function Dashboard() {
  const { currentUser } = useAuth(); // Get the current logged-in user

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {currentUser ? (
        <div>
          <p>Email: {currentUser.email}</p>
          <p>Here you can view your appointments and updates.</p>
        </div>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;