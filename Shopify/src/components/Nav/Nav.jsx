import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav({ onLogout, user }) {
  const userData = user || {};

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-brand">Shopify</div>
        <div className="nav-links">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
            Cart
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active' : ''}>
            Wishlist
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>
            Users
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </div>
        <div className="user-actions">
          <span style={{ color: 'white', marginRight: '1rem' }}>
            {userData.name || 'User'}
          </span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
