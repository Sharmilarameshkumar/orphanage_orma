import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { Link } from 'react-router-dom'; // Import Link for navigation
import './AdminDashboard.css'; // Import CSS for styling

const AdminDashboard = ({ onLogout }) => {
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);

  const [totalVolunteers, setTotalVolunteers] = useState(0); // Add state for volunteers

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childrenCollection = collection(firestore, 'childrens'); // Firestore collection for children
        const staffCollection = collection(firestore, 'staffs'); // Firestore collection for staff
    
        const volunteersCollection = collection(firestore, 'volunteers'); // Firestore collection for volunteers

        // Fetching total number of children
        const childrenSnapshot = await getDocs(childrenCollection);
        setTotalChildren(childrenSnapshot.size); // Get the size of the collection

        // Fetching total number of staff
        const staffSnapshot = await getDocs(staffCollection);
        setTotalStaff(staffSnapshot.size); // Get the size of the collection

       

        // Fetching total number of volunteers
        const volunteersSnapshot = await getDocs(volunteersCollection);
        setTotalVolunteers(volunteersSnapshot.size); // Get the size of the collection
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>
     
      <section className="dashboard-overview">
        <h2>Overview</h2>
        <div className="statistics">
          <div className="stat-item">
            <h3>Total Children</h3>
            <p>{totalChildren}</p>
          </div>
          <div className="stat-item">
            <h3>Total Staff</h3>
            <p>{totalStaff}</p>
          </div>
          
          <div className="stat-item">
            <h3>Active Volunteers</h3>
            <p>{totalVolunteers}</p>
          </div>
        </div>
      </section>
      
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <Link to="/add-child"><button>Add New Child</button></Link>
        <Link to="/add-staff"><button>Add New Staff</button></Link>
        
      </section>
    </div>
  );
};

export default AdminDashboard;
