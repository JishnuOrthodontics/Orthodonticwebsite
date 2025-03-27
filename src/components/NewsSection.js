import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

function NewsSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error messages

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(""); // Clear any previous errors

      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Error fetching articles:", err.message);
        setError("Failed to load articles. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchArticles();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Latest News</h2>

      {/* Display loading state */}
      {loading && <p>Loading articles...</p>}

      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display articles if loading is complete and no error */}
      {!loading && !error && articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
            <p><strong>Title:</strong> {article.title}</p>
            <p><strong>Summary:</strong> {article.summary}</p>
            <p><strong>Source:</strong> {article.source}</p>
          </div>
        ))
      ) : (
        !loading && !error && <p>No articles available.</p>
      )}
    </div>
  );
}

export default NewsSection;