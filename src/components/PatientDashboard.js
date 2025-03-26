import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../AuthContext";

function PatientDashboard() {
  const { currentUser } = useAuth(); // Get the logged-in user's data
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ name: "", date: "", time: "", doctorId: "" });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const userAppointments = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((appointment) => appointment.userId === currentUser.uid); // Filter appointments by logged-in user

        setAppointments(userAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
        setError("Failed to load your appointments.");
      }
    };

    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const doctorList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => user.role === "doctor"); // Filter users with role "doctor"

        setDoctors(doctorList);
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
        setError("Failed to load doctor list.");
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const appointmentData = {
        ...formData,
        userId: currentUser.uid, // Associate appointment with logged-in user
      };

      await addDoc(collection(db, "appointments"), appointmentData);
      alert("Appointment scheduled successfully!");
      setFormData({ name: "", date: "", time: "", doctorId: "" });
    } catch (err) {
      console.error("Error scheduling appointment:", err.message);
      setError("Failed to schedule the appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h3>Your Appointments</h3>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <strong>Doctor:</strong> {appointment.doctorId} <br />
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

      <div>
        <h3>Schedule a New Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Doctor:</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Select a Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.email} ({doctor.id})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Scheduling..." : "Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientDashboard;