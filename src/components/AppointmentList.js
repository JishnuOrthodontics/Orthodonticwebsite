import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length > 0 ? (
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