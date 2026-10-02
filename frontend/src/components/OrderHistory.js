import React from 'react';

function OrderHistory({ orders, onPayOrder }) {
  if (orders.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155'
        }}
      >
        <h2 style={{ marginBottom: '12px' }}>No Orders Found</h2>
        <p style={{ color: '#94a3b8' }}>
          You have not placed any orders yet. Explore our store to make your first purchase.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>My Order History</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.map((order) => (
          <div key={order._id} className="cart-items-card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #334155',
                paddingBottom: '14px',
                marginBottom: '16px'
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#06b6d4',
                    fontWeight: 700
                  }}
                >
                  Order #{order._id.slice(-8)}
                </span>
                <span style={{ margin: '0 8px', color: '#64748b' }}>|</span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span
                  className={`status-badge ${order.isPaid ? 'paid' : 'pending'}`}
                >
                  {order.isPaid ? 'PAID' : 'AWAITING PAYMENT'}
                </span>
                <span
                  className="status-badge"
                  style={{ background: '#334155', color: '#f8fafc' }}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Qty: {item.qty}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700 }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #334155'
              }}
            >
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                Delivering to: {order.shippingAddress.city},{' '}
                {order.shippingAddress.country}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Total: ${order.totalPrice.toFixed(2)}
                </div>

                {!order.isPaid && (
                  <button
                    className="btn-checkout"
                    style={{ margin: 0, padding: '8px 16px', fontSize: '0.85rem' }}
                    onClick={() => onPayOrder(order._id)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
