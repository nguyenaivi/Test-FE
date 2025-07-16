import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onViewDetail, onToggleFavorite, isFavorite }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>{product.shortDescription}</p>
      <p><strong>
        {typeof product.price === 'number'
          ? product.price.toLocaleString()
          : product.price} VND
      </strong></p>
      <div className="button-card">
        <button onClick={() => onViewDetail(product)}>Xem chi tiết</button>
        <button className='favorite-btn' onClick={() => onToggleFavorite(product)}>
          {isFavorite ? '💖' : '🤍'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;