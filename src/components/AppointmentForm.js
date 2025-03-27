import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import fetchUserRole from "./RoleFetcher"; // Import the role fetching function

function AppointmentForm() {
  const [appointments, setAppointments] = useState([]); // Stores appointments
  const [loading, setLoading] = useState(false); // Loading indicator
  const [error, setError] = useState(""); // Error messages

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true); // Set loading state
      setError(""); // Clear any previous errors

      try {
        // Step 1: Fetch user role
        const userRole = await fetchUserRole();

        // Step 2: Check if the user has the "doctor" role
        if (userRole !== "doctor") {
          throw new Error("Access denied: User is not a doctor.");
        }

        // Step 3: Fetch appointments from Firestore
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(fetchedAppointments);
      } catch (err) {
        // Handle errors during role verification or Firestore access
        console.error("Error fetching appointments:", err.message);
        setError(err.message);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchAppointments(); // Execute the fetch logic
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Appointments</h2>
      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Error Display */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Appointments List */}
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
            <p><strong>Patient:</strong> {appointment.name}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
          </div>
        ))
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentForm;