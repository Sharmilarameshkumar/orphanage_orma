import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import './Donations.css'; // Import CSS for styling

const Donors = () => {
  const [donors, setDonors] = useState([]); // State to store donor data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error state
      try {
        console.log("Fetching data from Firestore...");
        const donorsCollection = collection(firestore, 'donations'); // Ensure 'donors' is the correct collection name
        const snapshot = await getDocs(donorsCollection);
        
        if (snapshot.empty) {
          console.log("No matching documents found.");
          return;
        }

        const donorList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched data:", donorList);
        setDonors(donorList); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        setError('Failed to fetch data. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="donors-container">
      <h1>Our Generous Donors</h1>
      

      {loading ? (
        <p>Loading...</p> // Display loading message
      ) : error ? (
        <p className="error-message">{error}</p> // Display error message
      ) : (
        <ul className="donors-list">
          {donors.map((donor) => (
            <li key={donor.id} className="donor-item">
              
              <div className="donor-info">
              <h2 style={{ fontSize: '25px' }}>{donor.Name}</h2>
      
                <p><strong>Gender:</strong> {donor.Gender}</p>
                <p><strong>Age:</strong> {donor.Age}</p>
                <p><strong>Amount:</strong> {donor.Amount || 'N/A'}</p>
                
                
               
                <p><strong>Address:</strong> {donor.Address}</p>
                <p><strong>Phone:</strong> <a href={`tel:${donor.PhoneNo}`}>{donor.PhoneNo}</a></p>
                
          
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default Donors;
