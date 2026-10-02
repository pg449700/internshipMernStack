import React, { useState } from 'react';

function Checkout({
  cartItems,
  user,
  onPlaceOrder,
  onCancelCheckout
}) {
  const [address, setAddress] = useState('100 Technology Boulevard');
  const [city, setCity] = useState('Amman');
  const [postalCode, setPostalCode] = useState('11190');
  const [country, setCountry] = useState('Jordan');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const tax = Number((subtotal * 0.1).toFixed(2));
  const shipping = subtotal > 100 ? 0 : 15;
  const total = Number((subtotal + tax + shipping).toFixed(2));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        qty: item.qty
      })),
      shippingAddress: {
        address,
        city,
        postalCode,
        country
      },
      paymentMethod
    };

    await onPlaceOrder(orderPayload);
    setIsSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>Checkout and Order Verification</h2>

      <div className="cart-items-card">
        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '16px', color: '#6366f1' }}>
            1. Shipping Destination
          </h3>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '12px'
            }}
          >
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <h3
            style={{
              marginTop: '24px',
              marginBottom: '16px',
              color: '#6366f1'
            }}
          >
            2. Payment Method
          </h3>

          <div className="form-group">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Credit Card">Credit Card (Stripe Verified)</option>
              <option value="PayPal">PayPal Secure Checkout</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <h3
            style={{
              marginTop: '24px',
              marginBottom: '16px',
              color: '#6366f1'
            }}
          >
            3. Order Verification
          </h3>

          <div style={{ background: '#111827', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
            <div className="summary-row">
              <span>Items Total ({cartItems.length} lines)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping Fee</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Order Grand Total</span>
              <span style={{ color: '#10b981' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <button
              type="button"
              className="btn-nav"
              style={{ flex: 1, padding: '12px' }}
              onClick={onCancelCheckout}
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="btn-checkout"
              style={{ flex: 2, margin: 0 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing Transaction...' : 'Confirm & Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
