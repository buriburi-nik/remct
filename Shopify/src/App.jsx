// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Users from './components/Users';
import ContactUs from './components/ContactUs';

export default function App() {
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setAuthed(true);
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = () => {
    setAuthed(true);
    navigate('/home');
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthed(false);
    navigate('/');
  };

  return (
    <>
      {authed && <Nav onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />

        {authed ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contact" element={<ContactUs />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </>
  );
}
