import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const WHATSAPP_NUMBER = '19125589673';

const trustItems = [
  { icon: <ShieldCheck size={16} />, text: 'Secure Checkout' },
  { icon: <Truck size={16} />, text: 'Free US Delivery over $500' },
  { icon: <RotateCcw size={16} />, text: '14-Day Returns' },
];

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const delivery = total >= 500 ? 0 : 49.99;
    const grandTotal = total + delivery;
    const itemLines = items
      .map(i => `• ${i.product.name} x${i.quantity} — $${(i.product.price * i.quantity).toLocaleString()}`)
      .join('\n');
    const deliveryLine = delivery === 0 ? 'Delivery: FREE (over $500)' : `Delivery: $${delivery.toFixed(2)}`;
    const message = encodeURIComponent(
      `Hello Care Drive! I'd like to order the following:\n\n${itemLines}\n\n${deliveryLine}\n*Total: $${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}*\n\nPlease confirm my order. Thank you!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

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

              <button
                className="btn btn-accent btn-lg w-full"
                style={{ justifyContent: 'center', background: '#25d366', borderColor: '#25d366' }}
                onClick={handleWhatsAppCheckout}
              >
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white" style={{flexShrink:0}}><path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.462 2.025 7.756L0 32l8.466-2.217A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.315 22.292c-.35.98-2.03 1.88-2.793 1.95-.713.065-1.384.322-4.666-1.037-3.93-1.63-6.453-5.65-6.646-5.91-.193-.26-1.576-2.098-1.576-4.002s.998-2.84 1.354-3.23c.356-.39.776-.488 1.034-.488.258 0 .516.002.742.013.237.012.556-.09.87.664.35.836 1.19 2.893 1.295 3.103.104.21.174.457.034.736-.14.28-.21.456-.42.703-.21.247-.44.551-.63.74-.21.21-.428.437-.185.857.243.42 1.08 1.78 2.32 2.884 1.596 1.42 2.943 1.86 3.363 2.07.42.21.664.175.908-.104.244-.28 1.048-1.225 1.328-1.645.28-.42.558-.35.94-.21.383.14 2.433 1.148 2.852 1.357.42.21.698.315.8.49.104.175.104 1.015-.246 1.995z"/></svg>
                Order via WhatsApp <ArrowRight size={18} />
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
