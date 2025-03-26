import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const firebaseConfig = {
  apiKey: "AIzaSyDBkJnEUA2PtY-9RUnifjvUEHmgBi8Zgdw",
  authDomain: "orthodonticwebsite.firebaseapp.com",
  projectId: "orthodonticwebsite",
  storageBucket: "orthodonticwebsite.firebasestorage.app",
  messagingSenderId: "209588416980",
  appId: "1:209588416980:web:87425e10a76a47460ba641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

// Export Firebase services
export { app, db, auth };