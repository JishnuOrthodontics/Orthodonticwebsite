import React, { useState } from "react";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function SuggestionForm() {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "suggestions"), {
        suggestion,
        timestamp: new Date(),
      });
      setSubmitted(true);
      setSuggestion("");
    } catch (err) {
      console.error("Error submitting suggestion:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitted ? (
        <Typography variant="h6">Thank you for your suggestion!</Typography>
      ) : (
        <>
          <TextField
            label="Your Suggestion"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </>
      )}
    </form>
  );
}

export default SuggestionForm;