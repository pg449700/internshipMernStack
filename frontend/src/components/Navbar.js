import React from 'react';

function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  currentView,
  setCurrentView,
  user,
  onOpenAuth,
  onLogout
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div
          className="nav-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => setCurrentView('catalog')}
        >
          <span>ElectroTech</span>
          <span className="brand-badge">PRO</span>
        </div>

        <div className="nav-search-bar">
          <input
            type="text"
            placeholder="Search laptops, audio, phones, components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <nav className="nav-actions">
          <button
            className={`btn-nav ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => setCurrentView('catalog')}
          >
            Catalog
          </button>

          <button
            className={`btn-nav ${currentView === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentView('cart')}
          >
            Cart
            {cartCount > 0 && (
              <span className="btn-cart-badge">{cartCount}</span>
            )}
          </button>

          {user && (
            <button
              className={`btn-nav ${
                currentView === 'orders' ? 'active' : ''
              }`}
              onClick={() => setCurrentView('orders')}
            >
              My Orders
            </button>
          )}

          {user && user.role === 'admin' && (
            <button
              className={`btn-nav ${currentView === 'admin' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin')}
            >
              Admin Portal
            </button>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#94a3b8'
                }}
              >
                {user.name.split(' ')[0]}
              </span>
              <button
                className="btn-nav"
                style={{ padding: '6px 10px' }}
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="btn-nav active" onClick={onOpenAuth}>
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
