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
  Tooltip,
} from "@mui/material";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function DealerPortal() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [productForm, setProductForm] = useState({ name: "", description: "", price: "", imageUrl: "", stock: "In Stock" }); // Added stock field
  const [submitting, setSubmitting] = useState(false);

  // Fetch dealer-specific materials
  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      setError("");
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User is not authenticated.");
        }

        const q = query(collection(db, "materials"), where("dealerId", "==", user.uid));
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
      if (!productForm.name || !productForm.description || !productForm.price) {
        throw new Error("Please fill in all required fields.");
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated.");
      }

      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        dealerId: user.uid,
        submissionDate: Timestamp.now(),
      };

      await addDoc(collection(db, "materials"), productData);
      alert("Product added successfully!");
      setMaterials((prev) => [...prev, productData]);
      setProductForm({ name: "", description: "", price: "", imageUrl: "", stock: "In Stock" }); // Reset form
    } catch (err) {
      console.error("Error adding product:", err.message);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Edit Material
  const handleEdit = async (materialId, updatedFields) => {
    try {
      const materialRef = doc(db, "materials", materialId);
      await updateDoc(materialRef, updatedFields);
      alert("Material updated successfully!");
      setMaterials((prev) =>
        prev.map((material) =>
          material.id === materialId ? { ...material, ...updatedFields } : material
        )
      );
    } catch (err) {
      console.error("Error updating material:", err.message);
      setError(err.message);
    }
  };

  // Handle Delete Material
  const handleDelete = async (materialId) => {
    try {
      const materialRef = doc(db, "materials", materialId);
      await deleteDoc(materialRef);
      alert("Material deleted successfully!");
      setMaterials((prev) => prev.filter((material) => material.id !== materialId));
    } catch (err) {
      console.error("Error deleting material:", err.message);
      setError(err.message);
    }
  };

  // Filter materials based on search query
  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dealer Portal
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage your dental/orthodontic materials here.
      </Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

      {/* Search Bar */}
      <TextField
        label="Search Materials"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by material name..."
      />

      {/* Form to Add New Material */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Add New Material
        </Typography>
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
            <TextField
              label="Stock Status"
              variant="outlined"
              fullWidth
              name="stock"
              value={productForm.stock}
              onChange={handleChange}
              required
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
      ) : filteredMaterials.length > 0 ? (
        <Grid container spacing={4}>
          {filteredMaterials.map((material) => (
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
                  <Typography variant="body2">Stock: {material.stock}</Typography>
                  <Tooltip title="Edit Material">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(material.id, { stock: "Out of Stock" })} // Example edit
                    >
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Material">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(material.id)}
                    >
                      Delete
                    </Button>
                  </Tooltip>
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