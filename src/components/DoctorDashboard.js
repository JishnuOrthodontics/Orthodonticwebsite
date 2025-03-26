import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]); // Store all appointments
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Currently selected patient ID
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Filtered appointments for selected patient
  const [medicalHistory, setMedicalHistory] = useState(null); // Medical history for selected patient
  const [loadingHistory, setLoadingHistory] = useState(false); // Loading state for medical history
  const [loading, setLoading] = useState(false); // General loading state

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
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>

      {/* Loading Feedback */}
      {loading && <CircularProgress />}

      {/* Appointment List */}
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6">Your Appointments</Typography>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Card key={appointment.id} style={{ marginBottom: "15px" }}>
              <CardContent>
                <Typography variant="subtitle1"><strong>Patient Name:</strong> {appointment.name}</Typography>
                <Typography variant="subtitle2"><strong>Date:</strong> {appointment.date}</Typography>
                <Typography variant="subtitle2"><strong>Time:</strong> {appointment.time}</Typography>
                <Typography variant="subtitle2"><strong>Status:</strong> {appointment.status}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginRight: "10px", marginTop: "10px" }}
                  onClick={() => handlePatientSelection(appointment.userId)}
                >
                  View Patient Details
                </Button>
                {appointment.status === "Pending" && (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    style={{ marginRight: "10px" }}
                    onClick={() => updateAppointmentStatus(appointment.id, "Confirmed")}
                  >
                    Confirm
                  </Button>
                )}
                {appointment.status === "Confirmed" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => updateAppointmentStatus(appointment.id, "Completed")}
                  >
                    Mark as Completed
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No appointments found.</Typography>
        )}
      </div>

      {/* Filtered Appointments Section */}
      {selectedPatientId && filteredAppointments.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Filtered Appointments for Selected Patient</Typography>
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
      {loadingHistory && <CircularProgress />}
      {medicalHistory && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Patient Medical History</Typography>
          <Typography><strong>Full Name:</strong> {medicalHistory.fullName}</Typography>
          <Typography><strong>Date of Birth:</strong> {medicalHistory.dateOfBirth}</Typography>
          <Typography><strong>Medical Conditions:</strong> {medicalHistory.medicalConditions}</Typography>
          <Typography><strong>Allergies:</strong> {medicalHistory.allergies}</Typography>
          <Typography><strong>Current Medications:</strong> {medicalHistory.medications}</Typography>
          <Typography><strong>Dental Issues:</strong> {medicalHistory.dentalIssues}</Typography>
          <Typography><strong>Past Treatments:</strong> {medicalHistory.pastTreatments}</Typography>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;