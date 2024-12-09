// src/firebaseService.js
import { firestore } from './firebase'; // Ensure you have the correct import for Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Import required Firestore methods

// Function to submit volunteer form data to Firestore
export const submitVolunteerForm = async (formData) => {
  try {
    // Reference to the "volunteers" collection
    const docRef = await addDoc(collection(firestore, 'volunteers'), formData); // Add a new document with formData
    
    console.log('Document written with ID: ', docRef.id); // Log the document ID for reference
  } catch (error) {
    console.error('Error adding document: ', error); // Log any errors during the document submission
    throw error; // Rethrow the error to be handled by the form component
  }
};
