import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    if (form.email === stored.email && form.password === stored.password) {
      onLogin();
    } else {
      setErr('Wrong email or password');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}/>
        <button type="submit">Login</button>
        {err && <small className="error">{err}</small>}
      </form>
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
