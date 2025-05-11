import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CART_KEY = 'cart';

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
  }, []);

  const remove = id => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <button onClick={clearAll} className="btn btn-secondary">
        Clear Cart
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(i => (
          <li key={i.id} className="product-details-grid" style={{ margin: '10px 0' }}>
            <img src={i.image} alt={i.title} width={50} />
            <div style={{ flex: 1, marginLeft: 10 }}>
              <Link to={`/products/${i.id}`}>{i.title}</Link>
              <div>${i.price.toFixed(2)}</div>
            </div>
            <button onClick={() => remove(i.id)} className="btn btn-secondary">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
