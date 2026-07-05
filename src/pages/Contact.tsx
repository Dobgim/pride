import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const contactInfo = [
  { icon: <Phone size={20} />, label: 'Phone', value: '+1 (912) 558-9673', sub: 'Mon–Sat 9am–6pm', href: 'tel:+19125589673' },
  { icon: <Mail size={20} />, label: 'Email', value: 'caredriveenclosedmobility@gmail.com', sub: 'We reply within 24 hours', href: 'mailto:caredriveenclosedmobility@gmail.com' },
  { icon: <MapPin size={20} />, label: 'Address', value: '3606 Norwich Street', sub: 'Brunswick, Georgia 31520' },
  { icon: <Clock size={20} />, label: 'Opening Hours', value: 'Mon–Sat: 9am – 6pm', sub: 'Sunday: Closed' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: 'General Enquiry', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Contact</span></nav>
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Whether you have a question about a product, need servicing advice, or want to arrange a free home demonstration — we're here.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-page-inner">
            {/* Form */}
            <motion.div
              className="contact-form-wrap"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Send Us a Message</h2>
              <p className="contact-form-sub">Fill in the form below and one of our mobility specialists will get back to you within one business day.</p>

              {submitted ? (
                <motion.div
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={48} />
                  <h3>Message Received!</h3>
                  <p>Thank you for getting in touch. A member of our team will respond to you within one business day.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="07700 000 000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-subject">Subject *</label>
                      <select
                        id="contact-subject"
                        name="subject"
                        className="form-input"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option>General Enquiry</option>
                        <option>Product Question</option>
                        <option>Request a Home Demo</option>
                        <option>Book a Service</option>
                        <option>Order & Delivery</option>
                        <option>Returns & Refunds</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent btn-lg"
                    disabled={loading}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {loading ? (
                      <span className="contact-spinner" />
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info sidebar */}
            <motion.aside
              className="contact-info-aside"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="contact-info-cards">
                {contactInfo.map(item => (
                  <div key={item.label} className="contact-info-card">
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-label">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="contact-info-value link">{item.value}</a>
                      ) : (
                        <div className="contact-info-value">{item.value}</div>
                      )}
                      <div className="contact-info-sub">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="contact-map">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c97b?w=600&q=80"
                  alt="Map of Care Drive Enclosed Mobility head office"
                />
                <div className="contact-map-overlay">
                  <MapPin size={24} />
                  <span>Austin, TX 78701</span>
                </div>
              </div>

              <div className="contact-demo-cta">
                <h3>Want a free home demonstration?</h3>
                <p>Our specialists can bring a selection of scooters directly to your home — completely free with no obligation to buy.</p>
                <a href="tel:18005550199" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  <Phone size={15} /> Call to Arrange
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
