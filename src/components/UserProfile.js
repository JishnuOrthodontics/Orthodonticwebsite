import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Firebase configuration
import { useAuth } from "../AuthContext"; // Authentication context

function UserProfile() {
  const { currentUser } = useAuth(); // Get the current logged-in user
  const [profile, setProfile] = useState({}); // State for user profile data
  const [editing, setEditing] = useState(false); // Toggle edit mode
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log("Fetching profile for user ID:", currentUser?.uid);

        // Firestore document reference
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Profile data found:", docSnap.data());
          setProfile(docSnap.data());
        } else {
          console.log("No profile document found for this user.");
          setError("Profile not found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setError("Failed to load your profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Updating profile for user ID:", currentUser?.uid);

      // Firestore document reference
      const docRef = doc(db, "users", currentUser.uid);

      // Update or create the profile document
      await setDoc(docRef, profile, { merge: true });
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
      setError(`Failed to update your profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div>
      <h2>Your Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading your profile...</p>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div>
            {editing ? (
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button type="button" onClick={() => setEditing(true)}>
                Edit
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default UserProfile;