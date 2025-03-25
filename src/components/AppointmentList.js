import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(""); // Add error state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentData);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Your Appointments</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>Name:</strong> {appointment.name} <br />
              <strong>Date:</strong> {appointment.date} <br />
              <strong>Time:</strong> {appointment.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentList;