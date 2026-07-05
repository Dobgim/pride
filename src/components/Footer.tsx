import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, MessageCircle, Camera, PlayCircle, Zap, ArrowRight } from 'lucide-react';
import './Footer.css';

const footerLinks = {
  scooters: [
    { label: 'All Mobility Scooters', path: '/mobility-scooters' },
    { label: 'Lightweight Scooters', path: '/lightweight-scooters' },
    { label: 'Folding Scooters', path: '/folding-scooters' },
    { label: 'Road Scooters', path: '/road-scooters' },
    { label: 'Accessories', path: '/accessories' },
  ],
  support: [
    { label: 'Services & Repairs', path: '/services' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Delivery Information', path: '/contact' },
    { label: 'Returns Policy', path: '/faq' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/about' },
    { label: 'Testimonials', path: '/about' },
    { label: 'Press & Media', path: '/about' },
    { label: 'Careers', path: '/about' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-text">
              <h3>Not sure which scooter is right for you?</h3>
              <p>Our mobility experts are here to help. Free advice, no obligation.</p>
            </div>
            <div className="footer-cta-actions">
              <Link to="/contact" className="btn btn-white">
                Get Free Advice <ArrowRight size={16} />
              </Link>
              <a href="tel:08001234567" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
                <Phone size={16} /> 0800 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <Zap size={18} />
                </div>
                <div className="logo-text">
                  <span className="logo-brand">Care Drive</span>
                  <span className="logo-sub">Enclosed Mobility</span>
                </div>
              </div>
              <p className="footer-tagline">
                Helping people stay independent, active, and mobile for over 20 years. Trusted by thousands of customers across the UK.
              </p>
              <div className="footer-contact-items">
                <a href="tel:08001234567" className="footer-contact-item">
                  <Phone size={14} />
                  <span>0800 123 4567</span>
                </a>
                <a href="mailto:info@caredrivemobility.co.uk" className="footer-contact-item">
                  <Mail size={14} />
                  <span>info@caredrivemobility.co.uk</span>
                </a>
                <div className="footer-contact-item">
                  <MapPin size={14} />
                  <span>Units 1–4 Mobility House, Leeds LS1 4BR</span>
                </div>
              </div>
              <div className="footer-social">
                {[
                  { Icon: Share2, label: 'Facebook' },
                  { Icon: MessageCircle, label: 'Twitter' },
                  { Icon: Camera, label: 'Instagram' },
                  { Icon: PlayCircle, label: 'YouTube' },
                ].map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="social-btn">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="footer-links-col">
              <h4>Our Scooters</h4>
              <ul>
                {footerLinks.scooters.map((l) => (
                  <li key={l.path + l.label}>
                    <Link to={l.path}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((l) => (
                  <li key={l.path + l.label}>
                    <Link to={l.path}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>Company</h4>
              <ul>
                {footerLinks.company.map((l) => (
                  <li key={l.path + l.label}>
                    <Link to={l.path}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} Care Drive Enclosed Mobility Ltd. All rights reserved. Registered in England & Wales No. 12345678.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Terms of Use</a>
              <span>|</span>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
