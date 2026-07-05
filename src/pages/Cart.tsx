import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const trustItems = [
  { icon: <ShieldCheck size={16} />, text: 'Secure Checkout' },
  { icon: <Truck size={16} />, text: 'Free US Delivery over $500' },
  { icon: <RotateCcw size={16} />, text: '14-Day Returns' },
];

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="page-hero">
          <div className="container page-hero-content">
            <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Cart</span></nav>
            <h1>Your Cart</h1>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="cart-page-empty">
              <div className="cart-empty-icon-lg"><ShoppingCart size={64} /></div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any products to your cart yet. Browse our range to find the perfect scooter for you.</p>
              <div className="flex-center gap-3" style={{ flexWrap: 'wrap' }}>
                <Link to="/mobility-scooters" className="btn btn-primary btn-lg">
                  Shop Scooters <ArrowRight size={18} />
                </Link>
                <Link to="/accessories" className="btn btn-outline btn-lg">Browse Accessories</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const delivery = total >= 500 ? 0 : 49.99;
  const grandTotal = total + delivery;
  const vat = grandTotal * 0.2;

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Cart</span></nav>
          <h1>Your Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="cart-page-inner">
            {/* Items */}
            <div className="cart-page-items">
              <div className="cart-page-header">
                <span>Product</span>
                <span>Qty</span>
                <span>Total</span>
              </div>

              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.product.id}
                    className="cart-page-item"
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="cart-page-product">
                      <div className="cart-page-img">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="cart-page-details">
                        <div className="cart-page-name">{item.product.name}</div>
                        <div className="cart-page-unit-price">${item.product.price.toLocaleString()} each</div>
                        {item.product.inStock && (
                          <div className="cart-page-stock">
                            <span className="stock-dot" /> In stock
                          </div>
                        )}
                        <button
                          className="cart-page-remove"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-page-qty">
                      <div className="qty-control">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus size={14} /></button>
                      </div>
                    </div>

                    <div className="cart-page-total">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="cart-page-actions">
                <button className="btn btn-ghost btn-sm" onClick={clearCart}>
                  <Trash2 size={14} /> Clear Cart
                </button>
                <Link to="/mobility-scooters" className="btn btn-outline btn-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary */}
            <aside className="cart-summary">
              <h3 className="cart-summary-title">Order Summary</h3>

              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>US Delivery</span>
                  <span className={delivery === 0 ? 'free-delivery' : ''}>
                    {delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}
                  </span>
                </div>
                {delivery === 0 && (
                  <div className="cart-delivery-note">
                    <Truck size={13} /> Free delivery applied (orders over $500)
                  </div>
                )}
                <div className="cart-summary-divider" />
                <div className="cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="cart-vat-breakdown">Sales tax exempt for medical needs</div>
              </div>

              <button className="btn btn-accent btn-lg w-full" style={{ justifyContent: 'center' }}>
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              {/* Trust */}
              <div className="cart-trust">
                {trustItems.map(t => (
                  <div key={t.text} className="cart-trust-item">
                    {t.icon}<span>{t.text}</span>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <div className="cart-promo">
                <div className="form-group">
                  <label className="form-label" htmlFor="promo-code">Have a discount code?</label>
                  <div className="cart-promo-row">
                    <input id="promo-code" type="text" className="form-input" placeholder="Enter code" />
                    <button className="btn btn-primary btn-sm">Apply</button>
                  </div>
                </div>
              </div>

              <div className="cart-help">
                Need help? <a href="tel:18005550199">Call 1-800-555-0199</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
