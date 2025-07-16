import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritePage/FavoritesPage';
import Navbar from './Navbar/Navbar';
import HistoryPage from './pages/HistoryPage/HistoryPage';
function App () {
  const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <div className='App'>
      <Router>
        <Navbar 
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage searchTerm={searchTerm}/>} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          {/* Các route khác có thể thêm vào đây */}
        </Routes>
      </Router>
    </div>
  )
}
export default App;