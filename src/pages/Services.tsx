import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, Battery, Home, Gauge, ShieldCheck, Star, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <Wrench size={28} />,
    title: 'Annual Service & Safety Check',
    price: 'From $79',
    duration: 'Approx. 2 hours',
    description: 'Our comprehensive annual service is designed to keep your scooter performing safely and reliably throughout the year.',
    includes: [
      'Full mechanical safety inspection',
      'Battery health test & capacity check',
      'Tyre pressure & condition check',
      'Brake adjustment & test',
      'All bearings and joints lubricated',
      'Lights, horn & indicators tested',
      'Software update (where applicable)',
      'Service completion certificate',
    ],
  },
  {
    icon: <Battery size={28} />,
    title: 'Battery Replacement Service',
    price: 'From $49 + battery cost',
    duration: 'Same-day in most cases',
    description: 'Is your scooter not holding its charge as well as it used to? Our technicians will diagnose your battery health and replace it with a genuine part.',
    includes: [
      'Battery health diagnostic report',
      'Genuine OEM replacement batteries',
      'Professional installation & testing',
      'Old battery disposal (eco-friendly)',
      'Post-replacement full charge cycle',
      'Written report & new battery warranty',
    ],
  },
  {
    icon: <Home size={28} />,
    title: 'Mobile Home Visit Service',
    price: 'From $35 call-out + parts',
    duration: 'Flexible scheduling',
    description: 'Can\'t get to us? No problem. Our mobile technicians come directly to your home and carry out most repairs on-site.',
    includes: [
      'Nationwide coverage across the US',
      'Fully equipped service van',
      'Most common parts carried in stock',
      'Flexible appointment times',
      'Weekend visits available',
      '90-day labour warranty on all repairs',
    ],
  },
  {
    icon: <Gauge size={28} />,
    title: 'Diagnostics & Repair',
    price: 'From $35 diagnostic fee',
    duration: 'Varies by repair',
    description: 'Got a fault light, strange noise, or performance issue? Our technicians will diagnose and fix the problem quickly and affordably.',
    includes: [
      'Electronic fault code reading',
      'Motor & controller diagnostics',
      'Wiring & connection inspection',
      'Tyre puncture repair or replacement',
      'Joystick & control module repair',
      'Detailed written repair report',
    ],
  },
];

const plans = [
  {
    name: 'Basic Care',
    price: '$9.99/mo',
    description: 'Entry-level protection for peace of mind',
    features: ['Annual service included', 'Labour costs covered', '10% discount on parts', 'Priority booking'],
    highlight: false,
  },
  {
    name: 'Complete Care',
    price: '$19.99/mo',
    description: 'Our most popular full-coverage plan',
    features: ['Annual service included', 'All labour & parts covered', 'Free call-out', 'Priority same-day booking', 'Courtesy scooter available', '24/7 breakdown helpline'],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Premium Cover',
    price: '$29.99/mo',
    description: 'The ultimate protection package',
    features: ['Annual service included', 'All labour & parts covered', 'Free call-out', 'Priority same-day booking', 'Courtesy scooter guaranteed', '24/7 breakdown helpline', 'Battery replacement included', 'Accident damage cover'],
    highlight: false,
  },
];

export default function Services() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Services &amp; Repairs</span></nav>
          <h1>Services &amp; Repairs</h1>
          <p>Expert care for your mobility scooter — from routine annual servicing to emergency repairs and battery replacement, all across the US.</p>
        </div>
      </div>

      {/* Trust strip */}
      <div className="services-trust-strip">
        <div className="container">
          <div className="trust-strip-inner">
            {[
              { icon: <ShieldCheck size={18} />, text: '90-day labour warranty on all repairs' },
              { icon: <Star size={18} />, text: '4.9 star rated service' },
              { icon: <Home size={18} />, text: 'We come to you — free home visits' },
              { icon: <Phone size={18} />, text: '7-day support: 1-800-555-0199' },
            ].map(item => (
              <div key={item.text} className="trust-strip-item">
                <div className="trust-strip-icon">{item.icon}</div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">Our Services</span>
            <h2 className="section-title">Professional Scooter Care</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>From routine maintenance to complex repairs, our certified technicians handle it all with care and expertise.</p>
          </div>

          <div className="services-grid">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="service-card-header">
                  <div className="service-card-icon">{s.icon}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <div className="service-card-meta">
                      <span className="service-price">{s.price}</span>
                      <span className="service-duration">· {s.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="service-card-desc">{s.description}</p>
                <div className="service-includes">
                  <div className="service-includes-label">What's included:</div>
                  <ul>
                    {s.includes.map(item => (
                      <li key={item}>
                        <CheckCircle size={13} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/contact" className="btn btn-outline btn-sm service-book-btn">
                  Book This Service <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Plans */}
      <section className="section" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="text-center section-header">
            <span className="section-label">Monthly Plans</span>
            <h2 className="section-title">Service Care Plans</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Spread the cost of servicing and get complete peace of mind with one of our monthly care plans.</p>
          </div>

          <div className="plans-grid">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`plan-card ${plan.highlight ? 'plan-card-featured' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">{plan.price}</div>
                <p className="plan-desc">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map(f => (
                    <li key={f}>
                      <CheckCircle size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`btn w-full ${plan.highlight ? 'btn-white' : 'btn-primary'}`}
                  style={{ justifyContent: 'center' }}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container text-center">
          <h2 style={{ fontSize: 30, marginBottom: 12 }}>Book Your Service Today</h2>
          <p style={{ color: 'var(--color-gray-500)', marginBottom: 28 }}>Call us or use the contact form and one of our team will arrange a convenient time for you.</p>
          <div className="flex-center gap-3">
            <Link to="/contact" className="btn btn-accent btn-lg">Book Online <ArrowRight size={16} /></Link>
            <a href="tel:18005550199" className="btn btn-outline btn-lg"><Phone size={16} /> 1-800-555-0199</a>
          </div>
        </div>
      </section>
    </div>
  );
}
