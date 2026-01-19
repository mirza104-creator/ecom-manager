'use client';

const mockProducts = [
  {
    id: 1,
    title: 'Men Cotton T-Shirt',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
  },
  {
    id: 2,
    title: 'Women Summer Dress',
    image:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
  },
  {
    id: 3,
    title: 'Sneakers',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },
];

export default function ShopifyPage() {
  function importProduct(product: any) {
    localStorage.setItem('imported_product', JSON.stringify(product));
    window.location.href = '/dashboard/photoshoot';
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Shopify Products</h1>
      <p style={{ color: '#666' }}>
        Select a product to generate photoshoot.
      </p>

      <div
        style={{
          marginTop: 30,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 20,
        }}
      >
        {mockProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #eee',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                borderRadius: 8,
                border: '1px solid #ddd',
              }}
            />

            <h3 style={{ marginTop: 10 }}>{product.title}</h3>

            <button
              onClick={() => importProduct(product)}
              style={{
                marginTop: 10,
                width: '100%',
                padding: 10,
                border: 'none',
                borderRadius: 6,
                background: '#000',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Import to Photoshoot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
