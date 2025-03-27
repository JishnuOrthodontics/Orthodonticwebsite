import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function DealerRegister() {
  const [name, setName] = useState(""); // Dealer name
  const [email, setEmail] = useState(""); // Dealer email
  const [password, setPassword] = useState(""); // Dealer password
  const [error, setError] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation hook

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Validate password length
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save dealer profile with role "dealer" in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "dealer",
        registrationDate: new Date().toISOString(), // Save registration timestamp
      });

      console.log("Dealer registered successfully:", user.uid);

      // Redirect to login page with success message
      alert("Registration successful! Please log in.");
      navigate("/dealer/login", { state: { message: "Your account has been created successfully. Log in to continue." } });
    } catch (err) {
      console.error("Error during dealer registration:", err.message);
      setError(err.message); // Display error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Dealer Registration
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/dealer/login")}>Login Here</Button>
        </Typography>
      </Box>
    </Container>
  );
}

export default DealerRegister;