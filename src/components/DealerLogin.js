import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Access route navigation and state
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function DealerLogin() {
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [error, setError] = useState(""); // Error messages for login
  const [loading, setLoading] = useState(false); // Loading state for login action
  const navigate = useNavigate(); // Navigation hook
  const location = useLocation(); // Access location state for success messages

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error state
    setLoading(true); // Start loading

    try {
      // Validate email format before login
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Sign in the dealer using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the dealer's role from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.role === "dealer") {
          console.log("Dealer login successful:", user.uid);
          navigate("/dealer"); // Redirect to Dealer Portal home
        } else {
          throw new Error("Access denied: Your account is not registered as a dealer.");
        }
      } else {
        throw new Error("User data not found in Firestore.");
      }
    } catch (err) {
      console.error("Error during dealer login:", err.message);
      setError(err.message); // Show error to the user
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Dealer Login
        </Typography>
        {/* Display incoming success message if any */}
        {location.state?.message && (
          <Typography color="success" sx={{ mb: 2 }}>
            {location.state.message}
          </Typography>
        )}
        {/* Display error message */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/dealer/register")}>Register Here</Button>
        </Typography>
      </Box>
    </Container>
  );
}

export default DealerLogin;