import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import OrderHistory from './components/OrderHistory';
import Footer from './components/Footer';

const INITIAL_PRODUCTS = [
  {
    _id: 'prod_001',
    name: 'Apex ProBook Ultra 16',
    sku: 'LAP-APEX-16',
    brand: 'Apex',
    category: 'Laptops',
    description: '16-inch Retina 120Hz display, 32GB Unified RAM, 1TB NVMe Gen4 SSD, 14-Core CPU for heavy engineering workloads.',
    price: 1899.99,
    countInStock: 15,
    rating: 4.9,
    numReviews: 24,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'prod_002',
    name: 'Quantum ThinkStation X1',
    sku: 'LAP-QNTM-X1',
    brand: 'Quantum',
    category: 'Laptops',
    description: 'Carbon fiber lightweight ultrabook with OLED touch display, Intel Core Ultra 9, 64GB LPDDR5X RAM, and dual Thunderbolt 4 ports.',
    price: 2199.0,
    countInStock: 8,
    rating: 4.8,
    numReviews: 18,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'prod_003',
    name: 'Vortex Horizon Phone 15 Pro',
    sku: 'PHN-VRX-15P',
    brand: 'Vortex',
    category: 'Smartphones',
    description: 'Titanium chassis, 6.7-inch Super AMOLED 144Hz panel, triple 50MP sensor array with periscope optical zoom, 5000mAh battery.',
    price: 1199.99,
    countInStock: 25,
    rating: 4.7,
    numReviews: 42,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'prod_004',
    name: 'Nova Lite Smartphone 5G',
    sku: 'PHN-NOV-5G',
    brand: 'Nova',
    category: 'Smartphones',
    description: 'Sleek budget champion with Snapdragon 7 Gen 3, 108MP camera, 67W fast charging, and dual stereo speakers.',
    price: 399.0,
    countInStock: 30,
    rating: 4.5,
    numReviews: 15,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'prod_005',
    name: 'AcousticPure Wireless ANC Headphones',
    sku: 'AUD-ACPU-NC',
    brand: 'AcousticPure',
    category: 'Audio',
    description: 'Active hybrid noise cancellation up to 45dB, 40mm beryllium drivers, 55-hour playback time, LDAC hi-res wireless streaming.',
    price: 299.99,
    countInStock: 40,
    rating: 4.8,
    numReviews: 38,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'prod_006',
    name: 'EchoPulse Studio Wireless Earbuds',
    sku: 'AUD-ECHP-BUD',
    brand: 'EchoPulse',
    category: 'Audio',
    description: 'Spatial audio with dynamic head tracking, IPX7 water resistance, wireless Qi charging case, and adaptive microphone isolation.',
    price: 159.5,
    countInStock: 50,
    rating: 4.6,
    numReviews: 29,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'prod_007',
    name: 'Chronos Smartwatch Titan Edition',
    sku: 'WRB-CHRN-TTN',
    brand: 'Chronos',
    category: 'Wearables',
    description: 'Sapphire glass dial, aerospace titanium frame, continuous ECG monitoring, dual-band GPS, and 14-day battery life.',
    price: 449.99,
    countInStock: 18,
    rating: 4.7,
    numReviews: 31,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'prod_008',
    name: 'PrecisionCraft Mechanical Keyboard',
    sku: 'ACC-PRC-KB',
    brand: 'PrecisionCraft',
    category: 'Accessories',
    description: 'Hot-swappable tactile switches, gasket-mounted dampening foam, PBT double-shot keycaps, RGB backlighting, Bluetooth and USB-C.',
    price: 139.99,
    countInStock: 35,
    rating: 4.8,
    numReviews: 53,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
  }
];

function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('electrotech_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({
    _id: 'usr_ahmad_202301752',
    name: 'Ahmad Alayan',
    email: 'ahmad@example.com',
    role: 'admin'
  });
  const [currentView, setCurrentView] = useState('catalog');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  useEffect(() => {
    localStorage.setItem('electrotech_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API offline');
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const handlePlaceOrder = async (orderPayload) => {
    const itemsPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const taxPrice = Number((itemsPrice * 0.1).toFixed(2));
    const shippingPrice = itemsPrice > 100 ? 0 : 15;
    const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

    const newOrder = {
      _id: 'ord_' + Date.now(),
      user: { _id: user._id, name: user.name, email: user.email },
      orderItems: cartItems,
      shippingAddress: orderPayload.shippingAddress,
      paymentMethod: orderPayload.paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setCurrentView('orders');
  };

  const handlePayOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? {
              ...order,
              isPaid: true,
              paidAt: new Date().toISOString(),
              status: 'Processing'
            }
          : order
      )
    );
  };

  const handleAddProduct = (newProduct) => {
    const item = {
      ...newProduct,
      _id: 'prod_' + Date.now(),
      rating: 5.0,
      numReviews: 0,
      isFeatured: false
    };
    setProducts((prev) => [item, ...prev]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord._id === orderId ? { ...ord, status: newStatus } : ord
      )
    );
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      const isAdmin = authEmail.includes('admin');
      setUser({
        _id: 'usr_' + Date.now(),
        name: isAdmin ? 'Admin ElectroTech' : 'Ahmad Alayan',
        email: authEmail,
        role: isAdmin ? 'admin' : 'customer'
      });
    } else {
      setUser({
        _id: 'usr_' + Date.now(),
        name: authName,
        email: authEmail,
        role: 'customer'
      });
    }
    setIsAuthModalOpen(false);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchMinPrice =
        minPrice === '' || product.price >= parseFloat(minPrice);
      const matchMaxPrice =
        maxPrice === '' || product.price <= parseFloat(maxPrice);
      return matchSearch && matchCategory && matchMinPrice && matchMaxPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="app-container">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main className="main-content">
        {currentView === 'catalog' && (
          <ProductCatalog
            products={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onProceedCheckout={() => setCurrentView('checkout')}
            onContinueShopping={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            cartItems={cartItems}
            user={user}
            onPlaceOrder={handlePlaceOrder}
            onCancelCheckout={() => setCurrentView('cart')}
          />
        )}

        {currentView === 'orders' && (
          <OrderHistory orders={orders} onPayOrder={handlePayOrder} />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      <Footer />

      {isAuthModalOpen && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <div className="auth-tabs">
              <button
                className={`auth-tab-btn ${
                  authMode === 'login' ? 'active' : ''
                }`}
                onClick={() => setAuthMode('login')}
              >
                Sign In
              </button>
              <button
                className={`auth-tab-btn ${
                  authMode === 'register' ? 'active' : ''
                }`}
                onClick={() => setAuthMode('register')}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleAuthSubmit}>
              {authMode === 'register' && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Ahmad Alayan"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="admin@electrotech.com"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Password123!"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn-nav"
                  style={{ flex: 1 }}
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-checkout"
                  style={{ flex: 2, margin: 0 }}
                >
                  {authMode === 'login' ? 'Authenticate' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
