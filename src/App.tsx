import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import MobilityScooters from './pages/MobilityScooters';
import LightweightScooters from './pages/LightweightScooters';
import FoldingScooters from './pages/FoldingScooters';
import RoadScooters from './pages/RoadScooters';
import Accessories from './pages/Accessories';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.12, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/mobility-scooters" element={<MobilityScooters />} />
          <Route path="/lightweight-scooters" element={<LightweightScooters />} />
          <Route path="/folding-scooters" element={<FoldingScooters />} />
          <Route path="/road-scooters" element={<RoadScooters />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <div className="page-wrapper" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: 96, fontWeight: 900, color: 'var(--color-gray-200)', fontFamily: 'var(--font-heading)' }}>404</div>
      <h1 style={{ fontSize: 32 }}>Page Not Found</h1>
      <p style={{ color: 'var(--color-gray-500)', maxWidth: 360 }}>The page you're looking for doesn't exist or may have been moved.</p>
      <a href="/" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <CartDrawer />
    </>
  );
}
