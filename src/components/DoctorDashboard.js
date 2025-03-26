import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]); // All appointments
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Track selected patient ID
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Filtered appointments
  const [medicalHistory, setMedicalHistory] = useState(null); // Medical history of a selected patient
  const [loadingHistory, setLoadingHistory] = useState(false); // Loading state for fetching history

  // Fetch all appointments when the component loads
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
      }
    };

    fetchAppointments();
  }, []);

  // Fetch the selected patient's medical history
  const fetchMedicalHistory = async (patientId) => {
    setLoadingHistory(true);
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
      setLoadingHistory(false);
    }
  };

  // Handle selection of a patient
  const handlePatientSelection = (patientId) => {
    setSelectedPatientId(patientId); // Set the selected patient ID
    const filtered = appointments.filter((appointment) => appointment.userId === patientId);
    setFilteredAppointments(filtered); // Update filtered appointments
    fetchMedicalHistory(patientId); // Fetch medical history for the selected patient
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Dashboard</h2>

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