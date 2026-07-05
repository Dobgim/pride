import { supabase } from '../supabaseClient';

export interface Product {
  id: string;
  name: string;
  category: 'lightweight' | 'folding' | 'road' | 'accessory';
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  badge?: string;
  shortDesc: string;
  features: string[];
  specs: Record<string, string>;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ls-1',
    name: 'SlimLine 3 Plus',
    category: 'lightweight',
    price: 899,
    originalPrice: 1099,
    image: '/images/folding_lightweight.png',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    shortDesc: 'Ultra-lightweight 3-wheel scooter. Perfect for everyday errands and travel.',
    features: [
      'Only 19kg total weight',
      'Disassembles in 3 easy parts',
      'Up to 25km range per charge',
      'LED lighting front & rear',
      'Comfortable padded seat',
    ],
    specs: {
      Weight: '19 kg',
      'Max Speed': '6 km/h',
      Range: '25 km',
      'Max Load': '115 kg',
      'Turning Radius': '1.05 m',
      'Battery': '12V 12Ah',
    },
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'ls-2',
    name: 'TravelLite 4',
    category: 'lightweight',
    price: 1149,
    image: '/images/folding_lightweight.png',
    rating: 4.7,
    reviews: 89,
    badge: 'New',
    shortDesc: '4-wheel stability meets featherweight design. Ideal for shopping and daily use.',
    features: [
      '4-wheel stability system',
      'Tool-free disassembly',
      'Basket & tiller bag included',
      'Puncture-proof tyres',
      'Key ignition & LED display',
    ],
    specs: {
      Weight: '22 kg',
      'Max Speed': '6 km/h',
      Range: '30 km',
      'Max Load': '120 kg',
      'Turning Radius': '1.2 m',
      'Battery': '12V 20Ah',
    },
    inStock: true,
    isNew: true,
  },
  {
    id: 'ls-3',
    name: 'EasyGo S3',
    category: 'lightweight',
    price: 749,
    image: '/images/folding_lightweight.png',
    rating: 4.5,
    reviews: 56,
    shortDesc: 'Entry-level lightweight scooter. Simple, reliable, and affordable.',
    features: [
      'Simple single-key start',
      'Adjustable tiller',
      'Foldable tiller for compact storage',
      'Anti-tip rear wheels',
      '1-year manufacturer warranty',
    ],
    specs: {
      Weight: '21 kg',
      'Max Speed': '6 km/h',
      Range: '20 km',
      'Max Load': '100 kg',
      'Turning Radius': '1.15 m',
      'Battery': '12V 12Ah',
    },
    inStock: true,
  },
  {
    id: 'fs-1',
    name: 'FoldPro Ultra',
    category: 'folding',
    price: 1499,
    originalPrice: 1799,
    image: '/images/folding_lightweight.png',
    rating: 4.9,
    reviews: 203,
    badge: 'Top Rated',
    shortDesc: 'The ultimate fold-and-go scooter. Folds in seconds, fits in your car boot.',
    features: [
      'Single-button fold mechanism',
      'Airline-approved lithium battery',
      'Integrated carry handle',
      'Pneumatic front tyre',
      'App-enabled smart controls',
    ],
    specs: {
      Weight: '24 kg',
      'Max Speed': '8 km/h',
      Range: '35 km',
      'Max Load': '130 kg',
      'Folded Size': '110 × 50 × 80 cm',
      'Battery': 'Li-Ion 36V 10Ah',
    },
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'fs-2',
    name: 'Compact Fold 3',
    category: 'folding',
    price: 1199,
    image: '/images/folding_lightweight.png',
    rating: 4.6,
    reviews: 77,
    shortDesc: 'Compact, foldable, and stylish. Great for frequent travellers.',
    features: [
      'Folds to suitcase-size',
      'Built-in shopping basket',
      'Dual speed settings',
      'Anti-tip system',
      'USB charging port',
    ],
    specs: {
      Weight: '26 kg',
      'Max Speed': '6 km/h',
      Range: '28 km',
      'Max Load': '120 kg',
      'Folded Size': '95 × 45 × 75 cm',
      'Battery': 'Li-Ion 24V 12Ah',
    },
    inStock: true,
  },
  {
    id: 'fs-3',
    name: 'PortaFold X',
    category: 'folding',
    price: 1349,
    image: '/images/folding_lightweight.png',
    rating: 4.7,
    reviews: 91,
    badge: 'New',
    shortDesc: 'Premium folding scooter with extended range and comfort features.',
    features: [
      'Extended 40km range',
      'Full suspension system',
      'LED headlight & taillight',
      'Ergonomic captain seat',
      'Digital dashboard display',
    ],
    specs: {
      Weight: '28 kg',
      'Max Speed': '10 km/h',
      Range: '40 km',
      'Max Load': '135 kg',
      'Folded Size': '115 × 52 × 85 cm',
      'Battery': 'Li-Ion 36V 15Ah',
    },
    inStock: true,
    isNew: true,
  },
  {
    id: 'rs-1',
    name: 'RoadMaster 8',
    category: 'road',
    price: 2499,
    image: '/images/enclosed_cabin.png',
    rating: 4.9,
    reviews: 145,
    badge: 'Premium',
    shortDesc: 'Full-size road scooter built for long journeys and all-weather performance.',
    features: [
      'Road-legal up to 15 km/h',
      'All-terrain pneumatic tyres',
      'Full weather canopy available',
      'Luxury captain seat with armrests',
      'Front & rear LED lights',
      'Large storage basket',
    ],
    specs: {
      Weight: '78 kg',
      'Max Speed': '15 km/h',
      Range: '60 km',
      'Max Load': '160 kg',
      'Turning Radius': '2.0 m',
      'Battery': '12V 75Ah dual battery',
    },
    inStock: true,
  },
  {
    id: 'rs-2',
    name: 'CrossCountry 6+',
    category: 'road',
    price: 1999,
    originalPrice: 2299,
    image: '/images/luxury_road.png',
    rating: 4.7,
    reviews: 98,
    badge: 'Sale',
    shortDesc: 'Conquer any terrain. Great outdoor performance at an incredible value.',
    features: [
      'All-terrain suspension',
      'Dual front headlights',
      'Swivel captain seat',
      '6-wheel stability option',
      'Class 3 road capability',
    ],
    specs: {
      Weight: '65 kg',
      'Max Speed': '12 km/h',
      Range: '50 km',
      'Max Load': '150 kg',
      'Turning Radius': '1.8 m',
      'Battery': '12V 50Ah dual battery',
    },
    inStock: true,
  },
  {
    id: 'rs-3',
    name: 'Terrain Pro 4WD',
    category: 'road',
    price: 2999,
    image: '/images/luxury_road.png',
    rating: 4.8,
    reviews: 67,
    badge: 'New',
    shortDesc: 'The pinnacle of road scooter engineering. Dual motor, all-weather ready.',
    features: [
      'Dual brushless motor drive',
      'All-weather sealed electronics',
      'Luxury heated seat',
      '360° LED lighting system',
      'GPS tracking included',
      '3-year comprehensive warranty',
    ],
    specs: {
      Weight: '95 kg',
      'Max Speed': '15 km/h',
      Range: '80 km',
      'Max Load': '180 kg',
      'Turning Radius': '2.2 m',
      'Battery': '24V 80Ah dual battery',
    },
    inStock: true,
    isNew: true,
  },
  {
    id: 'acc-1',
    name: 'Universal Scooter Cover',
    category: 'accessory',
    price: 39,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    rating: 4.6,
    reviews: 312,
    shortDesc: 'Heavy-duty weatherproof cover. Fits most mobility scooters.',
    features: ['Waterproof 600D fabric', 'UV resistant', 'Elasticated hem', 'Storage bag included'],
    specs: { Size: 'Universal Fit', Material: '600D Polyester', Colour: 'Silver/Black' },
    inStock: true,
  },
  {
    id: 'acc-2',
    name: 'Deluxe Tiller Bag',
    category: 'accessory',
    price: 29,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    rating: 4.7,
    reviews: 188,
    shortDesc: 'Stylish and functional bag that attaches to your scooter tiller.',
    features: ['Multiple zip pockets', 'Clear phone window', 'Easy attach straps', 'Water-resistant'],
    specs: { Dimensions: '30 × 20 × 12 cm', Material: 'Nylon', Colour: 'Black' },
    inStock: true,
  },
  {
    id: 'acc-3',
    name: 'Mobility Scooter Ramp',
    category: 'accessory',
    price: 89,
    image: 'https://images.unsplash.com/photo-1558618047-f4e80bb78c8e?w=600&q=80',
    rating: 4.5,
    reviews: 74,
    shortDesc: 'Portable aluminium ramp for vehicle loading and kerbs.',
    features: ['Lightweight aluminium', 'Non-slip surface', 'Fold-in-half design', 'Up to 272kg load'],
    specs: { Length: '183 cm', Width: '75 cm', 'Max Load': '272 kg', Weight: '8.5 kg' },
    inStock: true,
  },
  {
    id: 'acc-4',
    name: 'Smart Charger 24V',
    category: 'accessory',
    price: 49,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    rating: 4.8,
    reviews: 256,
    badge: 'Popular',
    shortDesc: 'Intelligent automatic battery charger with LED status indicator.',
    features: ['Auto cut-off when full', 'LED charge indicator', 'Universal connector set', 'UK plug'],
    specs: { Voltage: '24V', Output: '5A', Connector: 'Universal adapters' },
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'acc-5',
    name: 'Comfort Seat Cushion',
    category: 'accessory',
    price: 44,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    rating: 4.6,
    reviews: 143,
    shortDesc: 'Memory foam seat cushion with washable cover for extended comfort.',
    features: ['Gel-infused memory foam', 'Anti-slip base', 'Machine washable cover', 'Universal fit'],
    specs: { Dimensions: '44 × 44 × 6 cm', Material: 'Memory foam + Gel', Colour: 'Black' },
    inStock: true,
  },
  {
    id: 'acc-6',
    name: 'Scooter Basket Set',
    category: 'accessory',
    price: 35,
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=600&q=80',
    rating: 4.4,
    reviews: 98,
    shortDesc: 'Front and rear basket combo. Ideal for shopping and storage.',
    features: ['Wire mesh construction', 'Easy-attach brackets', 'Holds up to 10kg', 'Black powder-coat finish'],
    specs: { 'Front Basket': '30 × 25 × 15 cm', 'Rear Basket': '35 × 30 × 20 cm', Material: 'Steel wire' },
    inStock: true,
  },
];

