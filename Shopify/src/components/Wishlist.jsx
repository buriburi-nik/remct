import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WISHLIST_KEY = 'wishlist';

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'));
  }, []);

  const remove = id => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  if (items.length === 0) {
    return (
  <div className="container cart-page">
            <h2>Your Wishlist is Empty</h2>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
 <div className="container wishlist-page">  
    <h2>Your Wishlist</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(i => (
          <li key={i.id} className="product-details-grid" style={{ margin: '10px 0' }}>
            <img src={i.image} alt={i.title} width={50} />
            <div style={{ flex: 1, marginLeft: 10 }}>
              <Link to={`/products/${i.id}`}>{i.title}</Link>
            </div>
            <button onClick={() => remove(i.id)} className="btn btn-secondary">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
