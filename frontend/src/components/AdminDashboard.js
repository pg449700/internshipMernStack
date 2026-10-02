import React, { useState } from 'react';

function AdminDashboard({
  products,
  orders,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) {
  const [activeTab, setActiveTab] = useState('products');
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Laptops');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const totalRevenue = orders
    .filter((o) => o.isPaid)
    .reduce((acc, o) => acc + o.totalPrice, 0);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    await onAddProduct({
      name,
      sku,
      brand,
      category,
      price: Number(price),
      countInStock: Number(countInStock),
      description,
      imageUrl
    });

    setName('');
    setSku('');
    setBrand('');
    setPrice('');
    setCountInStock('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2>Administrator Control Center</h2>
        <p style={{ color: '#94a3b8' }}>
          Real-time catalog oversight, inventory replenishment, and customer order fulfillment.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}
      >
        <div className="cart-items-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Catalog Products
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px' }}>
            {products.length}
          </div>
        </div>

        <div className="cart-items-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Total Inventory Units
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#06b6d4' }}>
            {products.reduce((acc, p) => acc + p.countInStock, 0)}
          </div>
        </div>

        <div className="cart-items-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Total Customer Orders
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#6366f1' }}>
            {orders.length}
          </div>
        </div>

        <div className="cart-items-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Realized Revenue
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#10b981' }}>
            ${totalRevenue.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="auth-tabs" style={{ marginBottom: '24px' }}>
        <button
          className={`auth-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Catalog Products ({products.length})
        </button>
        <button
          className={`auth-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Manage Customer Orders ({orders.length})
        </button>
        <button
          className={`auth-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          + Add New Hardware Item
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="cart-items-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id || prod.sku}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    {prod.sku}
                  </td>
                  <td style={{ fontWeight: 600 }}>{prod.name}</td>
                  <td>{prod.category}</td>
                  <td style={{ fontWeight: 700 }}>${prod.price.toFixed(2)}</td>
                  <td>
                    <span
                      style={{
                        color: prod.countInStock > 5 ? '#10b981' : '#f43f5e',
                        fontWeight: 700
                      }}
                    >
                      {prod.countInStock}
                    </span>
                  </td>
                  <td>
                    <button
                      style={{
                        background: 'rgba(244, 63, 94, 0.1)',
                        color: '#f43f5e',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}
                      onClick={() => onDeleteProduct(prod._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="cart-items-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord._id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    {ord._id.slice(-8)}
                  </td>
                  <td>{ord.user ? ord.user.name : 'Registered Customer'}</td>
                  <td style={{ fontWeight: 700 }}>${ord.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${ord.isPaid ? 'paid' : 'pending'}`}>
                      {ord.isPaid ? 'PAID' : 'UNPAID'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{ord.status}</span>
                  </td>
                  <td>
                    {ord.status !== 'Delivered' && (
                      <button
                        className="btn-nav"
                        style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                        onClick={() => onUpdateOrderStatus(ord._id, 'Delivered')}
                      >
                        Set Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="cart-items-card" style={{ maxWidth: '700px' }}>
          <form onSubmit={handleProductSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px'
              }}
            >
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Studio Display 27"
                />
              </div>
              <div className="form-group">
                <label>Unique SKU</label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. MON-APX-27"
                />
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px'
              }}
            >
              <div className="form-group">
                <label>Manufacturer Brand</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Apex"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Laptops">Laptops</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Audio">Audio</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px'
              }}
            >
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Initial Stock Count</label>
                <input
                  type="number"
                  required
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Technical Description</label>
              <textarea
                rows="3"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Full technical specifications..."
              ></textarea>
            </div>

            <button type="submit" className="btn-checkout" style={{ width: '100%' }}>
              Add Product to Catalog
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
