import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductGallery.css';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  startIndex?: number;
  onClose: () => void;
}

const FALLBACK_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/e/ea/Mobility_Scooter_-_HPIM1842.JPG';

/**
 * Full-screen photo viewer opened by tapping a product image.
 * Arrow keys / on-screen arrows / swipe move between shots, Escape closes.
 */
export default function ProductGallery({
  images,
  productName,
  startIndex = 0,
  onClose,
}: ProductGalleryProps) {
  const shots = images.length > 0 ? images : [FALLBACK_IMAGE];
  const [index, setIndex] = React.useState(Math.min(startIndex, shots.length - 1));
  const touchStartX = React.useRef<number | null>(null);

  const go = React.useCallback(
    (delta: number) => setIndex(i => (i + delta + shots.length) % shots.length),
    [shots.length]
  );

  // Keyboard navigation, and keep the page behind the overlay from scrolling.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return createPortal(
    <motion.div
      className="gallery-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} photo gallery`}
    >
      <button className="gallery-close" onClick={onClose} aria-label="Close gallery">
        <X size={22} />
      </button>

      <div className="gallery-title">{productName}</div>

      <div
        className="gallery-stage"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {shots.length > 1 && (
          <button
            className="gallery-nav gallery-nav-prev"
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            <ChevronLeft size={26} />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={shots[index]}
            alt={`${productName} — photo ${index + 1} of ${shots.length}`}
            className="gallery-image"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onError={e => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
        </AnimatePresence>

        {shots.length > 1 && (
          <button
            className="gallery-nav gallery-nav-next"
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            <ChevronRight size={26} />
          </button>
        )}
      </div>

      {shots.length > 1 && (
        <div className="gallery-counter">
          {index + 1} / {shots.length}
        </div>
      )}

      {shots.length > 1 && (
        <div className="gallery-thumbs" onClick={e => e.stopPropagation()}>
          {shots.map((src, i) => (
            <button
              key={`${src}-${i}`}
              className={`gallery-thumb ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === index}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
}
