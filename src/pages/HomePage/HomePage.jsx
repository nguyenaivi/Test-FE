import React, { useEffect, useState } from 'react';
import { products as mockProducts } from '../../data/mockProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import './HomePage.css';
import axios, { all } from 'axios';
function HomePage({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState(() => {
    //Lấy từ localStorage nếu có
    const stored = localStorage.getItem('favoriteProducts');
    return stored ? JSON.parse(stored) : [];
  });

  const handleToggleFavorite = (product) => {
    setFavoriteProducts(prev => {
      let updated;
      if (prev.some(p => p.id === product.id)) {
        updated = prev.filter(p => p.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem('favoriteProducts', JSON.stringify(updated));
      return updated;
    })
  }
  useEffect(() => {
    // Giả lập gọi API
    setProducts(mockProducts);
  }, []);

  const handleViewDetail = async (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    let existed = false;
    try {
      const res = await axios.get('http://localhost:3001/view');
      const savedProducts = res.data;
      existed = savedProducts.some(p => p.name === product.name);
    } catch (error) {
      console.error('Lỗi khi kiểm tra sản phẩm đã lưu:', error);
    }

    if (existed) {
      return;
    }
    const newViewedProducts = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      shortDescription: product.shortDescription,
      detail: product.detail,
      rating: product.rating,
    };
    axios.post('http://localhost:3001/view', newViewedProducts)
      .then(response => {
        console.log('Sản phẩm đã được lưu:', response.data);
        sessionStorage.setItem('newViewedProducts', JSON.stringify(response));
      })
      .catch(error => {
        console.error('Lỗi khi lưu sản phẩm:', error);
      });
  };

  //Hàm lấy sản phẩm gợi ý từ API
  const handleShowRecommendations = () => {
    axios.get('http://localhost:3001/view')
      .then(response => {
        const recommendations = response.data;
        console.log('Gợi ý sản phẩm:', recommendations);
        setRecommendedProducts(recommendations);
        // Hiển thị gợi ý sản phẩm (có thể là một modal hoặc danh sách)
      })
      .catch(error => {
        console.error('Lỗi khi lấy gợi ý sản phẩm:', error);
        alert('Không thể lấy gợi ý sản phẩm. Vui lòng thử lại sau.');
      });
  }
  // Hàm lọc theo giá
  const filterByPrice = (product) => {
    if (priceFilter === 'under500') return product.price < 500000;
    if (priceFilter === '500to1m') return product.price >= 500000 && product.price <= 1000000;
    if (priceFilter === 'above1m') return product.price > 1000000;
    return true;
  };

  console.log('Search Term:', searchTerm);
  // Lọc theo tên + giá
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    filterByPrice(product)
  );


  return (
    <div className="home-container">
      <h1>Danh sách khoá học</h1>

      {/* Bộ lọc giá */}
      <div className="price-filter">
        <label>Lọc theo giá: </label>
        <select onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="under500">Dưới 500K</option>
          <option value="500to1m">500K – 1 triệu</option>
          <option value="above1m">Trên 1 triệu</option>
        </select>
      </div>

      <div className='recommendation-section'>
        <button onClick={handleShowRecommendations}>Gợi ý sản phẩm phù hợp</button>
        {recommendedProducts.length > 0 && (
          <div className="recommended-list">
            {recommendedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={handleViewDetail}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favoriteProducts.some(p => p.id === product.id)}
              />
            ))}
          </div>
        )}
      </div>
      {recommendedProducts.length === 0 && (
        <div className="product-list">
          {filteredProducts.length === 0 ? (
            <p>Không tìm thấy sản phẩm nào.</p>
          ) : (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={handleViewDetail}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favoriteProducts.some(p => p.id === product.id)}
              />
            ))
          )}
        </div>
      )}

      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>Đóng</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
            <h2>{selectedProduct.name}</h2>
            <p><strong>Giá:</strong> {typeof selectedProduct.price === 'number' ? selectedProduct.price.toLocaleString() : selectedProduct.price} VND</p>
            <p><strong>Mô tả ngắn:</strong> {selectedProduct.shortDescription}</p>
            <p><strong>Mô tả chi tiết:</strong> {selectedProduct.detail}</p>
            <p><strong>Đánh giá:</strong> {selectedProduct.rating} ⭐</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
