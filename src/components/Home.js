// src/components/Home.js

import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling



const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="content">
        <section className="box mission-box">
          <h2>Our Mission</h2>
          <p>Our mission is to provide a safe, loving, and supportive environment for orphaned and vulnerable children. We aim to meet their physical, emotional, and educational needs while fostering their personal growth and development. Through community engagement, educational programs, and holistic care, we strive to empower every child to build a brighter future.</p>
        </section>
        <section className="box vision-box">
          <h2>Our Vision</h2>
          <p>To create a nurturing and empowering environment where every child, regardless of their background, can thrive, achieve their fullest potential, and grow into compassionate, responsible adults.</p>
        </section>
        
      </div>
    </div>
  );
};

export default Home;

