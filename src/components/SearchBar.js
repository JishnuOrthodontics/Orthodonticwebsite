import React, { useState, useEffect } from "react";
import { TextField, Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import fetchUserRole from "./RoleFetcher"; // Import role fetching logic

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (term) => {
    if (!term) {
      setSearchResults([]); // Clear results if no search term
      return;
    }

    try {
      const userRole = await fetchUserRole();
      if (userRole !== "doctor") {
        throw new Error("Access denied: User is not a doctor.");
      }

      const q = query(
        collection(db, "articles"),
        where("keywords", "array-contains", term.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(results);
    } catch (err) {
      console.error("Error fetching search results:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Container maxWidth="lg">
      <TextField
        variant="outlined"
        placeholder="Search by keywords, topic, or author..."
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        style={{ marginBottom: "20px" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Grid container spacing={4}>
        {searchResults.map((result) => (
          <Grid item xs={12} md={6} key={result.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{result.title}</Typography>
                <Typography>{result.summary}</Typography>
                <Typography variant="caption">Source: {result.source}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SearchBar;