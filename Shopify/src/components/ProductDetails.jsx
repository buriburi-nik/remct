import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(r => r.json())
      .then(setP);
  }, [id]);

  if (!p) return <p style={{ padding: '20px' }}>Loading…</p>;
  return (
    <div style={{ padding: '20px' }}>
      <h2>{p.title}</h2>
      <img src={p.image} alt="" width={150} />
      <p>{p.description}</p>
      <p><strong>${p.price}</strong></p>
    </div>
  );
}
