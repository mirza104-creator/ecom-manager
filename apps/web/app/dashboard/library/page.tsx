'use client';

import { useEffect, useState } from 'react';

type HistoryItem = {
  image_url: string;
  model: string;
  background: string;
  created_at: string;
};

export default function LibraryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('photoshoot_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>Asset Library</h1>
      <p style={{ color: '#666' }}>
        All generated product visuals are stored here.
      </p>

      {history.length === 0 && (
        <p style={{ marginTop: 30 }}>
          No photoshoots yet. Generate your first one.
        </p>
      )}

      <div
        style={{
          marginTop: 30,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 20,
        }}
      >
        {history.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #eee',
              borderRadius: 12,
              padding: 16,
              background: '#fff',
            }}
          >
            <div
              style={{
                height: 160,
                borderRadius: 8,
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: 14,
              }}
            >
              Image Preview
            </div>

            <div style={{ marginTop: 10 }}>
              <strong>Model:</strong> {item.model}
            </div>
            <div>
              <strong>Background:</strong> {item.background}
            </div>
            <div style={{ fontSize: 12, color: '#777', marginTop: 6 }}>
              {new Date(item.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
