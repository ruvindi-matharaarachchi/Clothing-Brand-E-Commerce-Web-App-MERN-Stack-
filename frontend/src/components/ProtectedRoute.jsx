import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have it
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
          border: '1px solid #f5c6cb'
        }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Insufficient Permissions</h2>
          <p style={{ margin: '0 0 20px 0' }}>
            You don't have the required permissions to access this page.
            {requiredRole === 'admin' && ' Admin privileges are required.'}
          </p>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Go Back
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
