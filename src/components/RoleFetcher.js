import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config"; // Make sure firebase-config is correctly set up

const fetchUserRole = async () => {
  try {
    // Get the currently authenticated user
    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user found.");
      return null;
    }

    // Reference the user document in Firestore
    const userDocRef = doc(db, "users", user.uid); // Replace "users" with the correct collection name
    const userDoc = await getDoc(userDocRef);

    // Check if the user document exists and contains a role
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.role) {
        console.log(`User role: ${userData.role}`);
        return userData.role;
      } else {
        console.error("User role not found in Firestore document.");
        return null;
      }
    } else {
      console.error("User document not found in Firestore.");
      return null;
    }
  } catch (err) {
    console.error("Error fetching user role:", err.message);
    return null;
  }
};

export default fetchUserRole;