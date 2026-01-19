'use client';

import { useEffect, useState } from 'react';

export default function AdHelperPage() {
  const [plan, setPlan] = useState('free');

  useEffect(() => {
    const p = localStorage.getItem('user_plan') || 'free';
    setPlan(p);
  }, []);

  if (plan !== 'growth' && plan !== 'pro') {
    return (
      <div>
        <h1>Ad Helper</h1>
        <div
          style={{
            marginTop: 20,
            padding: 24,
            borderRadius: 12,
            background: '#fffbea',
            border: '1px solid #eee',
          }}
        >
          <h3>Upgrade Required</h3>
          <p>
            Ad optimization is available on the{' '}
            <strong>Growth</strong> plan and above.
          </p>
          <button
            onClick={() => (window.location.href = '/pricing')}
            style={{
              marginTop: 12,
              padding: '10px 16px',
              background: '#000',
              color: '#fff',
              borderRadius: 6,
              border: 'none',
            }}
          >
            Upgrade to Growth
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Ad Helper</h1>
      <p>Ad optimization unlocked for your plan.</p>
    </div>
  );
}
