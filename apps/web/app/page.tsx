'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const email = localStorage.getItem('user_email');

    if (email) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }, []);

  return <p style={{ padding: 40 }}>Redirecting...</p>;
}
