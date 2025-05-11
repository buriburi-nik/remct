import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Products() {
  const [cats, setCats] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const selected = params.get('cat');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(r => r.json())
      .then(data => {
        setCats(data);
        if (!selected && data.length > 0) {
          setParams({ cat: data[0] });
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    if (!cats.length) return;
    
    const cat = selected || cats[0];
    setLoading(true);
    
    fetch(`https://fakestoreapi.com/products/category/${cat}`)
      .then(r => r.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [cats, selected, setParams]);

  function handleCategoryChange(cat) {
    setParams({ cat });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }
    
    return stars;
  }

  return (
    <div className="products-page">
      <aside className="sidebar">
        <h3>Categories</h3>
        {cats.map(c => (
          <button
            key={c}
            className={c === selected ? 'active' : ''}
            onClick={() => handleCategoryChange(c)}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </aside>
      
      <main className="content-area product-list">
        <h2>{selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : cats[0]}</h2>
        
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No products found</h3>
            <p>Try selecting a different category</p>
          </div>
        ) : (
          <div className="products-grid">
            {items.map(product => (
              <Link to={`/products/${product.id}`} key={product.id} className="product-link">
                <div className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-info">
                    <div className="product-title">{product.title}</div>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    {product.rating && (
                      <div className="product-rating">
                        <div className="rating-stars">{renderStars(product.rating.rate)}</div>
                        <div>({product.rating.count})</div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}