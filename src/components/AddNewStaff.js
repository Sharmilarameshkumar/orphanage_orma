// src/components/AddNewStaff.js
import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AddNewStaff.css'; 

const AddNewStaff = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'staffs'), {
        name,
        age: parseInt(age) || 0,
        role,
        gender,
      });
      alert('Staff added successfully!');
      setName('');
      setAge('');
      setRole('');
      setGender('');
    } catch (error) {
      console.error('Error adding staff: ', error);
    }
  };

  return (
    <div>
      <h2>Add New Staff</h2>
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
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default AddNewStaff;
