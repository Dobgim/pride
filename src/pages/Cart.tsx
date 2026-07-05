import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShieldCheck, Truck, RotateCcw, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const WHATSAPP_NUMBER = '19125589673';

type PaymentOption = 'full' | 'down';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [paymentOption, setPaymentOption] = useState<PaymentOption | null>(null);
  const [paymentError, setPaymentError] = useState(false);

  // Always free shipping
  const grandTotal = total;
  const downPayment = total * 0.3; // 30% down payment

  const handleWhatsAppCheckout = () => {
    if (!paymentOption) {
      setPaymentError(true);
      document.getElementById('payment-options')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setPaymentError(false);

    const itemLines = items
      .map(i => `• ${i.product.name} x${i.quantity} — $${(i.product.price * i.quantity).toLocaleString()}`)
      .join('\n');

    const paymentLine =
      paymentOption === 'full'
        ? `*Payment: Full Payment — $${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}*`
        : `*Payment: Down Payment (30%) — $${downPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}* (Balance: $${(grandTotal - downPayment).toLocaleString(undefined, { minimumFractionDigits: 2 })})`;

    const message = encodeURIComponent(
      `Hello Care Drive! I'd like to order the following:\n\n${itemLines}\n\nDelivery: FREE (3-Day Shipping)\n*Order Total: $${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}*\n\n${paymentLine}\n\nPlease confirm my order. Thank you!`
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

              {/* Free Shipping Banner */}
              <div className="cart-free-shipping-banner">
                <Truck size={18} />
                <div>
                  <div className="cart-shipping-title">FREE 3-Day Shipping</div>
                  <div className="cart-shipping-sub">All orders ship free — delivered in 3 business days</div>
                </div>
              </div>

              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span className="free-delivery">FREE</span>
                </div>
                <div className="cart-summary-divider" />
                <div className="cart-summary-row cart-summary-total">
                  <span>Order Total</span>
                  <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* ── Payment Options ── */}
              <div id="payment-options" className={`cart-payment-section ${paymentError ? 'cart-payment-error' : ''}`}>
                <div className="cart-payment-label">
                  <CheckCircle size={15} />
                  Choose Payment Option *
                </div>
                {paymentError && (
                  <div className="cart-payment-error-msg">Please select a payment option before checkout.</div>
                )}

                {/* Full Payment */}
                <label
                  className={`cart-payment-option ${paymentOption === 'full' ? 'selected' : ''}`}
                  onClick={() => { setPaymentOption('full'); setPaymentError(false); }}
                >
                  <div className="cart-payment-radio">
                    <div className={`cart-radio-dot ${paymentOption === 'full' ? 'active' : ''}`} />
                  </div>
                  <div className="cart-payment-option-body">
                    <div className="cart-payment-option-title">💳 Full Payment</div>
                    <div className="cart-payment-option-desc">Pay the full amount today</div>
                    <div className="cart-payment-option-amount">
                      ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </label>

                {/* Down Payment */}
                <label
                  className={`cart-payment-option ${paymentOption === 'down' ? 'selected' : ''}`}
                  onClick={() => { setPaymentOption('down'); setPaymentError(false); }}
                >
                  <div className="cart-payment-radio">
                    <div className={`cart-radio-dot ${paymentOption === 'down' ? 'active' : ''}`} />
                  </div>
                  <div className="cart-payment-option-body">
                    <div className="cart-payment-option-title">🤝 Down Payment (30%)</div>
                    <div className="cart-payment-option-desc">
                      Pay 30% now — balance on delivery
                    </div>
                    <div className="cart-payment-option-amount">
                      ${downPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      <span className="cart-payment-balance"> + ${(grandTotal - downPayment).toLocaleString(undefined, { minimumFractionDigits: 2 })} on delivery</span>
                    </div>
                  </div>
                </label>
              </div>

              {/* ── Accepted Payment Methods ── */}
              <div className="cart-payment-methods">
                <div className="cart-payment-methods-label">We Accept</div>
                <div className="cart-payment-methods-icons">
                  {/* Zelle */}
                  <div className="cart-pay-badge" title="Zelle">
                    <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="22">
                      <rect width="60" height="24" rx="5" fill="#6D1ED4"/>
                      <text x="30" y="16.5" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.5">Zelle</text>
                    </svg>
                  </div>
                  {/* Cash App */}
                  <div className="cart-pay-badge" title="Cash App">
                    <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="22">
                      <rect width="60" height="24" rx="5" fill="#00D54B"/>
                      <text x="30" y="16.5" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="10" letterSpacing="0.3">Cash App</text>
                    </svg>
                  </div>
                  {/* Chime */}
                  <div className="cart-pay-badge" title="Chime">
                    <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="22">
                      <rect width="60" height="24" rx="5" fill="#1EC677"/>
                      <text x="30" y="16.5" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.3">Chime</text>
                    </svg>
                  </div>
                  {/* Apple Pay */}
                  <div className="cart-pay-badge" title="Apple Pay">
                    <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="22">
                      <rect width="60" height="24" rx="5" fill="#000000"/>
                      <text x="30" y="16.5" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="10" letterSpacing="0.2"> Pay</text>
                      <text x="22" y="16.5" textAnchor="middle" fill="white" fontFamily="-apple-system,sans-serif" fontWeight="700" fontSize="11"></text>
                      <path d="M18 8.5c.6-.7 1-1.6.9-2.5-.9.1-2 .6-2.6 1.3-.5.6-1 1.5-.9 2.4.9.1 1.9-.4 2.6-1.2zM18.9 9.8c-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.7-1.5.0-2.8.9-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.1 0 1.9-1 2.7-2 .8-1.2 1.2-2.3 1.2-2.3 0 0-2.3-.9-2.3-3.4 0-2.2 1.8-3.2 1.8-3.2-.9-1.4-2.5-1.2-2.9-1.2z" fill="white" transform="translate(10, -6) scale(0.7)"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <button
                className="btn btn-accent btn-lg w-full"
                style={{ justifyContent: 'center', background: '#25d366', borderColor: '#25d366', marginTop: 16 }}
                onClick={handleWhatsAppCheckout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white" style={{flexShrink:0}}>
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.462 2.025 7.756L0 32l8.466-2.217A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.315 22.292c-.35.98-2.03 1.88-2.793 1.95-.713.065-1.384.322-4.666-1.037-3.93-1.63-6.453-5.65-6.646-5.91-.193-.26-1.576-2.098-1.576-4.002s.998-2.84 1.354-3.23c.356-.39.776-.488 1.034-.488.258 0 .516.002.742.013.237.012.556-.09.87.664.35.836 1.19 2.893 1.295 3.103.104.21.174.457.034.736-.14.28-.21.456-.42.703-.21.247-.44.551-.63.74-.21.21-.428.437-.185.857.243.42 1.08 1.78 2.32 2.884 1.596 1.42 2.943 1.86 3.363 2.07.42.21.664.175.908-.104.244-.28 1.048-1.225 1.328-1.645.28-.42.558-.35.94-.21.383.14 2.433 1.148 2.852 1.357.42.21.698.315.8.49.104.175.104 1.015-.246 1.995z"/>
                </svg>
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              {/* Trust badges */}
              <div className="cart-trust">
                <div className="cart-trust-item"><ShieldCheck size={16} /><span>Secure Checkout</span></div>
                <div className="cart-trust-item"><Truck size={16} /><span>Free 3-Day Shipping</span></div>
                <div className="cart-trust-item"><RotateCcw size={16} /><span>14-Day Returns</span></div>
              </div>

              <div className="cart-help">
                Need help? <a href="tel:+19125589673">Call +1 (912) 558-9673</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
