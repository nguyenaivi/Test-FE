import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import './HistoryPage.css';
function HistoryPage() {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/view')
      .then(res => {
        const all = res.data;
        // Lọc trùng theo name (hoặc id nếu chắc chắn id là duy nhất cho từng sản phẩm)
        const unique = [];
        const names = new Set();
        for (const p of all) {
          if (!names.has(p.name)) {
            names.add(p.name);
            unique.push(p);
          }
        }
        setViewedProducts(unique);
      })
      .catch(err => {
        setViewedProducts([]);
      });
  }, []);

  return (
    <div className="history-container">
      <h1>Lịch sử đã xem</h1>
      {viewedProducts.length === 0 ? (
        <p>Bạn chưa xem sản phẩm nào.</p>
      ) : (
        <div className="product-list">
          {viewedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={() => {}}
              onToggleFavorite={() => {}}
              isFavorite={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;