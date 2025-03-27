import React from "react";
import { Container, Typography } from "@mui/material";
import NewsSection from "./NewsSection"; // Component for latest news
import CaseReportForm from "./CaseReportForm"; // Component to submit case reports
import CaseReportLibrary from "./CaseReportLibrary"; // Component to view case reports
import SearchBar from "./SearchBar"; // Component for the search engine

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
          Doctors' Education Portal
        </Typography>
        <Typography variant="h6">
          Stay informed, collaborate, and grow with the latest in orthodontic research.
        </Typography>
      </div>

      {/* Search Engine */}
      <SearchBar />

      {/* Latest News Section */}
      <div style={{ marginTop: "40px", marginBottom: "40px" }}>
        <NewsSection />
      </div>

      {/* Submit Case Reports Section */}
      <div style={{ marginBottom: "40px" }}>
        <CaseReportForm />
      </div>

      {/* Case Report Library */}
      <div style={{ marginBottom: "40px" }}>
        <CaseReportLibrary />
      </div>
    </Container>
  );
}

export default DoctorsEducationPortal;