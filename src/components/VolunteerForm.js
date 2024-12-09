import React, { useState } from 'react';
import './VolunteerForm.css'; 
import { submitVolunteerForm } from '../firebaseService'; 

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState(''); // State to store form status (success or error)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('');
    try {
      await submitVolunteerForm(formData); // Send form data to Firestore
      setFormStatus('Form submitted successfully!');
      setFormData({ name: '', email: '', age: '', phone: '', message: '' }); // Clear the form
    } catch (error) {
      setFormStatus('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className="volunteer-form-container">
      <h2>Volunteer Registration</h2>
      {formStatus && <p className="form-status">{formStatus}</p>}
      <form onSubmit={handleSubmit} className="volunteer-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
