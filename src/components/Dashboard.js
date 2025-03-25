import React from "react";
import { useAuth } from "../AuthContext";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

function Dashboard() {
  const { currentUser } = useAuth(); // Get the current logged-in user

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {currentUser ? (
        <div>
          <p>Email: {currentUser.email}</p>
          <AppointmentForm />
          <AppointmentList />
        </div>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;