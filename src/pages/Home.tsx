import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Headphones, Truck, RotateCcw,
  Users, Wrench, Star, ChevronRight, Award, Battery, MapPin
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import FAQAccordion from '../components/FAQAccordion';
import StatsSection from '../components/StatsSection';
import { getFeaturedProducts, type Product } from '../data/products';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faqs';
import './Home.css';

const categories = [
  {
    title: 'Lightweight Scooters',
    subtitle: 'Easy to transport & store',
    image: '/images/folding_lightweight.png',
    path: '/lightweight-scooters',
    color: '#dbeafe',
    accent: '#1d4ed8',
    features: ['From 19kg', 'Car boot friendly', 'Short journeys'],
  },
  {
    title: 'Folding Scooters',
    subtitle: 'Compact & travel-ready',
    image: '/images/folding_lightweight.png',
    path: '/folding-scooters',
    color: '#ccfbf1',
    accent: '#0f766e',
    features: ['Folds in seconds', 'Airline approved', 'Compact storage'],
  },
  {
    title: 'Road Scooters',
    subtitle: 'Long range & all terrain',
    image: '/images/luxury_road.png',
    path: '/road-scooters',
    color: '#fef3c7',
    accent: '#b45309',
    features: ['Up to 80km range', 'Road legal', 'All weather'],
  },
];

const whyUsItems = [
  {
    icon: <ShieldCheck size={28} />,
    title: 'Up to 3-Year Warranty',
    desc: 'Every scooter comes with comprehensive warranty coverage. We stand behind every product we sell.',
  },
  {
    icon: <Truck size={28} />,
    title: 'Free US Home Delivery',
    desc: 'Free delivery on all scooters over $500. Our team will set it up in your home and demonstrate it for you.',
  },
  {
    icon: <Headphones size={28} />,
    title: 'Expert US Support',
    desc: 'Our mobility specialists are available 7 days a week to answer any question — before and after purchase.',
  },
  {
    icon: <RotateCcw size={28} />,
    title: '14-Day Returns',
    desc: 'Not happy? Return within 14 days for a full refund. No quibbles, no hassle — your satisfaction guaranteed.',
  },
  {
    icon: <Wrench size={28} />,
    title: 'Nationwide Servicing',
    desc: 'Our mobile technicians cover the whole US. Annual service plans available to keep your scooter in top shape.',
  },
  {
    icon: <Award size={28} />,
    title: 'Award-Winning Brand',
    desc: 'Recognised by Which? and the Mobility & Access Awards for quality, service, and innovation.',
  },
];

