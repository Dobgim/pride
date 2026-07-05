import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();

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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="cart-item-image">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="cart-item-details">
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
                <p className="cart-vat-note">Sales tax exempt in most states. Free US delivery on orders over $500.</p>
                <Link
                  to="/cart"
                  className="btn btn-primary w-full"
                  style={{ justifyContent: 'center' }}
                  onClick={closeCart}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
                <button className="btn btn-ghost w-full" style={{ justifyContent: 'center' }} onClick={closeCart}>
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
