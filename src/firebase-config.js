import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDBkJnEUA2PtY-9RUnifjvUEHmgBi8Zgdw",
  authDomain: "orthodonticwebsite.firebaseapp.com",
  projectId: "orthodonticwebsite",
  storageBucket: "orthodonticwebsite.firebasestorage.app",
  messagingSenderId: "209588416980",
  appId: "1:209588416980:web:87425e10a76a47460ba641"
};

const app = initializeApp(firebaseConfig);

export default app;