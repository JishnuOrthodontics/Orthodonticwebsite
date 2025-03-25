import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function AppointmentForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "appointments"), {
        name,
        date,
        time,
      });
      alert("Appointment saved successfully!");
      setName("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to save appointment.");
    }
  };

  return (
    <div>
      <h2>Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <br />
        <button type="submit">Save Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;