import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const WHATSAPP_NUMBER = '19125589673';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();

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
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{ zIndex: 700 }}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingCart size={20} />
                <span>Your Cart</span>
                {itemCount > 0 && <span className="cart-count-pill">{itemCount}</span>}
              </div>
              <button className="cart-close" onClick={closeCart} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="cart-body">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">
                    <ShoppingCart size={48} />
                  </div>
                  <h3>Your cart is empty</h3>
                  <p>Browse our range of premium mobility scooters and accessories.</p>
                  <button className="btn btn-primary" onClick={closeCart}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="cart-items">
                  {items.map((item) => (
                    <motion.li
                      key={item.product.id}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="cart-item-img">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.product.name}</div>
                        <div className="cart-item-price">${item.product.price.toLocaleString()}</div>
                        <div className="cart-item-controls">
                          <div className="qty-control">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <button
                            className="cart-remove"
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-total">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span className="subtotal-amount">${total.toLocaleString()}</span>
                </div>
                <p className="cart-vat-note">
                  Sales tax exempt in most states. Free US delivery on orders over $500.
                </p>
                <button
                  className="btn btn-primary w-full"
                  style={{ justifyContent: 'center', background: '#25d366', borderColor: '#25d366' }}
                  onClick={handleWhatsAppCheckout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width="16"
                    height="16"
                    fill="white"
                    style={{ flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.462 2.025 7.756L0 32l8.466-2.217A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.315 22.292c-.35.98-2.03 1.88-2.793 1.95-.713.065-1.384.322-4.666-1.037-3.93-1.63-6.453-5.65-6.646-5.91-.193-.26-1.576-2.098-1.576-4.002s.998-2.84 1.354-3.23c.356-.39.776-.488 1.034-.488.258 0 .516.002.742.013.237.012.556-.09.87.664.35.836 1.19 2.893 1.295 3.103.104.21.174.457.034.736-.14.28-.21.456-.42.703-.21.247-.44.551-.63.74-.21.21-.428.437-.185.857.243.42 1.08 1.78 2.32 2.884 1.596 1.42 2.943 1.86 3.363 2.07.42.21.664.175.908-.104.244-.28 1.048-1.225 1.328-1.645.28-.42.558-.35.94-.21.383.14 2.433 1.148 2.852 1.357.42.21.698.315.8.49.104.175.104 1.015-.246 1.995z" />
                  </svg>
                  Order via WhatsApp <ArrowRight size={16} />
                </button>
                <button
                  className="btn btn-ghost w-full"
                  style={{ justifyContent: 'center' }}
                  onClick={closeCart}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
