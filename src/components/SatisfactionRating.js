import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function SatisfactionRating() {
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingSubmit = async (value) => {
    setRating(value); // Store the user's rating
    setSubmitted(true);

    try {
      await addDoc(collection(db, "feedback"), {
        rating: value,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error("Error saving feedback:", err);
    }
  };

  return (
    <div>
      {submitted ? (
        <Typography variant="h6">
          Thank you for your feedback! You rated us: <strong>{rating}</strong>
        </Typography>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            How would you rate your experience?
          </Typography>
          <Button variant="contained" color="success" onClick={() => handleRatingSubmit("Good")}>
            😊 Good
          </Button>
          <Button
            variant="contained"
            color="warning"
            style={{ marginLeft: "10px" }}
            onClick={() => handleRatingSubmit("Neutral")}
          >
            😐 Neutral
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ marginLeft: "10px" }}
            onClick={() => handleRatingSubmit("Bad")}
          >
            😞 Bad
          </Button>
        </>
      )}
    </div>
  );
}

export default SatisfactionRating;