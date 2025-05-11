import React, { useState } from 'react';

export default function ContactUs() {
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (!msg.trim()) return;
    setOk(true);
  };
  if (ok) return <p style={{ padding: '20px' }}>Thank you for contacting us!</p>;
  return (
    <form onSubmit={submit} className="form-container">
      <h2>Contact Us</h2>
      <textarea rows={4} placeholder="Your message…" value={msg} onChange={e => setMsg(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
