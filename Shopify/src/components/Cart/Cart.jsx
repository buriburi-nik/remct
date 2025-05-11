import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const CART_KEY = 'cart';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
  }, []);

  const remove = id => {
    // Set removing ID to trigger animation
    setRemovingId(id);
    
    // Wait for animation to complete before removing
    setTimeout(() => {
      const updated = items.filter(i => i.id !== id);
      setItems(updated);
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      setRemovingId(null);
    }, 500);
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="container">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <button onClick={clearAll} className="btn btn-clear-cart">
            Clear Cart
          </button>
        </div>
        
        <div className="cart-items">
          {items.map(item => (
            <div 
              key={item.id} 
              className={`cart-item ${removingId === item.id ? 'removing' : ''}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="cart-item-image" 
              />
              
              <div className="cart-item-details">
                <Link to={`/products/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>
              
              <button 
                onClick={() => remove(item.id)} 
                className="cart-item-remove"
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                  <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-footer">
          <div className="cart-actions">
            <div className="cart-total">
              Total: <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="cart-buttons">
              <Link to="/products" className="btn btn-secondary">
                Continue Shopping
              </Link>
              <button className="btn btn-checkout">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}