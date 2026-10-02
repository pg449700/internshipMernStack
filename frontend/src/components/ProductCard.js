import React from 'react';

function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.countInStock <= 0;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        {product.isFeatured && (
          <span className="product-badge-featured">Featured</span>
        )}
        <span
          className={`product-badge-stock ${isOutOfStock ? 'out' : ''}`}
        >
          {isOutOfStock ? 'Sold Out' : `${product.countInStock} In Stock`}
        </span>
      </div>

      <div className="product-card-body">
        <span className="product-category-text">{product.category}</span>
        <h4 className="product-title">{product.name}</h4>
        <p className="product-desc">{product.description}</p>

        <div className="product-meta-row">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-rating">
            Rating: {product.rating} ({product.numReviews})
          </div>
        </div>

        <button
          className="btn-add-cart"
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
