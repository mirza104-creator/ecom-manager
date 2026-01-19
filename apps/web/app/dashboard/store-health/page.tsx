'use client';

import { useEffect, useState } from 'react';

type Issue = {
  level: 'critical' | 'warning' | 'good';
  title: string;
  message: string;
  action?: string;
  actionUrl?: string;
};

export default function StoreHealthPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem('photoshoot_history') || '[]'
    );
    const credits = Number(localStorage.getItem('credits') || 0);

    const detectedIssues = generateIssues(history.length, credits);
    setIssues(detectedIssues);

    const calculatedScore = calculateScore(detectedIssues);
    setScore(calculatedScore);
  }, []);

  return (
    <div>
      <h1>Store Health</h1>
      <p style={{ color: '#666' }}>
        Automated audit of your ecommerce store performance.
      </p>

      {/* Health Score */}
      <div
        style={{
          marginTop: 30,
          padding: 30,
          borderRadius: 16,
          background: score >= 80 ? '#f0fff4' : '#fff5f5',
          border: '1px solid #eee',
        }}
      >
        <h2>Health Score</h2>
        <div style={{ fontSize: 48, fontWeight: 'bold' }}>{score}/100</div>
        <p style={{ marginTop: 6, color: '#555' }}>
          Based on visuals, readiness, and growth signals.
        </p>
      </div>

      {/* Issues */}
      <h2 style={{ marginTop: 50 }}>Manager Findings</h2>

      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {issues.map((issue, index) => (
          <IssueCard key={index} issue={issue} />
        ))}
      </div>
    </div>
  );
}

/* ---------- LOGIC ---------- */

function generateIssues(
  photoshoots: number,
  credits: number
): Issue[] {
  const issues: Issue[] = [];

  if (photoshoots < 3) {
    issues.push({
      level: 'critical',
      title: 'Low Product Visual Quality',
      message:
        'Products with fewer images struggle to convert visitors into buyers.',
      action: 'Generate Photoshoots',
      actionUrl: '/dashboard/photoshoot',
    });
  } else {
    issues.push({
      level: 'good',
      title: 'Product Visuals',
      message: 'Your product imagery meets conversion standards.',
    });
  }

  if (credits <= 0) {
    issues.push({
      level: 'warning',
      title: 'No Remaining Credits',
      message:
        'You are blocked from improving visuals until credits are refilled.',
      action: 'Upgrade Plan',
      actionUrl: '/pricing',
    });
  }

  issues.push({
    level: 'warning',
    title: 'Ad Performance Opportunity',
    message:
      'Your store is not actively running optimized ads using your visuals.',
    action: 'Open Ad Helper',
    actionUrl: '/dashboard/ad-helper',
  });

  issues.push({
    level: 'info',
    title: 'Speed & Mobile Readiness',
    message:
      'Your store appears mobile-ready, but performance optimization is recommended.',
  });

  return issues;
}

function calculateScore(issues: Issue[]) {
  let score = 100;

  issues.forEach((i) => {
    if (i.level === 'critical') score -= 30;
    if (i.level === 'warning') score -= 15;
  });

  return Math.max(score, 40);
}

/* ---------- UI ---------- */

function IssueCard({ issue }: { issue: Issue }) {
  const colors = {
    critical: '#fff5f5',
    warning: '#fffbea',
    good: '#f0fff4',
    info: '#f5f7ff',
  };

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 14,
        background: colors[issue.level],
        border: '1px solid #eee',
      }}
    >
      <h3>{issue.title}</h3>
      <p style={{ marginTop: 8, color: '#555' }}>{issue.message}</p>

      {issue.action && (
        <button
          onClick={() =>
            issue.actionUrl &&
            (window.location.href = issue.actionUrl)
          }
          style={{
            marginTop: 14,
            padding: '8px 14px',
            borderRadius: 6,
            border: 'none',
            background: '#000',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {issue.action}
        </button>
      )}
    </div>
  );
}