const stats = [
  { value: 20000, suffix: '+', label: 'Happy Customers', description: 'Across the US since 2004' },
  { value: 50, suffix: '+', label: 'Models Available', description: 'For every lifestyle & budget' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', description: 'Based on verified reviews' },
  { value: 20, suffix: ' Yrs', label: 'Experience', description: 'US mobility experts' },
];

const services = [
  {
    icon: <Wrench size={24} />,
    title: 'Annual Service & MOT',
    desc: 'Full safety check, battery test, tyre inspection, brake adjustment, and lubrication.',
    price: 'From $79',
  },
  {
    icon: <Battery size={24} />,
    title: 'Battery Replacement',
    desc: 'We source and fit genuine replacement batteries for all major scooter brands.',
    price: 'From $49',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Mobile Home Visits',
    desc: 'Our technicians come to you. Available throughout the United States.',
    price: 'From $35',
  },
];

const previewFaqs = faqs.slice(0, 5);

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getFeaturedProducts().then(data => setFeaturedProducts(data));
  }, []);
  return (
    <main>
      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== CATEGORIES ===== */}
      <section className="section home-categories">
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">Browse by Type</span>
            <h2 className="section-title">Find Your Perfect Scooter</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Whether you need something compact for daily errands or a powerful road scooter for longer adventures, we have the right model for you.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                className="category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="category-card-image">
                  <img src={cat.image} alt={cat.title} loading="lazy" />
                  <div className="category-card-overlay" />
                </div>
                <div className="category-card-body">
                  <h3>{cat.title}</h3>
                  <p>{cat.subtitle}</p>
                  <div className="category-features">
                    {cat.features.map((f) => (
                      <span key={f} className="category-feature-tag">{f}</span>
                    ))}
                  </div>
                  <Link to={cat.path} className="btn btn-primary btn-sm category-btn">
                    Shop Now <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section home-featured" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Our Best Sellers</span>
              <h2 className="section-title">Featured Scooters</h2>
              <p className="section-subtitle">
                Our most popular models, chosen by thousands of happy customers across the US.
              </p>
            </div>
            <Link to="/mobility-scooters" className="btn btn-outline">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-grid grid-3">
            {featuredProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} showCategory />
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section-sm home-stats">
        <div className="container">
          <StatsSection stats={stats} />
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section home-why">
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">Why Care Drive Enclosed Mobility</span>
            <h2 className="section-title">The US's Most Trusted Choice</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              We don't just sell mobility scooters — we help you stay independent. Here's why over 20,000 customers have chosen us.
            </p>
          </div>
          <div className="why-grid">
            {whyUsItems.map((item, i) => (
              <motion.div
                key={item.title}
                className="why-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACCESSORIES PREVIEW ===== */}
      <section className="section home-accessories" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="accessories-preview-inner">
            <motion.div
              className="accessories-preview-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Complete Your Setup</span>
              <h2 className="section-title">Accessories & Add-Ons</h2>
              <p className="section-subtitle">
                From weatherproof covers and tiller bags to comfort cushions, ramps, and smart chargers. Everything you need to get the most from your scooter.
              </p>
              <div className="accessories-list">
                {['Universal Covers', 'Tiller Bags', 'Ramps & Ramps', 'Smart Chargers', 'Comfort Cushions', 'Baskets & Storage'].map((item) => (
                  <div key={item} className="accessory-list-item">
                    <ChevronRight size={14} className="acc-arrow" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/accessories" className="btn btn-primary">
                Shop Accessories <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              className="accessories-preview-images"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="acc-img-grid">
                {[
                  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
                  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
                  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    className="acc-img-item"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={src} alt="Accessory" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section home-services">
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">After-Sales Care</span>
            <h2 className="section-title">Servicing & Repairs</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Our expert team is on hand to keep your scooter running perfectly. We offer comprehensive service plans across the US.
            </p>
          </div>
          <div className="services-preview-grid">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="service-preview-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="service-preview-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="service-preview-price">{s.price}</div>
                <Link to="/services" className="service-preview-link">
                  Learn more <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/services" className="btn btn-outline">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section home-testimonials" style={{ background: 'var(--color-primary)' }}>
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Customer Stories</span>
            <h2 className="section-title" style={{ color: 'white' }}>Real People, Real Freedom</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', color: 'rgba(255,255,255,0.7)' }}>
              Don't just take our word for it. See what our customers say about Care Drive Enclosed Mobility.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="testimonial-stars">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-meta">{t.location} · {t.product}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="testimonials-more">
            <Link to="/about" className="btn btn-white">
              Read More Stories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ PREVIEW ===== */}
      <section className="section home-faq">
        <div className="container">
          <div className="faq-preview-inner">
            <div className="faq-preview-text">
              <span className="section-label">Common Questions</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Everything you need to know about buying, using, and maintaining your mobility scooter.
              </p>
              <Link to="/faq" className="btn btn-primary" style={{ marginTop: 24 }}>
                View All FAQs <ArrowRight size={16} />
              </Link>
            </div>
            <div className="faq-preview-accordion">
              <FAQAccordion faqs={previewFaqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="section-sm home-contact-cta" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <motion.div
            className="contact-cta-box"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-cta-text">
              <Users size={40} className="contact-cta-icon" />
              <h2>Speak to a Mobility Expert Today</h2>
              <p>Get personalised advice from our knowledgeable team. We'll help you find the right scooter — no pressure, no obligation.</p>
            </div>
            <div className="contact-cta-actions">
              <Link to="/contact" className="btn btn-accent btn-lg">
                Contact Us <ArrowRight size={18} />
              </Link>
              <a href="tel:18005550199" className="btn btn-outline btn-lg">
                Call 1-800-555-0199
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
