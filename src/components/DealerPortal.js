import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function DealerPortal() {
  const [materials, setMaterials] = useState([]); // Store materials
  const [loading, setLoading] = useState(false); // Loading state for fetching materials
  const [error, setError] = useState(""); // Error state for fetching materials
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  }); // State for the material submission form
  const [submitting, setSubmitting] = useState(false); // Submission loading state

  // Fetch dealer-specific materials from Firestore
  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      setError("");
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User is not authenticated.");
        }

        // Query materials belonging to the logged-in dealer
        const q = query(
          collection(db, "materials"),
          where("dealerId", "==", user.uid) // Fetch materials by dealerId
        );
        const querySnapshot = await getDocs(q);
        const fetchedMaterials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(fetchedMaterials);
      } catch (err) {
        console.error("Error fetching materials:", err.message);
        setError("Failed to load materials. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  // Handle product submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Validate basic fields (name, description, price)
      if (!productForm.name || !productForm.description || !productForm.price) {
        throw new Error("Please fill in all required fields.");
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated.");
      }

      // Create product data object
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price), // Ensure price is a number
        dealerId: user.uid, // Associate material with the logged-in dealer
        submissionDate: Timestamp.now(),
      };

      // Add the product to Firestore "materials" collection
      await addDoc(collection(db, "materials"), productData);
      alert("Product added successfully!");

      // Update local state with the new product
      setMaterials((prev) => [...prev, productData]);
      setProductForm({ name: "", description: "", price: "", imageUrl: "" }); // Reset form
    } catch (err) {
      console.error("Error adding product:", err.message);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dealer Portal
      </Typography>
      <Typography variant="body1" gutterBottom>
        List your dental/orthodontic materials here to reach doctors worldwide.
      </Typography>

      {/* Form to Add New Material */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Add New Material
        </Typography>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              name="name"
              value={productForm.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={productForm.price}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              name="description"
              value={productForm.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              name="imageUrl"
              value={productForm.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display Materials */}
      <Typography variant="h5" gutterBottom>
        Your Listed Materials
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body2" color="error">{error}</Typography>
      ) : materials.length > 0 ? (
        <Grid container spacing={4}>
          {materials.map((material) => (
            <Grid item xs={12} sm={6} md={4} key={material.id}>
              <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                {material.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={material.imageUrl}
                    alt={material.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{material.name}</Typography>
                  <Typography variant="body2">{material.description}</Typography>
                  <Typography variant="subtitle2">Price: ${material.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No materials listed yet.</Typography>
      )}
    </Container>
  );
}

export default DealerPortal;