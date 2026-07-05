import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Phone, Menu, X, ChevronDown, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Mobility Scooters',
    path: '/mobility-scooters',
    children: [
      { label: 'All Scooters', path: '/mobility-scooters', description: 'Browse our full range' },
      { label: 'Lightweight Scooters', path: '/lightweight-scooters', description: 'Easy to transport & store' },
      { label: 'Folding Scooters', path: '/folding-scooters', description: 'Compact & travel-ready' },
      { label: 'Road Scooters', path: '/road-scooters', description: 'Long range & all-terrain' },
    ],
  },
  { label: 'Accessories', path: '/accessories' },
  { label: 'Services & Repairs', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="navbar-topbar">
        <div className="container">
          <div className="navbar-topbar-inner">
            <div className="navbar-topbar-left">
              <span>Free US Delivery on orders over $500</span>
              <span className="topbar-dot">•</span>
              <span>Sales tax exempt in most states</span>
            </div>
            <div className="navbar-topbar-right">
              <Phone size={13} />
              <span>+1 (912) 558-9673</span>
              <span className="topbar-dot">•</span>
              <span>Mon–Sat 9am–6pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <div className="logo-icon">
                <Zap size={20} />
              </div>
              <div className="logo-text">
                <span className="logo-brand">Care Drive</span>
                <span className="logo-sub">Enclosed Mobility</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="navbar-nav">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="nav-item"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                  onMouseLeave={() => item.children && handleDropdownLeave()}
                >
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} className={`nav-chevron ${activeDropdown === item.label ? 'nav-chevron-open' : ''}`} />}
                    </Link>
                  ) : (
                    <span className="nav-link">
                      {item.label}
                      <ChevronDown size={14} className={`nav-chevron ${activeDropdown === item.label ? 'nav-chevron-open' : ''}`} />
                    </span>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        className="nav-dropdown"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onMouseEnter={() => handleDropdownEnter(item.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {item.children.map((child) => (
                          <Link key={child.path} to={child.path} className="dropdown-item">
                            <div className="dropdown-item-dot" />
                            <div>
                              <div className="dropdown-item-label">{child.label}</div>
                              {child.description && (
                                <div className="dropdown-item-desc">{child.description}</div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            {/* Right Actions */}
            <div className="navbar-actions">
              <Link to="/contact" className="btn btn-accent btn-sm navbar-cta">
                Get a Quote
              </Link>
              <button
                className="navbar-cart-btn"
                onClick={openCart}
                aria-label="Open cart"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <motion.span
                    className="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={itemCount}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
              <button
                className="navbar-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="mobile-menu-header">
                <div className="logo-text">
                  <span className="logo-brand">Care Drive</span>
                  <span className="logo-sub">Enclosed Mobility</span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <div className="mobile-menu-body">
                {navItems.map((item) => (
                  <div key={item.label} className="mobile-nav-item">
                    {item.children ? (
                      <>
                        <button
                          className="mobile-nav-link"
                          onClick={() =>
                            setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                          }
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`nav-chevron ${mobileExpanded === item.label ? 'nav-chevron-open' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              className="mobile-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.children.map((child) => (
                                <Link key={child.path} to={child.path} className="mobile-submenu-link">
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={item.path!} className={`mobile-nav-link ${isActive(item.path) ? 'mobile-nav-active' : ''}`}>
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mobile-menu-footer">
                <div className="mobile-contact-info">
                  <Phone size={16} />
                  <div>
                    <div className="mobile-phone">+1 (912) 558-9673</div>
                    <div className="mobile-hours">Mon–Sat 9am–6pm</div>
                  </div>
                </div>
                <Link to="/contact" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Get a Free Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
