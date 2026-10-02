import React from 'react';

function Cart({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  onContinueShopping
}) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const tax = Number((subtotal * 0.1).toFixed(2));
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = Number((subtotal + tax + shipping).toFixed(2));

  if (cartItems.length === 0) {
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
        <h2 style={{ marginBottom: '12px' }}>Your Shopping Cart is Empty</h2>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
          Explore our collection of laptops, audio hardware, and engineering gear.
        </p>
        <button
          className="btn-add-cart"
          style={{ width: 'auto', padding: '12px 28px' }}
          onClick={onContinueShopping}
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>Shopping Cart</h2>

      <div className="cart-layout">
        <div className="cart-items-card">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Hardware Item</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id || item.sku}>
                  <td>
                    <div className="cart-item-info">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="cart-item-thumb"
                      />
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.name}</div>
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#94a3b8'
                          }}
                        >
                          SKU: {item.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item._id, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item._id, item.qty + 1)}
                        disabled={item.qty >= item.countInStock}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </td>
                  <td>
                    <button
                      style={{
                        background: 'transparent',
                        color: '#f43f5e',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                      onClick={() => onRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-summary-card">
          <h3 style={{ marginBottom: '18px' }}>Order Summary</h3>

          <div className="summary-row">
            <span>Hardware Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Sales Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Standard Express Freight</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="summary-row total">
            <span>Final Total</span>
            <span style={{ color: '#06b6d4' }}>${total.toFixed(2)}</span>
          </div>

          <button className="btn-checkout" onClick={onProceedCheckout}>
            Proceed to Secure Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
