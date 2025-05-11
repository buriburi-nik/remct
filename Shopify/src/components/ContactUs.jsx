import React, { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="form-container">
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h2>Thank You!</h2>
            <p>We've received your message and will get back to you shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              disabled={isSubmitting}
            ></textarea>
            {errors.message && <div className="error">{errors.message}</div>}
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}