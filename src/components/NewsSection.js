import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

function NewsSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from the database (mocked for now)
    const fetchedArticles = [
      {
        title: "Advances in Clear Aligners Technology",
        summary: "This article explores the latest advancements in clear aligners, focusing on improved materials and treatment efficiency.",
        source: "Orthodontic Journal",
        link: "https://example.com/clear-aligners",
        date: "2023-12-15",
      },
      {
        title: "New Approaches in Jaw Correction Surgery",
        summary: "A groundbreaking technique for jaw correction surgery has been developed, reducing recovery time by 50%.",
        source: "Dental Research Weekly",
        link: "https://example.com/jaw-correction",
        date: "2023-12-10",
      },
    ];
    setArticles(fetchedArticles);
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Latest News & Updates
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  {article.summary}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Source: {article.source} | Published: {article.date}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NewsSection;