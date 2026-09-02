import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, BadgeCheck, Play, X, Images, Loader2 } from 'lucide-react';
import { getDownPayment, loadProductById, type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductGallery from './ProductGallery';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  index?: number;
  showCategory?: boolean;
}

const categoryLabels: Record<string, string> = {
  lightweight: 'Lightweight',
  folding: 'Folding',
  road: 'Road Scooter',
  accessory: 'Accessory',
};

const badgeColors: Record<string, string> = {
  'Best Seller': 'badge-warning',
  'New': 'badge-success',
  'Top Rated': 'badge-primary',
  'Sale': 'badge-danger',
  'Premium': 'badge-primary',
  'Popular': 'badge-accent',
};

export default function ProductCard({ product, index = 0, showCategory = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(false);
  const [galleryImages, setGalleryImages] = React.useState<string[] | null>(null);
  const [galleryLoading, setGalleryLoading] = React.useState(false);
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const cardPath =
    product.category === 'accessory'
      ? '/accessories'
      : product.category === 'lightweight'
      ? '/lightweight-scooters'
      : product.category === 'folding'
      ? '/folding-scooters'
      : '/road-scooters';

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const displayImage = productImages[currentImgIndex] || product.image;
  const downPayment = getDownPayment(product);

  /**
   * Open the full gallery. Listing queries skip the `specs` column that carries
   * the extra photos, so when the card only knows the cover image we fetch the
   * full row on demand rather than bloating every listing request.
   */
  const openGallery = async () => {
    if (galleryLoading) return;

    if (productImages.length > 1) {
      setGalleryImages(productImages);
      return;
    }

    setGalleryLoading(true);
    try {
      const full = await loadProductById(product.id);
      const images = full?.images && full.images.length > 0 ? full.images : productImages;
      setGalleryImages(images);
    } catch {
      setGalleryImages(productImages);
    } finally {
      setGalleryLoading(false);
    }
  };

  return (
    <motion.article
      className="product-card card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Image */}
      <div className="product-card-image">
        {showVideo && product.video ? (
          <div className="product-card-video-wrap">
            <video
              src={product.video}
              controls
              autoPlay
              playsInline
              className="product-card-video"
            />
            <button
              className="product-card-video-close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowVideo(false);
              }}
              aria-label="Close video"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="product-card-image-btn"
            onClick={openGallery}
            aria-label={`View photos of ${product.name}`}
          >
            <img
              src={displayImage}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Mobility_Scooter_-_HPIM1842.JPG';
              }}
            />
            <span className="product-card-gallery-hint">
              {galleryLoading ? (
                <Loader2 size={13} className="product-card-gallery-spin" />
              ) : (
                <Images size={13} />
              )}
              {galleryLoading ? 'Loading…' : 'View photos'}
            </span>
          </button>
        )}

        {/* Play button if a video is available */}
        {product.video && !showVideo && (
          <button
            className="product-card-play-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowVideo(true);
            }}
            aria-label="Play product video"
          >
            <Play size={20} fill="currentColor" />
          </button>
        )}

        {/* Image dot navigation if multiple images */}
        {!showVideo && productImages.length > 1 && (
          <div className="product-card-img-dots">
            {productImages.map((_, idx) => (
              <button
                key={idx}
                className={`product-card-img-dot ${idx === currentImgIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImgIndex(idx);
                }}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="product-card-badges">
          {product.badge && (
            <span className={`badge ${badgeColors[product.badge] || 'badge-primary'}`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="badge badge-danger">-{discount}%</span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="product-card-actions">
          <Link to={cardPath} className="product-action-btn" title="View details">
            <Eye size={16} />
          </Link>
          <button className="product-action-btn" title="Save to wishlist">
            <Heart size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="product-card-body">
        {showCategory && (
          <span className="product-category-tag">{categoryLabels[product.category]}</span>
        )}

        <Link to={cardPath} className="product-card-name">
          {product.name}
        </Link>

        <p className="product-card-desc">{product.shortDesc}</p>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={13}
                className={i <= Math.round(product.rating) ? 'star-filled' : 'star-empty'}
                fill={i <= Math.round(product.rating) ? '#f59e0b' : 'none'}
              />
            ))}
          </div>
          <span className="rating-score">{product.rating.toFixed(1)}</span>
          <span className="rating-count">({product.reviews} reviews)</span>
        </div>

        {/* Features */}
        {product.features.slice(0, 3).map((f) => (
          <div key={f} className="product-feature">
            <BadgeCheck size={13} className="feature-icon" />
            <span>{f}</span>
          </div>
        ))}

        {/* Price & CTA */}
        <div className="product-card-footer">
          <div className="product-price">
            <span className="price-current">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="price-original">${product.originalPrice.toLocaleString()}</span>
            )}
            <span className="price-down">
              or ${downPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} down
            </span>
          </div>
          <button
            className="btn btn-primary btn-sm product-add-btn"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>

        {galleryImages && (
          <ProductGallery
            images={galleryImages}
            productName={product.name}
            startIndex={Math.min(currentImgIndex, galleryImages.length - 1)}
            onClose={() => setGalleryImages(null)}
          />
        )}

        {product.inStock ? (
          <div className="product-stock in-stock">In stock — ready to ship</div>
        ) : (
          <div className="product-stock out-of-stock">Out of stock</div>
        )}
      </div>
    </motion.article>
  );
}
