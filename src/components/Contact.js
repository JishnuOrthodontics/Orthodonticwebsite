import React from "react";
import { Container, Grid, Typography, Card, CardContent } from "@mui/material";
import ContactForm from "../components/ContactForm";
import SatisfactionRating from "../components/SatisfactionRating";
import SuggestionForm from "../components/SuggestionForm";
import SupportDesk from "../components/SupportDesk";

function Contact() {
  return (
    <Container maxWidth="lg" style={{ padding: "20px", marginTop: "40px" }}>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "linear-gradient(90deg, #4caf50, #388e3c)",
          color: "white",
          borderRadius: "15px",
          marginBottom: "40px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6">
          Reach out for support, share your ideas, or let us know how we’re doing!
        </Typography>
      </div>

      {/* Feedback and Suggestions Section */}
      <Grid container spacing={4} style={{ marginBottom: "40px" }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Are You Satisfied?
          </Typography>
          <SatisfactionRating />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Share Your Suggestions
          </Typography>
          <SuggestionForm />
        </Grid>
      </Grid>

      {/* Contact Form Section */}
      <div style={{ marginBottom: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Send Us a Message
        </Typography>
        <Typography variant="body1" gutterBottom>
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
          <ContactForm />
        </div>
      </div>

      {/* 24/7 Support Section */}
      <div
        style={{
          padding: "30px",
          background: "linear-gradient(90deg, #ff9800, #f57c00)",
          color: "white",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Need Immediate Assistance?
        </Typography>
        <SupportDesk />
      </div>
      
      {/* Contact Information Section */}
      <Grid container spacing={4} style={{ marginBottom: "40px" }}>
        <Grid item xs={12} md={4}>
          <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body2">+91 7907504639</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body2">dr.jishnu.ortho@gmail.com</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
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
    </Container>
  );
}

export default Contact;