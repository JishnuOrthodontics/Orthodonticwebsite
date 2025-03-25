import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which appointment is being edited
  const [formData, setFormData] = useState({ name: "", date: "", time: "" });

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setFormData({ name: appointment.name, date: appointment.date, time: appointment.time });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "appointments", editingId);
      await updateDoc(docRef, formData);
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === editingId ? { ...appointment, ...formData } : appointment
        )
      );
      setEditingId(null);
      alert("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {editingId === appointment.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>
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
  );
}

export default AppointmentList;