import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBkJnEUA2PtY-9RUnifjvUEHmgBi8Zgdw",
  authDomain: "orthodonticwebsite.firebaseapp.com",
  projectId: "orthodonticwebsite",
  storageBucket: "orthodonticwebsite.firebasestorage.app",
  messagingSenderId: "209588416980",
  appId: "1:209588416980:web:87425e10a76a47460ba641"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { app, db }; // Export both app and db