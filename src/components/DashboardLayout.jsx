import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-wrapper container">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;