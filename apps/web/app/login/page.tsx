'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  function handleLogin() {
    if (!email) {
      alert('Please enter email');
      return;
    }

    // Save login
    localStorage.setItem('user_email', email);

    // Redirect to dashboard
    window.location.href = '/dashboard';
  }

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginTop: 20,
          border: '1px solid #ccc',
          borderRadius: 6,
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop: 20,
          width: '100%',
          padding: 12,
          border: 'none',
          borderRadius: 6,
          background: '#000',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </div>
  );
}
