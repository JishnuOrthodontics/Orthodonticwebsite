import React, { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Firebase configuration
import emailjs from "@emailjs/browser"; // EmailJS integration
import { TextField, Button, CircularProgress, Typography, Box } from "@mui/material";

function ContactForm() {
  const [name, setName] = useState(""); // State for user's name
  const [email, setEmail] = useState(""); // State for user's email
  const [message, setMessage] = useState(""); // State for user's message
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(""); // State to track error messages
  const form = useRef(); // Reference for the form (for EmailJS)

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Enable loading state
    setError(""); // Clear any previous errors

    try {
      // Save the message to Firestore
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        timestamp: new Date(),
      });

      // Send email using EmailJS
      await emailjs.sendForm(
        "service_eydmfct", // Replace with your EmailJS Service ID
        "template_vjgpae9", // Replace with your EmailJS Template ID
        form.current,
        "PT5nrirjVsFXmkyvL" // Replace with your EmailJS Public Key
      );

      alert("Your message has been sent successfully!");
      setName(""); // Reset the name field
      setEmail(""); // Reset the email field
      setMessage(""); // Reset the message field
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send your message. Please try again.");
    } finally {
      setLoading(false); // Disable loading state
    }
  };

  return (
    <Box
      component="form"
      ref={form}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Contact Us
      </Typography>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {/* Name Field */}
      <TextField
        label="Your Name"
        name="user_name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {/* Email Field */}
      <TextField
        label="Your Email"
        name="user_email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Message Field */}
      <TextField
        label="Your Message"
        name="message"
        variant="outlined"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ alignSelf: "flex-start" }}
      >
        {loading ? <CircularProgress size={24} /> : "Send"}
      </Button>
    </Box>
  );
}

export default ContactForm;