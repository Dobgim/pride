import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../data/faqs';
import './FAQAccordion.css';

interface FAQAccordionProps {
  faqs: FAQ[];
  showCategories?: boolean;
}

export default function FAQAccordion({ faqs, showCategories = false }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = showCategories
    ? [...new Set(faqs.map((f) => f.category))]
    : [];

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  const renderItem = (faq: FAQ) => (
    <div
      key={faq.id}
      className={`faq-item ${openId === faq.id ? 'faq-item-open' : ''}`}
    >
      <button
        className="faq-question"
        onClick={() => toggle(faq.id)}
        aria-expanded={openId === faq.id}
      >
        <span>{faq.question}</span>
        <motion.div
          className="faq-icon"
          animate={{ rotate: openId === faq.id ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {openId === faq.id && (
          <motion.div
            className="faq-answer-wrapper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (showCategories && categories.length > 0) {
    return (
      <div className="faq-accordion">
        {categories.map((cat) => (
          <div key={cat} className="faq-category-group">
            <h3 className="faq-category-label">{cat}</h3>
            <div className="faq-list">
              {faqs.filter((f) => f.category === cat).map(renderItem)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="faq-accordion">
      <div className="faq-list">
        {faqs.map(renderItem)}
      </div>
    </div>
  );
}
