import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import './Accessories.css';

const accessories = getProductsByCategory('accessory');

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const accCategories = ['All', 'Covers & Protection', 'Bags & Storage', 'Ramps', 'Chargers', 'Comfort', 'Baskets'];

export default function Accessories() {
  const [sort, setSort] = useState('default');
  const [filter, setFilter] = useState('All');

  const sorted = [...accessories].sort((a, b) => {
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
          <p>Everything you need to protect, personalise, and get the very most from your mobility scooter. Quality accessories at great prices.</p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="acc-filter-bar">
        <div className="container">
          <div className="acc-filter-inner">
            {accCategories.map(cat => (
              <button
                key={cat}
                className={`acc-filter-pill ${filter === cat ? 'acc-filter-active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="product-toolbar">
            <p className="product-count">{sorted.length} accessories</p>
            <div className="product-sort">
              <SlidersHorizontal size={15} />
              <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select" aria-label="Sort accessories">
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

      {/* Bundle CTA */}
      <section className="acc-bundle-cta">
        <div className="container">
          <motion.div
            className="bundle-cta-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bundle-cta-icon"><ShoppingCart size={28} /></div>
            <div>
              <h3>Buy a scooter + accessories together and save up to 15%</h3>
              <p>Add a scooter to your cart, then come back here to add accessories. Our system automatically applies the bundle discount at checkout.</p>
            </div>
            <Link to="/mobility-scooters" className="btn btn-primary">Shop Scooters</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
