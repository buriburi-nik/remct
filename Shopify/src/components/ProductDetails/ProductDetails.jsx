import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const CART_KEY = 'cart';
const WISHLIST_KEY = 'wishlist';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch product
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleGoBack() {
    navigate(-1);
  }

  // helper: add to storage
  function addTo(key) {
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    if (!list.some(item => item.id === product.id)) {
      list.push(product);
      localStorage.setItem(key, JSON.stringify(list));
    }
  }

  const handleAddToCart = () => {
    addTo(CART_KEY);
    navigate('/cart');
  };

  const handleAddToWishlist = () => {
    addTo(WISHLIST_KEY);
    navigate('/wishlist');
  };

  // star-rating helper omitted for brevity – keep yours

  if (loading) {
    return <p>Loading product…</p>;
  }
  if (error || !product) {
    return (
      <div>
        <h3>Product not found</h3>
        <button onClick={handleGoBack} className="btn btn-primary">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={handleGoBack} className="btn btn-secondary">
        ← Back to Products
      </button>

      <div className="product-details-grid">
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-details-info">
          <span className="product-details-category">{product.category}</span>
          <h2>{product.title}</h2>
          {/* renderStars(product.rating) */}
          <div className="product-details-price">
            ${product.price.toFixed(2)}
          </div>
          <div className="product-details-description">
            {product.description}
          </div>
          <div className="product-details-actions">
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
