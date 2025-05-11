import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav({ onLogout }) {
  return (
    <nav className="nav-bar">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}
