import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard'; // Import the sidebar component
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <Dashboard /> {/* Fixed sidebar */}
      <div className="main-content">
        <Outlet /> {/* This will render the nested routes (Home, Connections, etc.) */}
      </div>
    </div>
  );
};

export default Layout;