// Helper to map DB row to client model
export const mapDbProductToClient = (db: any): Product => ({
  id: db.id,
  name: db.name,
  category: db.category,
  price: Number(db.price),
  originalPrice: db.original_price ? Number(db.original_price) : undefined,
  image: db.image,
  rating: Number(db.rating),
  reviews: Number(db.reviews),
  badge: db.badge || undefined,
  shortDesc: db.short_desc,
  features: db.features || [],
  specs: db.specs || {},
  inStock: db.in_stock,
  isNew: db.is_new,
  isBestseller: db.is_bestseller
});

// Helper to map client model to DB row
export const mapClientProductToDb = (p: Product) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  original_price: p.originalPrice || null,
  image: p.image,
  rating: p.rating,
  reviews: p.reviews,
  badge: p.badge || null,
  short_desc: p.shortDesc,
  features: p.features,
  specs: p.specs,
  in_stock: p.inStock,
  is_new: p.isNew || false,
  is_bestseller: p.isBestseller || false
});

// Seed data
export const seedProductsToSupabase = async () => {
  try {
    const dbData = INITIAL_PRODUCTS.map(mapClientProductToDb);
    const { error } = await supabase.from('products').insert(dbData);
    if (error) {
      console.error('Error seeding products to Supabase:', error);
    } else {
      console.log('Successfully seeded initial products to Supabase.');
    }
  } catch (e) {
    console.error('Exception during seeding:', e);
  }
};

// Fetch all products from Supabase
export const loadProductsFromSupabase = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return INITIAL_PRODUCTS;
    }

    if (!data || data.length === 0) {
      // Seed initial data if database is empty
      await seedProductsToSupabase();
      return INITIAL_PRODUCTS;
    }

    return data.map(mapDbProductToClient);
  } catch (e) {
    console.error('Exception loading products from Supabase:', e);
    return INITIAL_PRODUCTS;
  }
};

// Insert a product
export const addProductToSupabase = async (p: Product) => {
  const dbData = mapClientProductToDb(p);
  const { error } = await supabase.from('products').insert(dbData);
  if (error) throw error;
};

// Update a product
export const updateProductInSupabase = async (p: Product) => {
  const dbData = mapClientProductToDb(p);
  const { error } = await supabase.from('products').update(dbData).eq('id', p.id);
  if (error) throw error;
};

// Delete a product
export const deleteProductFromSupabase = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

export const getProductsByCategory = async (category: Product['category']): Promise<Product[]> => {
  const all = await loadProductsFromSupabase();
  return all.filter((p) => p.category === category);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const all = await loadProductsFromSupabase();
  return all.filter((p) => p.isBestseller || p.isNew).slice(0, 6);
};
