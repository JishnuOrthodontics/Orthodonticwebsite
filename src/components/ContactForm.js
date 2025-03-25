import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
      form.current,
      "YOUR_PUBLIC_KEY" // Replace with your EmailJS Public Key
    )
    .then((result) => {
      console.log("Email sent:", result.text);
      alert("Your message has been sent successfully!");
    }, (error) => {
      console.error("Error sending email:", error.text);
      alert("Failed to send the message. Please try again.");
    });

    e.target.reset();
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder="Your Name" required />
        <br />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <br />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ContactForm;