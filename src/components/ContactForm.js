import React, { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Firebase configuration
import emailjs from "@emailjs/browser"; // EmailJS integration

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
    <div>
      <h2>Contact Us</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}
      <form ref={form} onSubmit={handleSubmit}>
        {/* Name Field */}
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        {/* Email Field */}
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        {/* Message Field */}
        <textarea
          name="message"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <br />

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;