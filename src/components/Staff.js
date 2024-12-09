// src/components/Staff.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './Staff.css';

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    console.log('Setting up Firestore listener...'); // Log listener setup
    const staffsCollectionRef = collection(firestore, 'staffs');

    const unsubscribe = onSnapshot(
      staffsCollectionRef,
      (snapshot) => {
        if (!snapshot.empty) {
          console.log('Snapshot received:', snapshot.docs); // Log snapshot contents

          const staffList = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log(`Staff member ${doc.id}:`, data); // Log each staff document
            return {
              id: doc.id,
              name: data.name || 'Name not available',
              age: data.age ? data.age.toString() : 'N/A',
              role: data.role || 'N/A',
              gender: data.gender || 'N/A',
            };
          });
          setStaffMembers(staffList);
        } else {
          console.log('No documents found in the "staffs" collection.');
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching staff data from Firestore:', error);
        setError('Failed to fetch staff data. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredStaff = staffMembers.filter((staff) => {
    const nameMatch = staff.name.toLowerCase().includes(searchTerm.toLowerCase());
    const genderMatch = filterGender === 'All' || staff.gender === filterGender;
    return nameMatch && genderMatch;
  });

  return (
    <div className="staff-container">
      <h1>Our Staff Members</h1>

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
      ) : filteredStaff.length > 0 ? (
        <div className="staff-list">
          {filteredStaff.map((staff) => (
            <div key={staff.id} className="staff-box">
              <h2 style={{ fontSize: '25px' }}>{staff.name}</h2>
              <p>Age: {staff.age}</p>
              <p>Role: {staff.role}</p>
              <p>Gender: {staff.gender}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No staff members found matching your criteria.</p>
      )}
    </div>
  );
};

export default Staff;
