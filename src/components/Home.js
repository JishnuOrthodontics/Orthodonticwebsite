import React from "react";
import { Container, Grid, Typography, Button, Card, CardContent } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="lg" style={{ padding: "20px", marginTop: "40px" }}>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "linear-gradient(90deg, #007bff, #0056b3)",
          color: "white",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <img
          src="your-image-url-or-path-here" // Replace with the actual image path or URL
          alt="Healthcare Platform"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            maxHeight: "120px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Typography variant="h3" gutterBottom>
          Welcome to Orthodontic Corp
        </Typography>
        <Typography variant="h6" gutterBottom>
          Empowering Doctors. Assisting Patients. Together, we redefine healthcare.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ marginTop: "20px" }}
        >
          Get Started
        </Button>
      </div>

      {/* Features for Patients and Doctors */}
      <Grid container spacing={4} style={{ marginTop: "50px" }}>
        <Grid item xs={12} md={6}>
          <Card style={{ border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                For Patients
              </Typography>
              <Typography variant="body1" gutterBottom>
                Easily book appointments, manage your health records, and connect with the best doctors.
              </Typography>
              <Button variant="contained" color="primary">
                Explore Features
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                For Doctors
              </Typography>
              <Typography variant="body1" gutterBottom>
                Manage your appointments, view medical histories, and grow your practice seamlessly.
              </Typography>
              <Button variant="contained" color="primary">
                Join Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Features Highlight Section */}
      <div style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Why Choose Orthodontic Corp?
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Real-time Booking</Typography>
                <Typography variant="body2">Schedule appointments instantly with no hassle.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Medical History Access</Typography>
                <Typography variant="body2">Doctors and patients can securely view health records.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">User-Friendly Design</Typography>
                <Typography variant="body2">An intuitive interface for seamless navigation.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Testimonials Section */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          What Our Users Say
        </Typography>
        <Typography variant="body1">
          "This page has made managing my appointments a breeze!" – A Satisfied Patient
        </Typography>
        <Typography variant="body1">
          "I can now focus more on patient care and less on admin work." – A Happy Doctor
        </Typography>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2">© 2025 Orthodontic Corp. All rights reserved.</Typography>
      </div>
    </Container>
  );
}

export default Home;