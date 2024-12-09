// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // Ensure you're importing the correct CSS file
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <ul className="navbar-list">
        <li><NavLink exact to="/" activeClassName="active-link">Home</NavLink></li>
        <li><NavLink to="/children" activeClassName="active-link">Children</NavLink></li>
        <li><NavLink to="/staff" activeClassName="active-link">Staff</NavLink></li>
        <li><NavLink to="/donations" activeClassName="active-link">Donations</NavLink></li>
        <li><NavLink to="/volunteerForm" activeClassName="active-link">Volunteer</NavLink></li>
        <li><NavLink to="/adminlogin" activeClassName="active-link">Admin Login</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
