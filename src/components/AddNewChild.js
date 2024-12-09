// src/components/AddNewStaff.js
import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AddNewChildren.css'; 
const AddNewChildren = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
 
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'childrens'), {
        name,
        age: parseInt(age) || 0,
       
        gender,
      });
      alert('Children added successfully!');
      setName('');
      setAge('');
     
      setGender('');
    } catch (error) {
      console.error('Error adding children: ', error);
    }
  };

  return (
    <div>
      <h2>Add New Children</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
       
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Children</button>
      </form>
    </div>
  );
};

export default AddNewChildren;
