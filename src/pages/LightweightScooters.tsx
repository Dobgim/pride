import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Weight, Car, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import './ProductListPage.css';
import './CategoryHighlights.css';

const products = getProductsByCategory('lightweight');

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const highlights = [
  { icon: <Weight size={20} />, label: 'From just 19kg', desc: 'Easy to lift and carry' },
  { icon: <Car size={20} />, label: 'Car boot friendly', desc: 'Disassembles in minutes' },
  { icon: <Zap size={20} />, label: 'Up to 30km range', desc: 'Per full charge' },
];

export default function LightweightScooters() {
  const [sort, setSort] = useState('default');

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
            <span>Lightweight</span>
          </nav>
          <h1>Lightweight Scooters</h1>
          <p>Featherweight, fuss-free, and perfect for everyday life. Our lightweight scooters fold down quickly and fit in almost any car boot.</p>
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
              <Link key={l.path} to={l.path} className={`quick-nav-link ${l.path === '/lightweight-scooters' ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category intro */}
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
            <p className="product-count">{sorted.length} lightweight scooters</p>
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
