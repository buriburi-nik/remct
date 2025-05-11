import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

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
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    localStorage.setItem('user', JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password
    }));
    onSignup();
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        {['name','email','password','confirm'].map(key => (
          <div key={key}>
            <input
              name={key}
              type={key.includes('password') ? 'password' : 'text'}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={form[key]}
              onChange={handleChange}
            />
            {errors[key] && <small className="error">{errors[key]}</small>}
          </div>
        ))}
        <button type="submit">Sign Up</button>
        <p>No account? <Link to="/">Login here</Link></p>
      </form>
    </div>
  );
}
