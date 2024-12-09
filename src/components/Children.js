// src/components/Children.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';  // Ensure this is the correct path
import { collection, getDocs } from 'firebase/firestore';  // Get documents from Firestore
import './Children.css';

const Children = () => {
  const [childrenMembers, setChildrenMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChildrenData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Reference to the 'childrens' collection in Firestore
        const childrensCollectionRef = collection(firestore, 'childrens');
        
        // Fetch the documents from Firestore
        const snapshot = await getDocs(childrensCollectionRef);

        // If the snapshot is not empty
        if (!snapshot.empty) {
          const childrenList = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || 'Name not available',
              age: data.age ? data.age.toString() : 'N/A',
              gender: data.gender || 'N/A',
            };
          });
          setChildrenMembers(childrenList);  // Update state with fetched data
        } else {
          console.log('No documents found in the "childrens" collection.');
        }
      } catch (error) {
        console.error('Error fetching children data from Firestore:', error);
        setError('Failed to fetch children data. Please try again later.');
      }

      setLoading(false);  // Set loading to false after fetching
    };

    fetchChildrenData();  // Fetch data when component mounts

  }, []);  // Empty dependency array ensures this effect runs only once

  // Filter children based on search and gender filter
  const filteredChildren = childrenMembers.filter((children) => {
    const nameMatch = children.name.toLowerCase().includes(searchTerm.toLowerCase());
    const genderMatch = filterGender === 'All' || children.gender === filterGender;
    return nameMatch && genderMatch;
  });

  return (
    <div className="children-container">
      <h1>Our Children Members</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Update search term on input change
        />
        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>  // Show loading message while data is being fetched
      ) : error ? (
        <p className="error-message">{error}</p>  // Show error message if fetching fails
      ) : filteredChildren.length > 0 ? (
        <div className="children-list">
          {filteredChildren.map((children) => (
            <div key={children.id} className="children-box">
              <h2 style={{ fontSize: '25px' }}>{children.name}</h2>
              <p>Age: {children.age}</p>
              <p>Gender: {children.gender}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No children members found matching your criteria.</p>
      )}
    </div>
  );
};

export default Children;
