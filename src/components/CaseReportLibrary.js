import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

function CaseReportLibrary() {
  const [caseReports, setCaseReports] = useState([]);

  useEffect(() => {
    const fetchCaseReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "caseReports"));
        const fetchedReports = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCaseReports(fetchedReports);
      } catch (err) {
        console.error("Error fetching case reports:", err.message);
      }
    };

    fetchCaseReports();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
      <Typography variant="h5" gutterBottom>
        Case Report Library
      </Typography>
      <Grid container spacing={4}>
        {caseReports.map((report) => (
          <Grid item xs={12} md={6} key={report.id}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {report.title}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  {report.description}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Submitted by: {report.author} | Date: {new Date(report.submissionDate.seconds * 1000).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CaseReportLibrary;