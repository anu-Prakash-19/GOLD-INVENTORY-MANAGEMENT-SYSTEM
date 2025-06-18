import React from 'react';
import { Link } from 'react-router-dom';
import GoldImage from '../../assets/gold.png';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="main-container">
      {/* Sidebar Section */}
      <div className="dash-container">
        <div className="top-contain">
         
          <Link to="/dashboard">
      <img 
        src={GoldImage} 
        alt="Clickable image"
        style={{ cursor: 'pointer' }}
      />
    </Link>
          <h2>Softmusk Info Pvt Ltd</h2>
        </div>
        <hr />
        <div className="modules-container">
          {[ 
            { icon: 'fa-house', label: 'Home', path: '/dashboard/home' },
            { icon: 'fa-user-tie', label: 'MasterEntry', path: '/dashboard/connections' },
            { icon: 'fa-warehouse', label: 'Inventory', path: '/dashboard/inventory' },
            { icon: 'fa-business-time', label: 'Accounts', path: '/dashboard/accounts' },
            { icon: 'fa-person', label: 'Reports', path: '/dashboard/reports' },
          ].map((module, index) => (
            <div className="module" key={index}>
              <i className={`fa-solid ${module.icon}`}></i>
              <Link to={module.path}>{module.label}</Link>
            </div>
          ))}
        </div>
        <div>
          <hr />
          <p className='name'>Copyright © 2025</p>

          <p className='tag'>Softmusk Info Private Limited.</p>
          <p className='name'>  All rights reserved</p>
       
        </div>
      </div>
          
    </div>
    
  );
};

export default Dashboard;
