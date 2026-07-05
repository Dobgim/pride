import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion';
import { faqs } from '../data/faqs';
import './FAQ.css';

export default function FAQ() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>FAQ</span></nav>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to the most common questions about buying, using, financing, and maintaining your mobility scooter.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="faq-page-inner">
            {/* Left: accordion */}
            <div className="faq-page-main">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FAQAccordion faqs={faqs} showCategories />
              </motion.div>
            </div>

            {/* Right: sidebar */}
            <aside className="faq-page-sidebar">
              <div className="faq-sidebar-card">
                <h3>Still have a question?</h3>
                <p>Our friendly team of mobility specialists are available 7 days a week to help you find the right scooter and answer any question you may have.</p>
                <a href="tel:18005550199" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Call 1-800-555-0199
                </a>
                <Link to="/contact" className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>
                  Send a Message <ArrowRight size={15} />
                </Link>
              </div>

              <div className="faq-sidebar-card faq-sidebar-hours">
                <h4>Opening Hours</h4>
                <ul>
                  <li><span>Monday – Friday</span><span>9am – 6pm</span></li>
                  <li><span>Saturday</span><span>10am – 5pm</span></li>
                  <li><span>Sunday</span><span>Closed</span></li>
                </ul>
              </div>

              <div className="faq-sidebar-card">
                <h4>Quick Links</h4>
                <div className="faq-sidebar-links">
                  {[
                    { label: 'Shop All Scooters', path: '/mobility-scooters' },
                    { label: 'Book a Service', path: '/services' },
                    { label: 'Delivery Information', path: '/contact' },
                    { label: 'Returns Policy', path: '/contact' },
                    { label: 'About Us', path: '/about' },
                  ].map(l => (
                    <Link key={l.path + l.label} to={l.path} className="faq-sidebar-link">
                      <ArrowRight size={13} />{l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
