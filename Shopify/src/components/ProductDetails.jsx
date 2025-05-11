import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Product not found');
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function handleGoBack() {
    navigate(-1);
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
    
    return (
      <div className="product-rating">
        <div className="rating-stars">{stars}</div>
        <div>({rating.count} reviews)</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="content-area">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="content-area">
          <div className="empty-state">
            <div className="empty-state-icon">❌</div>
            <h3>Product not found</h3>
            <p>{error || 'The requested product could not be loaded'}</p>
            <button onClick={handleGoBack} className="btn btn-primary mt-4">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content-area product-details">
        <button onClick={handleGoBack} className="btn btn-secondary mb-4">
          ← Back to Products
        </button>
        
        <div className="product-details-grid">
          <div className="product-details-image">
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className="product-details-info">
            <span className="product-details-category">
              {product.category}
            </span>
            <h2>{product.title}</h2>
            
            {product.rating && renderStars(product.rating)}
            
            <div className="product-details-price">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="product-details-description">
              {product.description}
            </div>
            
            <div className="product-details-actions">
              <button className="btn btn-primary">
                Add to Cart
              </button>
              <button className="btn btn-secondary">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}