'use client';

import { useEffect, useState } from 'react';

const PLAN_LIMITS: any = {
  free: 1,
  starter: 20,
  growth: 100,
  pro: 9999,
};

export default function PhotoshootPage() {
  const [credits, setCredits] = useState(0);
  const [plan, setPlan] = useState('free');
  const [used, setUsed] = useState(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const p = localStorage.getItem('user_plan') || 'free';
    setPlan(p);

    const history = JSON.parse(
      localStorage.getItem('photoshoot_history') || '[]'
    );
    setUsed(history.length);

    const limit = PLAN_LIMITS[p];
    setCredits(limit - history.length);

    if (history.length >= limit) setBlocked(true);
  }, []);

  function upgrade() {
    window.location.href = '/pricing';
  }

  function generate() {
    if (blocked) return;

    const history = JSON.parse(
      localStorage.getItem('photoshoot_history') || '[]'
    );

    const item = {
      image_url: '/mock.jpg',
      model: 'female',
      background: 'studio',
      created_at: new Date().toISOString(),
    };

    const updated = [item, ...history];
    localStorage.setItem(
      'photoshoot_history',
      JSON.stringify(updated)
    );

    window.location.reload();
  }

  return (
    <div>
      <h1>Product Photoshoot</h1>

      <p>
        Plan: <strong>{plan.toUpperCase()}</strong>
      </p>
      <p>
        Credits Remaining:{' '}
        <strong>{credits < 0 ? 0 : credits}</strong>
      </p>

      {blocked && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 12,
            background: '#fff5f5',
            border: '1px solid #eee',
          }}
        >
          <h3>Action Blocked</h3>
          <p>
            Your manager recommends upgrading your plan to
            continue generating product visuals.
          </p>
          <button
            onClick={upgrade}
            style={{
              marginTop: 10,
              padding: '10px 16px',
              background: '#000',
              color: '#fff',
              borderRadius: 6,
              border: 'none',
            }}
          >
            Upgrade Plan
          </button>
        </div>
      )}

      {!blocked && (
        <button
          onClick={generate}
          style={{
            marginTop: 30,
            padding: '12px 24px',
            background: '#000',
            color: '#fff',
            borderRadius: 8,
            border: 'none',
          }}
        >
          Generate Photoshoot
        </button>
      )}
    </div>
  );
}
