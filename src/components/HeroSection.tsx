import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Truck, Star } from 'lucide-react';
import './HeroSection.css';

const slides = [
  {
    id: 0,
    image: '/images/luxury_road.png',
    headline: 'Reclaim Your',
    accent: 'Independence',
    sub: 'Premium enclosed mobility scooters designed to keep you active, confident, and free. Discover the US\'s finest range.',
    cta: 'Shop All Scooters',
    ctaPath: '/mobility-scooters',
  },
  {
    id: 1,
    image: '/images/enclosed_cabin.png',
    headline: 'All-Weather',
    accent: 'Enclosed Cabin',
    sub: 'Our enclosed mobility vehicles give you complete protection from rain, wind, and cold — so nothing stops you getting out.',
    cta: 'View Road Scooters',
    ctaPath: '/road-scooters',
  },
  {
    id: 2,
    image: '/images/folding_lightweight.png',
    headline: 'Lightweight &',
    accent: 'Travel-Ready',
    sub: 'Portable, foldable scooters that go wherever life takes you. From the high street to holidays abroad.',
    cta: 'Lightweight Scooters',
    ctaPath: '/lightweight-scooters',
  },
];

const stats = [
  { value: '20,000+', label: 'Happy Customers' },
  { value: '50+', label: 'Models Available' },
  { value: '20 Yrs', label: 'Experience' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="hero-slider" aria-label="Hero slideshow">
      {/* Background slides with Ken Burns zoom */}
      <div className="hero-slides-container">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current}
            className="hero-slide-bg"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 6, ease: 'linear' } }}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden="true"
          />
        </AnimatePresence>
        {/* Dark gradient overlay */}
        <div className="hero-overlay" />
        {/* Radial vignette */}
        <div className="hero-vignette" />
      </div>

      {/* Content */}
      <div className="container hero-content-wrap">
        <div className="hero-text-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="hero-label">
                <span className="hero-label-dot" /> US's Most Trusted Enclosed Mobility Brand
              </span>
              <h1 className="hero-headline">
                {slide.headline}<br />
                <span className="hero-accent">{slide.accent}</span>
              </h1>
              <p className="hero-sub">{slide.sub}</p>
              <div className="hero-actions">
                <Link to={slide.ctaPath} className="btn btn-accent btn-lg">
                  {slide.cta} <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn btn-hero-ghost btn-lg">
                  Get Expert Advice
                </Link>
              </div>
              <div className="hero-trust-pills">
                <div className="hero-trust-pill"><Shield size={13} /> 3-Year Warranty</div>
                <div className="hero-trust-pill"><Truck size={13} /> Free US Delivery</div>
                <div className="hero-trust-pill"><Star size={13} /> 4.9★ Rated</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats card */}
        <div className="hero-stats-card">
          {stats.map((s, i) => (
            <div key={s.label} className="hero-stat-item">
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label.toUpperCase()}</div>
              {i < stats.length - 1 && <div className="hero-stat-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <div className="hero-controls">
        <button className="hero-arrow hero-arrow-prev" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={22} />
        </button>

        <div className="hero-dots" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? 'hero-dot-active' : ''}`}
              onClick={() => goToSlide(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button className="hero-arrow hero-arrow-next" onClick={next} aria-label="Next slide">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="hero-progress-bar">
        <AnimatePresence mode="wait">
          <motion.div
            key={`progress-${current}`}
            className="hero-progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ width: '0%' }}
            transition={{ duration: 5.5, ease: 'linear' }}
          />
        </AnimatePresence>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <div className="hero-scroll-dot" />
      </div>
    </section>
  );
}
