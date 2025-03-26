import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth, db } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth"; // For authentication
import { doc, getDoc } from "firebase/firestore";
import Header from "./components/Header"; // Navigation menu
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import MedicalHistory from "./components/MedicalHistory";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null); // Current authenticated user
  const [role, setRole] = useState(null); // Role (doctor or patient)
  const [loading, setLoading] = useState(true); // Loading state while fetching data
  const [error, setError] = useState(null); // Error state for role fetching

  // Monitor authentication state and fetch user role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setError(null); // Clear any previous error

      if (currentUser) {
        setUser(currentUser);

        try {
          // Fetch user role from Firestore
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setRole(docSnap.data().role); // Store user role
          } else {
            throw new Error("User role not found in Firestore.");
          }
        } catch (err) {
          console.error("Error fetching user role:", err.message);
          setRole(null);
          setError(err.message); // Set error message for display
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false); // Stop loading once data is fetched
    });

    return unsubscribe; // Cleanup on component unmount
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have successfully logged out!");
      window.location.href = "/"; // Redirect to homepage
    } catch (err) {
      console.error("Error during logout:", err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching user info
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error if role fetching fails
  }

  return (
    <Router>
      <Header user={{ role }} handleLogout={handleLogout} /> {/* Pass user info and logout function */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${role}-dashboard`} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/medical-history" element={<MedicalHistory />} />

        {/* Role-Based Routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute role="doctor" userRole={role}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute role="patient" userRole={role}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;