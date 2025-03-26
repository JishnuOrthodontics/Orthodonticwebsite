import React from "react";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div>
    <h1>Contact Us</h1>
    <p>
      Have a question or need support? Use the form below to send us a message, and we’ll get back to you as soon as possible.
    </p>
    <ContactForm /> {/* Embed the ContactForm component here */}
  </div>

  );
}

export default Contact;