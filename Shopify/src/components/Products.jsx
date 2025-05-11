import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Products() {
  const [cats, setCats] = useState([]);
  const [items, setItems] = useState([]);
  const [params, setParams] = useSearchParams();
  const selected = params.get('cat');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(r => r.json())
      .then(setCats);
  }, []);

  useEffect(() => {
    if (!cats.length) return;
    const cat = selected || cats[0];
    setParams({ cat });
    fetch(`https://fakestoreapi.com/products/category/${cat}`)
      .then(r => r.json())
      .then(setItems);
  }, [cats, selected, setParams]);

  return (
    <div className="products-page">
      <aside className="sidebar">
        {cats.map(c => (
          <button
            key={c}
            className={c === selected ? 'active' : ''}
            onClick={() => setParams({ cat: c })}
          >
            {c}
          </button>
        ))}
      </aside>
      <main className="product-list">
        <h2>{selected || cats[0]}</h2>
        <ul>
          {items.map(i => (
            <li key={i.id}>
              <Link to={`/products/${i.id}`}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
