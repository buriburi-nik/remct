import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';
// import '../../App.css';

const WISHLIST_KEY = 'wishlist';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from storage with a slight delay for animation
    setTimeout(() => {
      setItems(JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'));
      setIsLoading(false);
    }, 300);
  }, []);

  const remove = id => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  if (isLoading) {
    return (
      <div className="container loading">
        <div className="loading-spinner"></div>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container wishlist-page">
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">❤️</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Add items to your wishlist to keep track of products you love</p>
          <Link to="/products" className="btn-browse">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container wishlist-page">
      <h2>Your Wishlist</h2>
      <ul className="wishlist-items">
        {items.map((item) => (
          <li key={item.id} className="wishlist-item">
            <img 
              src={item.image} 
              alt={item.title} 
              className="wishlist-item-image"
            />
            <div className="wishlist-item-details">
              <Link to={`/products/${item.id}`} className="wishlist-item-title">
                {item.title}
              </Link>
              {item.price && (
                <span className="wishlist-item-price">${item.price.toFixed(2)}</span>
              )}
            </div>
            <button onClick={() => remove(item.id)} className="btn-remove">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div >
        <Link to="/products" className="btn-browse">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}