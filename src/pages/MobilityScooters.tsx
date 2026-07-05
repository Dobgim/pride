import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './ProductListPage.css';

const allScooters = products.filter(p => p.category !== 'accessory');

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function MobilityScooters() {
  const [sort, setSort] = useState('default');

  const sorted = [...allScooters].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Mobility Scooters</span>
          </nav>
          <h1>Mobility Scooters</h1>
          <p>Our full range of premium mobility scooters — from lightweight travel models to powerful road scooters. Every model is backed by expert support and comprehensive warranty.</p>
        </div>
      </div>

      {/* Category quick links */}
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
              <Link key={l.path} to={l.path} className="quick-nav-link">
                {l.label} <ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Toolbar */}
          <div className="product-toolbar">
            <p className="product-count">{sorted.length} scooters found</p>
            <div className="product-sort">
              <SlidersHorizontal size={15} />
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid-3">
            {sorted.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} showCategory />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
