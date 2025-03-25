import React, { useState } from "react";
import { app } from "../firebase-config"; // Use named import for app
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState(""); // State for user email
  const [password, setPassword] = useState(""); // State for user password
  const auth = getAuth(app); // Get the authentication instance

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user); // Log the successfully registered user
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error.message); // Log registration error
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;