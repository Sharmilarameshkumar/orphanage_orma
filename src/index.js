import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  // Temporarily comment out StrictMode to see if it resolves the issue
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// Measure app performance (optional)
reportWebVitals(console.log);

