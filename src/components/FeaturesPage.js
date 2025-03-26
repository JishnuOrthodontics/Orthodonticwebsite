import React from "react";
import { Container, Grid, Typography, Button, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

function FeaturesPage() {
  return (
    <Container maxWidth="lg" style={{ padding: "20px", marginTop: "40px" }}>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "linear-gradient(90deg, #ff9800, #f57c00)",
          color: "white",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Explore Our Features for Patients
        </Typography>
        <Typography variant="h6" gutterBottom>
          Discover how OrthoCorp helps you manage your healthcare effortlessly.
        </Typography>
      </div>

      {/* Key Features Section */}
      <div style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Book Appointments
                </Typography>
                <Typography variant="body2">
                  Easily schedule appointments with your preferred doctors, anytime, anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Track Medical History
                </Typography>
                <Typography variant="body2">
                  Maintain secure medical and dental records for easy access and tracking.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Real-Time Notifications
                </Typography>
                <Typography variant="body2">
                  Stay updated on appointment confirmations and reminders in real time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User-Friendly Dashboard
                </Typography>
                <Typography variant="body2">
                  Access all your healthcare information at a glance in a clean, intuitive interface.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Registration and Login Buttons */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/register"
          style={{ marginRight: "20px", textDecoration: "none", color: "white" }}
        >
          Register Now
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/login"
          style={{ textDecoration: "none", color: "white" }}
        >
          Login
        </Button>
      </div>
    </Container>
  );
}

export default FeaturesPage;