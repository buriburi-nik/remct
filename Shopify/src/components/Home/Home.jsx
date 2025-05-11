import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ user }) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats data
    const fetchStats = async () => {
      setLoading(true);
      
      try {
        // Fetch total products count
        const productsRes = await fetch('https://fakestoreapi.com/products');
        const products = await productsRes.json();
        
        // Fetch total users count
        const usersRes = await fetch('https://fakestoreapi.com/users');
        const users = await usersRes.json();
        
        // Get recent products (last 4)
        const recentProducts = products
          .sort((a, b) => b.id - a.id)
          .slice(0, 4);
        
        setStats({
          totalProducts: products.length,
          totalUsers: users.length,
          recentProducts
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // Format time for greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get current date in readable format
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>{getGreeting()}, {user?.name || 'User'}!</h1>
          <p className="date">{getCurrentDate()}</p>
        </div>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(92, 106, 196, 0.1)', color: '#5c6ac4' }}>
            <i className="material-icon">📦</i>
          </div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <div className="stat-value">{stats.totalProducts}</div>
            <Link to="/products" className="stat-link">View all products</Link>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(66, 153, 225, 0.1)', color: '#4299e1' }}>
            <i className="material-icon">👥</i>
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <div className="stat-value">{stats.totalUsers}</div>
            <Link to="/users" className="stat-link">Manage users</Link>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(72, 187, 120, 0.1)', color: '#48bb78' }}>
            <i className="material-icon">📊</i>
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <div className="stat-value">124</div>
            <a href="#" className="stat-link">View order history</a>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(237, 100, 166, 0.1)', color: '#ed64a6' }}>
            <i className="material-icon">💬</i>
          </div>
          <div className="stat-info">
            <h3>Support Tickets</h3>
            <div className="stat-value">3</div>
            <Link to="/contact" className="stat-link">Contact support</Link>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="section recent-products">
          <div className="section-header">
            <h2>Recent Products</h2>
            <Link to="/products" className="view-all">View All</Link>
          </div>
          
          <div className="products-grid-mini">
            {stats.recentProducts.map(product => (
              <Link to={`/products/${product.id}`} key={product.id} className="product-card-mini">
                <div className="product-image-mini">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info-mini">
                  <div className="product-title-mini">{product.title}</div>
                  <div className="product-price-mini">${product.price.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="section quick-actions">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          
          <div className="quick-actions-grid">
            <Link to="/products" className="action-card">
              <div className="action-icon">🔍</div>
              <div className="action-title">Browse Products</div>
            </Link>
            
            <Link to="/users" className="action-card">
              <div className="action-icon">👥</div>
              <div className="action-title">View Users</div>
            </Link>
            
            <Link to="/contact" className="action-card">
              <div className="action-icon">✉️</div>
              <div className="action-title">Contact Support</div>
            </Link>
            
            <div className="action-card">
              <div className="action-icon">⚙️</div>
              <div className="action-title">Settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}