import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Users from './components/Users';
import ContactUs from './components/ContactUs';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on component mount and route changes
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setAuthenticated(!!user);
      setLoading(false);
    };

    checkAuth();
  }, [location]);

  const handleLogin = () => {
    setAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthenticated(false);
    navigate('/');
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }
    
    return authenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      {authenticated && <Nav onLogout={handleLogout} />}
      
      <Routes>
        <Route path="/" element={
          authenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
        } />
        
        <Route path="/signup" element={
          authenticated ? <Navigate to="/home" replace /> : <Signup onSignup={handleLogin} />
        } />

        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        
        <Route path="/products/:id" element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
        
        <Route path="/contact" element={
          <ProtectedRoute>
            <ContactUs />
          </ProtectedRoute>
        } />
        
        {/* Catch all route - redirects to home if authenticated, login if not */}
        <Route path="*" element={
          authenticated 
            ? <Navigate to="/home" replace /> 
            : <Navigate to="/" replace />
        } />
      </Routes>
    </>
  );
}