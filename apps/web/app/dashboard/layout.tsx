'use client';

import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (!email) window.location.href = '/login';
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: '#000', color: '#fff', padding: 20 }}>
        <h2 style={{ marginBottom: 30 }}>Ecom Manager</h2>

        <Nav href="/dashboard" label="Dashboard" />
        <Nav href="/dashboard/photoshoot" label="Photoshoot" />
        <Nav href="/dashboard/shopify" label="Shopify Products" />
        <Nav href="/dashboard/library" label="Asset Library" />
        <Nav href="/dashboard/ad-helper" label="Ad Helper" />
        <Nav href="/dashboard/store-health" label="Store Health" />
      </aside>

      <main style={{ flex: 1 }}>
        <div
          style={{
            padding: 20,
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <strong>Virtual Ecommerce Manager</strong>
          <button
            onClick={logout}
            style={{
              background: 'none',
              border: 'none',
              color: '#0070f3',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ padding: 30 }}>{children}</div>
      </main>
    </div>
  );
}

function Nav({ href, label }: { href: string; label: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <a href={href} style={{ color: '#fff', textDecoration: 'none' }}>
        {label}
      </a>
    </div>
  );
}
