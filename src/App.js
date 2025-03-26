import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth, db } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Includes logout functionality
import { doc, getDoc } from "firebase/firestore";
import Header from "./components/Header"; // Navigation menu
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null); // Authentication state
  const [role, setRole] = useState(null); // User role (doctor or patient)
  const [loading, setLoading] = useState(true); // Loading state for fetching user data

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch the user's role from Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRole(docSnap.data().role); // Set the user's role
        } else {
          console.error("No role found for the user in Firestore.");
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false); // Stop loading when process is complete
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have successfully logged out!");
      window.location.href = "/"; // Redirect to homepage after logout
    } catch (err) {
      console.error("Error during logout:", err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching user data
  }

  return (
    <Router>
      <Header user={{ role }} handleLogout={handleLogout} /> {/* Pass user info and logout */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${role}-dashboard`} />} />
        <Route path="/register" element={<Register />} />

        {/* Doctor Dashboard */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute role="doctor" userRole={role}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Patient Dashboard */}
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