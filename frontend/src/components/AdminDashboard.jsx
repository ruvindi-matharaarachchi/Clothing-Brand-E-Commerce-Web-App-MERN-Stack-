import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {/* Product Management Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Product Management</h3>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            Manage your product catalog, add new products, update existing ones, and handle inventory.
          </p>
          <Link to="/admin/products" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            Manage Products
          </Link>
        </div>

        {/* Order Management Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Order Management</h3>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            View and manage customer orders, track order status, and handle fulfillment.
          </p>
          <Link to="/admin/orders" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            Manage Orders
          </Link>
        </div>

        {/* User Management Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>User Management</h3>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            Manage user accounts, view user activity, and handle user-related issues.
          </p>
          <Link to="/admin/users" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            Manage Users
          </Link>
        </div>

        {/* Analytics Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Analytics</h3>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            View sales analytics, customer insights, and business performance metrics.
          </p>
          <Link to="/admin/analytics" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            View Analytics
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        marginTop: '40px',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Quick Stats</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>0</div>
            <div style={{ color: '#666' }}>Total Products</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>0</div>
            <div style={{ color: '#666' }}>Total Orders</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>0</div>
            <div style={{ color: '#666' }}>Total Users</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>$0</div>
            <div style={{ color: '#666' }}>Total Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
