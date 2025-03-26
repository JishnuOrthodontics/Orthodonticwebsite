import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Track the appointment being edited
  const [formData, setFormData] = useState({ name: "", date: "", time: "" });
  const [loading, setLoading] = useState(false); // State for loading actions
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(fetchedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
        setError("Failed to load appointments.");
      }
    };

    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment.id);
    setFormData({
      name: appointment.name,
      date: appointment.date,
      time: appointment.time,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const docRef = doc(db, "appointments", selectedAppointment);
      await updateDoc(docRef, formData);
      alert("Appointment updated successfully!");

      // Update the local state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === selectedAppointment
            ? { ...appointment, ...formData }
            : appointment
        )
      );

      setSelectedAppointment(null); // Exit edit mode
    } catch (err) {
      console.error("Error updating appointment:", err.message);
      setError("Failed to update the appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      setLoading(true);
      const docRef = doc(db, "appointments", appointmentId);
      await deleteDoc(docRef);
      alert("Appointment deleted successfully!");

      // Update the local state
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (err) {
      console.error("Error deleting appointment:", err.message);
      setError("Failed to delete the appointment.");
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
      <h2>Doctor Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h3>All Appointments</h3>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                {selectedAppointment === appointment.id ? (
                  <form onSubmit={handleUpdate}>
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
                    <button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAppointment(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <p>
                      <strong>Name:</strong> {appointment.name} <br />
                      <strong>Date:</strong> {appointment.date} <br />
                      <strong>Time:</strong> {appointment.time}
                    </p>
                    <button onClick={() => handleEdit(appointment)}>Edit</button>
                    <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;