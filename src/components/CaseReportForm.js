import React, { useState } from "react";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";

function CaseReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "caseReports"), {
        title,
        description,
        submissionDate: Timestamp.now(),
      });
      alert("Case report submitted successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error submitting case report:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Submit Case Report</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginBottom: "20px" }}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default CaseReportForm;