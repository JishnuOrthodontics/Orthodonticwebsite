import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]); // Store all appointments
  const [doctors, setDoctors] = useState([]); // Store doctor list
  const [formData, setFormData] = useState({ name: "", date: "", time: "", doctorId: "" }); // Appointment form
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch appointments and doctor list on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User is not authenticated.");
        }

        // Fetch appointments specific to the logged-in patient
        const q = query(collection(db, "appointments"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userAppointments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
          .filter((user) => user.role === "doctor"); // Filter only users with role "doctor"
        setDoctors(doctorList);
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
        setError("Failed to load doctor list.");
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, []);

  // Handle appointment submission with date and time validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = auth.currentUser;

      // Validate date format
      const formattedDate = new Date(formData.date).toISOString().split("T")[0]; // Returns YYYY-MM-DD
      if (formattedDate !== formData.date) {
        throw new Error("Invalid date format. Please use YYYY-MM-DD.");
      }

      // Validate time format using regex
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM (24-hour)
      if (!timeRegex.test(formData.time)) {
        throw new Error("Invalid time format. Please use HH:MM (24-hour).");
      }

      const appointmentData = {
        ...formData,
        date: formattedDate, // Use validated and formatted date
        userId: user.uid, // Associate appointment with logged-in user
        status: "Pending", // Default status when booking
      };

      await addDoc(collection(db, "appointments"), appointmentData);
      alert("Appointment scheduled successfully!");
      setFormData({ name: "", date: "", time: "", doctorId: "" }); // Reset form
      setAppointments((prevAppointments) => [...prevAppointments, appointmentData]); // Add new appointment locally
    } catch (err) {
      console.error("Error scheduling appointment:", err.message);
      setError(err.message); // Show error message
    } finally {
      setLoading(false);
    }
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle appointment cancellation
  const handleCancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, { status: "Cancelled" });
      alert("Appointment cancelled successfully.");
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "Cancelled" } : appointment
        )
      );
    } catch (err) {
      console.error("Error cancelling appointment:", err.message);
      setError("Failed to cancel the appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to Your Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Appointments */}
      <div>
        <h3>Your Appointments</h3>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id} style={{ marginBottom: "15px" }}>
                <strong>Doctor:</strong> {appointment.doctorId} <br />
                <strong>Name:</strong> {appointment.name} <br />
                <strong>Date:</strong> {appointment.date} <br />
                <strong>Time:</strong> {appointment.time} <br />
                <strong>Status:</strong> {appointment.status} <br />
                {appointment.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelAppointment(appointment.id)}
                    style={{
                      marginTop: "10px",
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel Appointment
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>

      {/* Appointment Form */}
      <div style={{ marginTop: "20px" }}>
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
              style={{ width: "100%", marginBottom: "10px" }}
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
              style={{ width: "100%", marginBottom: "10px" }}
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
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div>
            <label>Doctor:</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
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