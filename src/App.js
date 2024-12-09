// src/App.js

import React, { useState } from 'react'; // Import useState for managing admin state
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Regular Navbar
import Header from './components/Header'; 
import Home from './components/Home';
import Children from './components/Children';
import Staff from './components/Staff';
import Donations from './components/Donations';
import VolunteerForm from './components/VolunteerForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard'; // Admin Dashboard
import AddNewChild from './components/AddNewChild';
import AddNewStaff from './components/AddNewStaff';
import RecordDonation from './components/RecordDonation';

// Layout component that dynamically renders either Navbar or AdminNavbar
const AppLayout = ({ children, isAdmin, onLogout }) => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/adminlogin'; // Check if it's the Admin Login route

  return (
    <div>
      <Header />
      {/* Render AdminNavbar if the user is an admin and not on the login route */}
      {!isLoginRoute && isAdmin ? <AdminDashboard onLogout={onLogout} /> : <Navbar />}
      {children}
    </div>
  );
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // State to manage admin login status

  const handleLogout = () => {
    setIsAdmin(false); // Reset admin status
    alert('Logged out successfully');
  };

  return (
    <Router>
      <AppLayout isAdmin={isAdmin} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/children" element={<Children />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/volunteerForm" element={<VolunteerForm />} />
          <Route path="/adminlogin" element={<AdminLogin setIsAdmin={setIsAdmin} />} /> {/* Pass setIsAdmin to AdminLogin */}

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
          <Route path="/add-child" element={<AddNewChild />} /> {/* Replace with your actual AddNewChild component */}
          <Route path="/add-staff" element={<AddNewStaff />} /> {/* Replace with your actual AddNewStaff component */}
          <Route path="/record-donation" element={<RecordDonation />} /> {/* Replace with your actual RecordDonation component */}
       
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
