'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [plan, setPlan] = useState('free');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const p = localStorage.getItem('user_plan') || 'free';
    setPlan(p);
    setEmail(localStorage.getItem('user_email'));
  }, []);

  function changePlan(newPlan: string) {
    localStorage.setItem('user_plan', newPlan);
    setPlan(newPlan);
    window.location.reload();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: '#666' }}>
        Welcome back{email ? `, ${email}` : ''}
      </p>

      {/* DEV PLAN SWITCHER */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 10,
          border: '1px solid #eee',
          background: '#fafafa',
        }}
      >
        <strong>Current Plan:</strong> {plan.toUpperCase()}
        <div style={{ marginTop: 10 }}>
          {['free', 'starter', 'growth', 'pro'].map((p) => (
            <button
              key={p}
              onClick={() => changePlan(p)}
              style={{
                marginRight: 10,
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #ddd',
                cursor: 'pointer',
                background: plan === p ? '#000' : '#fff',
                color: plan === p ? '#fff' : '#000',
              }}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
        <p style={{ marginTop: 8, fontSize: 12, color: '#777' }}>
          (Dev mode only — remove before production)
        </p>
      </div>

      {/* NEXT STEPS */}
      <div style={{ marginTop: 40 }}>
        <h2>Manager Summary</h2>
        <p>Your virtual ecommerce manager is monitoring your store.</p>
      </div>
    </div>
  );
}
