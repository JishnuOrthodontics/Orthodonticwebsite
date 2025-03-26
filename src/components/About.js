import React from "react";
import { Container, Grid, Typography, Button, Card, CardContent, Avatar } from "@mui/material";

function About() {
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
        }}
      >
        <Typography variant="h3" gutterBottom>
          About Orthodontic Corp
        </Typography>
        <Typography variant="h6" gutterBottom>
          Bridging the Gap Between Care and Technology
        </Typography>
      </div>

      {/* Mission and Vision Section */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Our Mission and Vision
        </Typography>
        <Typography variant="body1" gutterBottom>
          At OrthoCorp, we aim to simplify Dental healthcare by empowering doctors and assisting patients through seamless technology. Our vision is to create a connected world where healthcare is accessible, reliable, and efficient for everyone.
        </Typography>
      </div>

      {/* Why Choose Us Section */}
      <div style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Accessibility</Typography>
                <Typography variant="body2">
                  Making healthcare available to patients anytime, anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Innovation</Typography>
                <Typography variant="body2">
                  Leveraging technology to bring modern solutions to healthcare.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Reliability</Typography>
                <Typography variant="body2">
                  A secure and dependable platform for all users.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Patient-Centric Design</Typography>
                <Typography variant="body2">
                  Designed with patients’ needs as our top priority.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Doctor Empowerment</Typography>
                <Typography variant="body2">
                  Tools to help doctors focus on care, not paperwork.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Team Section */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <Avatar
              alt="Team Member 1"
              src="https://via.placeholder.com/150" // Replace with actual image URL
              style={{ width: "100px", height: "100px", margin: "auto" }}
            />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Dr. Jishnu S MDS
            </Typography>
            <Typography variant="body2">Founder & CEO</Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <Avatar
              alt="Team Member 2"
              src="https://via.placeholder.com/150" // Replace with actual image URL
              style={{ width: "100px", height: "100px", margin: "auto" }}
            />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              B
            </Typography>
            <Typography variant="body2">FrontEnd Developer</Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <Avatar
              alt="Team Member 3"
              src="https://via.placeholder.com/150" // Replace with actual image URL
              style={{ width: "100px", height: "100px", margin: "auto" }}
            />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              A
            </Typography>
            <Typography variant="body2">BackEnd Developer</Typography>
          </Grid>
        </Grid>
      </div>

      {/* Call to Action */}
      <div
        style={{
          marginTop: "50px",
          padding: "30px",
          background: "linear-gradient(90deg, #007bff, #0056b3)",
          color: "white",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to Redefine Healthcare?
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Join Us Today
        </Button>
      </div>
    </Container>
  );
}

export default About;