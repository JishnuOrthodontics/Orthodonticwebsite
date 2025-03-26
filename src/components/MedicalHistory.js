import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function MedicalHistory() {
  const [medicalData, setMedicalData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
    dentalIssues: "",
    pastTreatments: "",
    oralHygiene: "",
    lifestyleHabits: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalData({ ...medicalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found");

      await setDoc(doc(db, "medicalHistories", user.uid), {
        ...medicalData,
        userId: user.uid,
      });

      alert("Your medical and dental history has been submitted successfully!");
      navigate("/patient-dashboard"); // Redirect to patient dashboard
    } catch (err) {
      console.error("Error saving medical history:", err.message);
      setError("Failed to submit your information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Medical and Dental History</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={medicalData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={medicalData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={medicalData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Medical Conditions (if any):</label>
          <textarea
            name="medicalConditions"
            value={medicalData.medicalConditions}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Allergies (if any):</label>
          <textarea
            name="allergies"
            value={medicalData.allergies}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Current Medications:</label>
          <textarea
            name="medications"
            value={medicalData.medications}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Dental Issues:</label>
          <textarea
            name="dentalIssues"
            value={medicalData.dentalIssues}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Past Treatments:</label>
          <textarea
            name="pastTreatments"
            value={medicalData.pastTreatments}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Oral Hygiene Routine:</label>
          <textarea
            name="oralHygiene"
            value={medicalData.oralHygiene}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Lifestyle Habits (Smoking/Alcohol/etc.):</label>
          <textarea
            name="lifestyleHabits"
            value={medicalData.lifestyleHabits}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default MedicalHistory;