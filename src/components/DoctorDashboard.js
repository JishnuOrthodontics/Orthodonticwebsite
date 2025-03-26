import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]); // Store all appointments
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Track selected patient ID
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Filtered appointments for selected patient
  const [medicalHistory, setMedicalHistory] = useState(null); // Medical history for selected patient
  const [loadingHistory, setLoadingHistory] = useState(false); // Loading state for medical history
  const [loading, setLoading] = useState(false); // General loading state for appointments/actions

  // Fetch all appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true); // Start loading
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(fetchedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAppointments();
  }, []);

  // Fetch medical history for the selected patient
  const fetchMedicalHistory = async (patientId) => {
    setLoadingHistory(true); // Start loading medical history
    setMedicalHistory(null); // Clear previous history
    try {
      const docRef = doc(db, "medicalHistories", patientId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMedicalHistory(docSnap.data());
      } else {
        alert("No medical history found for this patient.");
      }
    } catch (err) {
      console.error("Error fetching medical history:", err.message);
    } finally {
      setLoadingHistory(false); // Stop loading medical history
    }
  };

  // Handle patient selection and fetch appointments/medical history
  const handlePatientSelection = (patientId) => {
    setSelectedPatientId(patientId);
    const filtered = appointments.filter((appointment) => appointment.userId === patientId);
    setFilteredAppointments(filtered); // Set filtered appointments
    fetchMedicalHistory(patientId); // Fetch medical history
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    setLoading(true); // Start loading
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, { status: newStatus });
      alert(`Appointment status updated to "${newStatus}"`);

      // Update the local state to reflect the status change
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment
      );
      setAppointments(updatedAppointments);
    } catch (err) {
      console.error("Error updating appointment status:", err.message);
      alert("Failed to update appointment status.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Dashboard</h2>

      {/* Loading Feedback */}
      {loading && <p>Loading data, please wait...</p>}

      {/* Appointment List */}
      <div>
        <h3>Your Appointments</h3>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id} style={{ marginBottom: "15px" }}>
                <strong>Patient Name:</strong> {appointment.name} <br />
                <strong>Date:</strong> {appointment.date} <br />
                <strong>Time:</strong> {appointment.time} <br />
                <strong>Status:</strong> {appointment.status} <br />
                <button
                  onClick={() => handlePatientSelection(appointment.userId)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View Patient Details
                </button>
                {appointment.status === "Pending" && (
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, "Confirmed")}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Confirm
                  </button>
                )}
                {appointment.status === "Confirmed" && (
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, "Completed")}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "gray",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Mark as Completed
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>

      {/* Filtered Appointments Section */}
      {selectedPatientId && filteredAppointments.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Appointments for Selected Patient</h3>
          <ul>
            {filteredAppointments.map((appointment) => (
              <li key={appointment.id} style={{ marginBottom: "10px" }}>
                <strong>Date:</strong> {appointment.date} <br />
                <strong>Time:</strong> {appointment.time}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Medical History Section */}
      {loadingHistory && <p>Loading medical history...</p>}
      {medicalHistory && (
        <div style={{ marginTop: "20px" }}>
          <h3>Patient Medical History</h3>
          <p><strong>Full Name:</strong> {medicalHistory.fullName}</p>
          <p><strong>Date of Birth:</strong> {medicalHistory.dateOfBirth}</p>
          <p><strong>Medical Conditions:</strong> {medicalHistory.medicalConditions}</p>
          <p><strong>Allergies:</strong> {medicalHistory.allergies}</p>
          <p><strong>Current Medications:</strong> {medicalHistory.medications}</p>
          <p><strong>Dental Issues:</strong> {medicalHistory.dentalIssues}</p>
          <p><strong>Past Treatments:</strong> {medicalHistory.pastTreatments}</p>
          <p><strong>Oral Hygiene Routine:</strong> {medicalHistory.oralHygiene}</p>
          <p><strong>Lifestyle Habits:</strong> {medicalHistory.lifestyleHabits}</p>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;