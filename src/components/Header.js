import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config"; // Import auth
import { signOut } from "firebase/auth";

function Header({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have successfully logged out!");
      window.location.href = "/"; // Redirect after logout
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <h1 style={{ display: "inline-block", marginRight: "20px" }}>
        Mark The Orthodontic Corp
      </h1>
      <Link to="/" style={{ margin: "0 10px", textDecoration: "none" }}>Home</Link>
      <Link to="/about" style={{ margin: "0 10px", textDecoration: "none" }}>About</Link>
      <Link to="/contact" style={{ margin: "0 10px", textDecoration: "none" }}>Contact</Link>

      {/* Conditional Rendering Based on User Status */}
      {user?.role ? (
        <>
          <Link
            to={user.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"}
            style={{ margin: "0 10px", textDecoration: "none" }}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ margin: "0 10px", textDecoration: "none" }}>Login</Link>
          <Link to="/register" style={{ margin: "0 10px", textDecoration: "none" }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Header;