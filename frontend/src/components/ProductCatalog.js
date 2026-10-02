import React from 'react';
import ProductCard from './ProductCard';

const CATEGORIES = [
  'All',
  'Laptops',
  'Smartphones',
  'Audio',
  'Wearables',
  'Accessories'
];

function ProductCatalog({
  products,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  onAddToCart
}) {
  return (
    <div>
      <section className="hero-banner">
        <div className="hero-text">
          <h1>Engineered Hardware & Next-Gen Electronics</h1>
          <p>
            Enterprise ultrabooks, audiophile acoustic gear, and workstation
            peripherals built for high-performance software engineering teams.
          </p>
          <div className="hero-tags">
            <span className="tag-pill">Direct Manufacturer Warranty</span>
            <span className="tag-pill">24-Hour Express Dispatch</span>
            <span className="tag-pill">Verified Hardware Benchmarks</span>
          </div>
        </div>
      </section>

      <div className="catalog-layout">
        <aside className="sidebar-filters">
          <h3>Filter Hardware</h3>

          <div className="filter-group">
            <label>Categories</label>
            <ul className="category-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    className={`category-btn ${
                      selectedCategory === cat ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <label>Price Range ($)</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span style={{ color: '#64748b' }}>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </aside>

        <section>
          <div className="catalog-header">
            <div className="results-count">
              Showing {products.length} products
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Sort: Newest Arrivals</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Rating: Highest First</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#94a3b8'
              }}
            >
              <h3>No hardware matches your active filters</h3>
              <p style={{ marginTop: '8px' }}>
                Try resetting your price constraints or category selections.
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.sku}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProductCatalog;
