import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Products.css';

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('cat');

  // Fetch categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
      })
      .then(data => {
        setCategories(data);
        // Set default category if none selected
        if (!selectedCategory && data.length > 0) {
          setSearchParams({ cat: data[0] });
        }
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      });
  }, []);

  // Fetch products for selected category
  useEffect(() => {
    if (!categories.length) return;
    
    const category = selectedCategory || categories[0];
    setLoading(true);
    setError(null);
    
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, [categories, selectedCategory]);

  function handleCategoryChange(category) {
    setSearchParams({ cat: category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderStars(rating) {
    if (!rating) return null;
    
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

  function formatCategoryName(category) {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  if (error) {
    return (
      <div className="products-page">
        <aside className="sidebar">
          <h3>Categories</h3>
          {categories.map(category => (
            <button
              key={category}
              className={category === selectedCategory ? 'active' : ''}
              onClick={() => handleCategoryChange(category)}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </aside>
        
        <main className="content-area">
          <div className="empty-state">
            <div className="empty-state-icon">⚠️</div>
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="products-page">
      <aside className="sidebar">
        <h3>Categories</h3>
        {categories.map(category => (
          <button
            key={category}
            className={category === selectedCategory ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </aside>
      
      <main className="content-area product-list">
        <h2>
          {selectedCategory 
            ? formatCategoryName(selectedCategory) 
            : categories.length > 0 
              ? formatCategoryName(categories[0]) 
              : 'Products'}
        </h2>
        
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No products found</h3>
            <p>Try selecting a different category</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
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