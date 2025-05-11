import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!emailRegex.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Min 6 chars';
    if (form.confirm !== form.password) e.confirm = 'Must match password';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      }));
      onSignup();
      navigate('/home');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.confirm && <div className="error">{errors.confirm}</div>}
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="form-footer">
          Already have an account? <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
}