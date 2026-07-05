import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Star, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, type Product } from '../data/products';
import './ProductListPage.css';
import './CategoryHighlights.css';

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const highlights = [
  { icon: <Sparkles size={20} />, label: 'Auto-folding', desc: 'Folds in under 15 seconds' },
  { icon: <Plane size={20} />, label: 'Flight-approved', desc: 'Airline-safe lithium batteries' },
  { icon: <Star size={20} />, label: 'Space saving', desc: 'Fits easily in car boot or closet' },
];

export default function FoldingScooters() {
  const [sort, setSort] = useState('default');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByCategory('folding').then(data => setProducts(data));
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
            <Link to="/mobility-scooters">Mobility Scooters</Link>
            <span>/</span>
            <span>Folding Scooters</span>
          </nav>
          <h1>Folding Scooters</h1>
          <p>Compact, intelligent, and built for travel. Our selection of folding mobility scooters can be folded manually or automatically at the touch of a button.</p>
        </div>
      </div>

      <div className="category-quick-nav">
        <div className="container">
          <div className="quick-nav-inner">
            <span className="quick-nav-label">Browse by type:</span>
            {[
              { label: 'All Scooters', path: '/mobility-scooters' },
              { label: 'Lightweight', path: '/lightweight-scooters' },
              { label: 'Folding', path: '/folding-scooters' },
              { label: 'Road Scooters', path: '/road-scooters' },
            ].map(l => (
              <Link key={l.path} to={l.path} className={`quick-nav-link ${l.path === '/folding-scooters' ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="category-intro">
        <div className="container">
          <div className="lw-highlights">
            {highlights.map(h => (
              <div key={h.label} className="lw-highlight-item">
                <div className="lw-highlight-icon">{h.icon}</div>
                <div>
                  <div className="lw-highlight-label">{h.label}</div>
                  <div className="lw-highlight-desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="product-toolbar">
            <p className="product-count">{sorted.length} folding scooters</p>
            <div className="product-sort">
              <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select" aria-label="Sort by">
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid-3">
            {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
