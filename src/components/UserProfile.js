import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../AuthContext";

function UserProfile() {
  const { currentUser } = useAuth(); // Get the current logged-in user
  const [profile, setProfile] = useState({}); // Store user profile data
  const [editing, setEditing] = useState(false); // Toggle edit mode
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("No profile found!");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load your profile.");
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
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, profile);
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update your profile.");
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