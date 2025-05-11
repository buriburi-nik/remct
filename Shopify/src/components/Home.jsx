import React from 'react';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Use the menu above to navigate the app.</p>
    </div>
  );
}
