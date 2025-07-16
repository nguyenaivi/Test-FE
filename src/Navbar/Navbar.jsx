import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ searchTerm, onSearchTermChange }) {
  return (
    <nav className="navbar">
      <h2 className="logo">EduShop</h2>
      <input
        type="text"
        placeholder="Tìm khoá học..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="search-input"
      />
      <div className="nav-links">
        <Link to="/home">Trang chủ</Link>
        <Link to="/favorites">Yêu thích</Link>
        <Link to="/history">Lịch sử đã xem</Link>
      </div>
    </nav>
  );
}

export default Navbar;
