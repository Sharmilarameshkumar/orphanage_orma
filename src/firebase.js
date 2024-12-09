// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyEL-xANUXqBexjXQk40DyRLZHoVi_RaA",
  authDomain: "orphanage-87bbd.firebaseapp.com",
  projectId: "orphanage-87bbd",
  storageBucket: "orphanage-87bbd.appspot.com",
  messagingSenderId: "358338319214",
  appId: "1:358338319214:web:6dc0822da85822b78e677f",
  measurementId: "G-4QXK0SZYC6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);
export { firestore };

