import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './FavoritesPage.css';
function FavoritesPage() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteProducts');
    setFavoriteProducts(stored ? JSON.parse(stored) : []);
  }, []);

  const handleToggleFavorite = (product) => {
    const updated = favoriteProducts.filter(p => p.id !== product.id);
    localStorage.setItem('favoriteProducts', JSON.stringify(updated));
    setFavoriteProducts(updated);
  };

  return (
    <div className="favorites-container">
      <h1 className='favorite-header'>Sản phẩm yêu thích</h1>
      {favoriteProducts.length === 0 ? (
        <p>Bạn chưa có sản phẩm yêu thích nào.</p>
      ) : (
        <div className="product-list">
          {favoriteProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={() => {}}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;