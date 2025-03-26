import React from "react";
import { Container, Grid, Typography, Card, CardContent, TextField, Button } from "@mui/material";

function DoctorsEducationPortal() {
  return (
    <Container maxWidth="lg" style={{ padding: "20px" }}>
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
          Welcome to Doctors' Education Portal
        </Typography>
        <Typography variant="h6">
          Stay updated with the latest advancements in orthodontics and share your knowledge.
        </Typography>
      </div>

      {/* Latest Updates Section */}
      <Grid container spacing={4} style={{ marginBottom: "40px" }}>
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h6">Latest News</Typography>
              <Typography variant="body2">
                Placeholder for AI-curated orthodontic news and technological updates.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h6">Featured Case Reports</Typography>
              <Typography variant="body2">
                Placeholder for top case reports submitted by doctors.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search Engine Section */}
      <div style={{ marginBottom: "40px" }}>
        <Typography variant="h5" gutterBottom>
          Search Orthodontic Journals
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search by topic, author, or keyword..."
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" fullWidth>
          Search
        </Button>
      </div>

      {/* Articles and Contributions Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h6">Your Articles</Typography>
              <Typography variant="body2">
                Placeholder for submitted articles by doctors. Add your contributions here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography variant="h6">Upload Case Reports</Typography>
              <Typography variant="body2">
                Placeholder for doctors to upload detailed case reports and share with the community.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DoctorsEducationPortal;