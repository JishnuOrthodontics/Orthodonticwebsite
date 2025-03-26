import React from "react";
import { Container, Grid, Typography, Button, Card, CardContent } from "@mui/material";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <Container maxWidth="lg" style={{ padding: "20px", marginTop: "40px" }}>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "linear-gradient(90deg, #2196f3, #1976d2)",
          color: "white",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6" gutterBottom>
          Have a question or need support? We’re here to help!
        </Typography>
      </div>

      {/* Contact Information Section */}
      <div style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Get in Touch
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body2">+91 7907504639</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Email</Typography>
                <Typography variant="body2">dr.jishnu.ortho@gmail.com</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Address</Typography>
                <Typography variant="body2">
                  Sreeragam Aroor.P.O, Alappuzha
                  <br />
                  Kerala State, India.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Contact Form Section */}
      <div style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Send Us a Message
        </Typography>
        <Typography variant="body1" style={{ textAlign: "center", marginBottom: "20px" }}>
          Fill out the form below, and we’ll get back to you as soon as possible.
        </Typography>
        <div
          style={{
            margin: "0 auto",
            maxWidth: "600px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <ContactForm /> {/* Embed the ContactForm component here */}
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        style={{
          marginTop: "50px",
          padding: "30px",
          background: "linear-gradient(90deg, #4caf50, #2e7d32)",
          color: "white",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Need Immediate Assistance?
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Call Us Now
        </Button>
      </div>
    </Container>
  );
}

export default Contact;