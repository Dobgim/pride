import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShieldCheck, Truck, RotateCcw, CheckCircle, X, Send, User, Mail, Phone, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { addOrderToSupabase, type Order } from '../data/orders';
import './Cart.css';

type PaymentOption = 'full' | 'down';

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
};

type CheckoutStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [paymentOption, setPaymentOption] = useState<PaymentOption | null>(null);
  const [paymentError, setPaymentError] = useState(false);

  // Checkout modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({ name: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState<Partial<CheckoutForm>>({});
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>('idle');

  // Always free shipping
  const grandTotal = total;
  const downPayment = total * 0.3; // 30% down payment

  const handleProceedToCheckout = () => {
    if (!paymentOption) {
      setPaymentError(true);
      document.getElementById('payment-options')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setPaymentError(false);
    setShowModal(true);
  };

  const validateForm = () => {
    const errors: Partial<CheckoutForm> = {};
    if (!form.name.trim()) errors.name = 'Full name is required';
    if (!form.email.trim()) errors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
    if (!form.phone.trim()) errors.phone = 'Phone number is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setCheckoutStatus('sending');

    const itemLines = items
      .map(i => `• ${i.product.name} x${i.quantity} — $${(i.product.price * i.quantity).toLocaleString()}`)
      .join('\n');

    const paymentSummary =
      paymentOption === 'full'
        ? `Full Payment — $${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        : `Down Payment (30%) — $${downPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })} | Balance on delivery: $${(grandTotal - downPayment).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const messageBody = `
NEW ORDER RECEIVED — Care Drive Mobility

Customer Details:
  Name:   ${form.name}
  Email:  ${form.email}
  Phone:  ${form.phone}

Order Items:
${itemLines}

Delivery: FREE 3-Day Shipping
Order Total: $${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
Payment Option: ${paymentSummary}
    `.trim();

    // Persist the order to Supabase so it appears in the admin dashboard.
    // Best-effort: a DB hiccup must not block the confirmation email.
    const order: Order = {
      id: `ORD-${Date.now()}`,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      items: items.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      subtotal: total,
      total: grandTotal,
      paymentOption: paymentOption as 'full' | 'down',
      downPayment: paymentOption === 'down' ? downPayment : undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    try {
      await addOrderToSupabase(order);
    } catch (err) {
      console.error('Failed to save order to Supabase:', err);
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '4a1a9b50-34cc-4fac-acf7-22ed8c5f7149',
          subject: `🛒 New Order from ${form.name} — $${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          from_name: form.name,
          email: form.email,
          message: messageBody,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCheckoutStatus('success');
        clearCart();
      } else {
        setCheckoutStatus('error');
      }
    } catch {
      setCheckoutStatus('error');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ name: '', email: '', phone: '' });
    setFormErrors({});
    if (checkoutStatus !== 'success') setCheckoutStatus('idle');
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
    <>
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
                className="btn btn-primary btn-lg w-full"
                style={{ justifyContent: 'center', marginTop: 16 }}
                onClick={handleProceedToCheckout}
              >
                <ShieldCheck size={18} />
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

    {/* ── Checkout Modal ── */}
    <AnimatePresence>
      {showModal && (
        <div className="checkout-modal-wrapper">
          <motion.div
            className="checkout-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={checkoutStatus !== 'sending' ? closeModal : undefined}
          />
          <motion.div
            className="checkout-modal"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Checkout form"
          >
            {/* Close */}
            {checkoutStatus !== 'sending' && (
              <button className="checkout-modal-close" onClick={closeModal} aria-label="Close">
                <X size={20} />
              </button>
            )}

            {/* Success state */}
            {checkoutStatus === 'success' ? (
              <motion.div
                className="checkout-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="checkout-success-icon">
                  <CheckCircle size={56} />
                </div>
                <h2>Order Placed!</h2>
                <p>Thank you for your order. We've received your details and will contact you shortly to confirm your purchase.</p>
                <Link to="/" className="btn btn-primary" onClick={closeModal}>
                  Back to Home <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="checkout-modal-header">
                  <div className="checkout-modal-icon"><Package size={24} /></div>
                  <div>
                    <h2 className="checkout-modal-title">Complete Your Order</h2>
                    <p className="checkout-modal-subtitle">Fill in your details and we'll confirm your order</p>
                  </div>
                </div>

                {/* Order summary strip */}
                <div className="checkout-order-summary">
                  <div className="checkout-order-items">
                    {items.map(i => (
                      <div key={i.product.id} className="checkout-order-item">
                        <img src={i.product.image} alt={i.product.name} />
                        <div className="checkout-order-item-info">
                          <span className="checkout-order-item-name">{i.product.name}</span>
                          <span className="checkout-order-item-qty">x{i.quantity}</span>
                        </div>
                        <span className="checkout-order-item-price">
                          ${(i.product.price * i.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="checkout-order-total">
                    <span>Order Total</span>
                    <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="checkout-payment-badge">
                    {paymentOption === 'full' ? '💳 Full Payment' : `🤝 Down Payment — $${downPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmitOrder} className="checkout-form" noValidate>
                  <div className={`checkout-field ${formErrors.name ? 'has-error' : ''}`}>
                    <label htmlFor="checkout-name"><User size={14} /> Full Name</label>
                    <input
                      id="checkout-name"
                      type="text"
                      placeholder="e.g. John Smith"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      autoComplete="name"
                    />
                    {formErrors.name && <span className="checkout-field-error">{formErrors.name}</span>}
                  </div>

                  <div className={`checkout-field ${formErrors.email ? 'has-error' : ''}`}>
                    <label htmlFor="checkout-email"><Mail size={14} /> Email Address</label>
                    <input
                      id="checkout-email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      autoComplete="email"
                    />
                    {formErrors.email && <span className="checkout-field-error">{formErrors.email}</span>}
                  </div>

                  <div className={`checkout-field ${formErrors.phone ? 'has-error' : ''}`}>
                    <label htmlFor="checkout-phone"><Phone size={14} /> Phone Number</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="e.g. +1 (555) 000-0000"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      autoComplete="tel"
                    />
                    {formErrors.phone && <span className="checkout-field-error">{formErrors.phone}</span>}
                  </div>

                  {checkoutStatus === 'error' && (
                    <div className="checkout-submit-error">
                      Something went wrong. Please try again or call us at +1 (912) 558-9673.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full"
                    style={{ justifyContent: 'center', marginTop: 8 }}
                    disabled={checkoutStatus === 'sending'}
                  >
                    {checkoutStatus === 'sending' ? (
                      <><span className="checkout-spinner" /> Placing Order…</>
                    ) : (
                      <><Send size={16} /> Place Order</>
                    )}
                  </button>

                  <p className="checkout-disclaimer">
                    <ShieldCheck size={13} /> Your info is secure. We'll reach out to confirm delivery details.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
