// src/components/RecordDonation.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; // Ensure this path is correct
import { collection, onSnapshot } from 'firebase/firestore';
import './RecordDonation.css'; // Make sure this file exists in the correct path

const RecordDonation = () => {  // Changed 'Staff' to 'RecordDonation'
  const [recordDonationMembers, setRecordDonationMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    console.log('Setting up Firestore listener...'); // Log listener setup
    const donationsCollectionRef = collection(firestore, 'donations');

    const unsubscribe = onSnapshot(
      donationsCollectionRef,
      (snapshot) => {
        if (!snapshot.empty) {
          console.log('Snapshot received:', snapshot.docs); // Log snapshot contents

          const recordDonationList = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log(`RecordDonation member ${doc.id}:`, data); // Log each record donation document
            return {
              id: doc.id,
              name: data.name || 'Name not available',
              age: data.age ? data.age.toString() : 'N/A',
              amount: data.amount ? data.amount.toString() : 'N/A',
              gender: data.gender || 'N/A',
              address: data.address || 'N/A',
              phoneno: data.phoneno ? data.phoneno.toString() : 'N/A',
            };
          });
          setRecordDonationMembers(recordDonationList);
        } else {
          console.log('No documents found in the "donations" collection.');
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching record donation data from Firestore:', error);
        setError('Failed to fetch record donation data. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredRecordDonation = recordDonationMembers.filter((recordDonation) => {
    const nameMatch = recordDonation.name.toLowerCase().includes(searchTerm.toLowerCase());
    const genderMatch = filterGender === 'All' || recordDonation.gender === filterGender;
    return nameMatch && genderMatch;
  });

  return (
    <div className="recorddonation-container">
      <h1>Our Record Donation Members</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredRecordDonation.length > 0 ? (
        <div className="recorddonation-list">
          {filteredRecordDonation.map((recordDonation) => (
            <div key={recordDonation.id} className="recorddonation-box">
              <h2 style={{ fontSize: '25px' }}>{recordDonation.name}</h2>
              <p>Age: {recordDonation.age}</p>
              <p>Amount: {recordDonation.amount}</p>
              <p>Gender: {recordDonation.gender}</p>
              <p>Address: {recordDonation.address}</p>
              <p>PhoneNo: {recordDonation.phoneno}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No record donation members found matching your criteria.</p>
      )}
    </div>
  );
};

export default RecordDonation;  // Make sure it matches the component name
