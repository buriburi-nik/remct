import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Home from './components/Home/Home.jsx';
import Products from './components/Products/Products.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import Cart from './components/Cart/Cart.jsx';
import Wishlist from './components/Wishlist/Wishlist.jsx';
import Users from './components/user/Users.jsx';
import ContactUs from './components/Contact/ContactUs.jsx';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth on mount and on route change
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setAuthenticated(true);
      } catch {
        localStorage.removeItem('user');
      }
    } else {
      setUser(null);
      setAuthenticated(false);
    }
    setLoading(false);
  }, [location.pathname]);

  const handleLogin = () => {
    const stored = JSON.parse(localStorage.getItem('user'));
    setUser(stored);
    setAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAuthenticated(false);
    navigate('/');
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="loading"><p>Loading…</p></div>;
    }
    return authenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      {authenticated && <Nav onLogout={handleLogout} user={user} />}

      <Routes>
        <Route
          path="/"
          element={
            authenticated
              ? <Navigate to="/home" replace />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            authenticated
              ? <Navigate to="/home" replace />
              : <Signup onSignup={handleLogin} />
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            authenticated
              ? <Navigate to="/home" replace />
              : <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
}
