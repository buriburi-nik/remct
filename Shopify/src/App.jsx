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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on component mount and route changes
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setAuthenticated(true);
        } else {
          setUser(null);
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, [location.pathname]);

  const handleLogin = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
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
      {authenticated && <Nav onLogout={handleLogout} user={user} />}
      
      <Routes>
        <Route path="/" element={
          authenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
        } />
        
        <Route path="/signup" element={
          authenticated ? <Navigate to="/home" replace /> : <Signup onSignup={handleLogin} />
        } />

        <Route path="/home" element={
          <ProtectedRoute>
            <Home user={user} />
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