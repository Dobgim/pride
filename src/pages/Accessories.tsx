import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, type Product } from '../data/products';
import './ProductListPage.css';

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function Accessories() {
  const [sort, setSort] = useState('default');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByCategory('accessory').then(data => setProducts(data));
  }, []);

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Accessories</span>
          </nav>
          <h1>Scooter Accessories</h1>
          <p>Enhance your mobility experience with our range of high-quality accessories — from weather protection covers and storage bags to ramps and safety aids.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="product-toolbar">
            <p className="product-count">{sorted.length} accessories found</p>
            <div className="product-sort">
              <SlidersHorizontal size={15} />
              <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select" aria-label="Sort by">
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid-3">
            {sorted.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
