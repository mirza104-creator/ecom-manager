'use client';

const plans = [
  {
    name: 'Starter',
    price: '$19',
    credits: 20,
    description: 'Perfect for small sellers',
  },
  {
    name: 'Growth',
    price: '$49',
    credits: 80,
    description: 'For growing D2C brands',
  },
  {
    name: 'Scale',
    price: '$99',
    credits: 200,
    description: 'For agencies & power sellers',
  },
];

export default function PricingPage() {
  function buyPlan(credits: number) {
    localStorage.setItem('credits', String(credits));
    alert('Credits added successfully!');
    window.location.href = '/dashboard';
  }

  return (
    <div style={{ padding: 60 }}>
      <h1>Pricing</h1>
      <p style={{ color: '#666', marginTop: 6 }}>
        Simple pricing. Pay for outcomes, not tools.
      </p>

      <div
        style={{
          marginTop: 40,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 30,
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              padding: 30,
              borderRadius: 14,
              border: '1px solid #eee',
              background: '#fff',
            }}
          >
            <h2>{plan.name}</h2>
            <div style={{ fontSize: 28, fontWeight: 'bold', marginTop: 10 }}>
              {plan.price}
            </div>
            <p style={{ marginTop: 6 }}>{plan.credits} credits</p>
            <p style={{ color: '#666', marginTop: 10 }}>
              {plan.description}
            </p>

            <button
              onClick={() => buyPlan(plan.credits)}
              style={{
                marginTop: 20,
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: 'none',
                background: '#000',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
