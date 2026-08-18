import { supabase } from '../supabaseClient';

export interface Product {
  id: string;
  name: string;
  category: 'lightweight' | 'folding' | 'road' | 'accessory';
  price: number;
  downPayment?: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  video?: string;
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

// No demo products — add your real products via the Admin Dashboard.
export const INITIAL_PRODUCTS: Product[] = [];

// ── DB ↔ Client mappers ──────────────────────────────────────────────────────

export const mapDbProductToClient = (db: any): Product => ({
  id: db.id,
  name: db.name,
  category: db.category,
  price: Number(db.price),
  downPayment: db.down_payment ? Number(db.down_payment) : undefined,
  originalPrice: db.original_price ? Number(db.original_price) : undefined,
  image: db.image,
  images: db.images || (db.specs && db.specs._images) || [],
  video: db.video || (db.specs && db.specs._video) || undefined,
  rating: Number(db.rating),
  reviews: Number(db.reviews),
  badge: db.badge || undefined,
  shortDesc: db.short_desc,
  features: db.features || [],
  specs: db.specs || {},
  inStock: db.in_stock,
  isNew: db.is_new,
  isBestseller: db.is_bestseller,
});

export const mapClientProductToDb = (p: Product) => {
  const specsObj = p.specs || {};
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    down_payment: p.downPayment || null,
    original_price: p.originalPrice || null,
    image: p.image,
    rating: p.rating,
    reviews: p.reviews,
    badge: p.badge || null,
    short_desc: p.shortDesc,
    features: p.features,
    specs: {
      ...specsObj,
      _images: p.images || [],
      _video: p.video || '',
    },
    in_stock: p.inStock,
    is_new: p.isNew || false,
    is_bestseller: p.isBestseller || false,
  };
};

// ── Supabase CRUD ────────────────────────────────────────────────────────────

/**
 * Columns needed to render a product listing or card.
 *
 * Deliberately excludes `specs`, which carries the extra-images and video
 * payload. Listings only ever show `image`, so pulling `specs` for every row
 * multiplied the response size for no benefit.
 */
const LIST_COLUMNS =
  'id,name,category,price,down_payment,original_price,image,rating,reviews,badge,short_desc,features,in_stock,is_new,is_bestseller';

/** Load all products from Supabase. Returns [] if the table is empty. */
export const loadProductsFromSupabase = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return [];
    }

    return (data ?? []).map(mapDbProductToClient);
  } catch (e) {
    console.error('Exception loading products from Supabase:', e);
    return [];
  }
};

/** Load a single product in full, including extra images and video. */
export const loadProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching product from Supabase:', error);
      return null;
    }

    return data ? mapDbProductToClient(data) : null;
  } catch (e) {
    console.error('Exception loading product from Supabase:', e);
    return null;
  }
};

/** Insert a new product. */
export const addProductToSupabase = async (p: Product) => {
  const dbData = mapClientProductToDb(p);
  const { error } = await supabase.from('products').insert(dbData);
  if (error) throw error;
};

/** Update an existing product. */
export const updateProductInSupabase = async (p: Product) => {
  const dbData = mapClientProductToDb(p);
  const { error } = await supabase.from('products').update(dbData).eq('id', p.id);
  if (error) throw error;
};

/** Delete a product by id. */
export const deleteProductFromSupabase = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

// ── Convenience helpers ──────────────────────────────────────────────────────

/**
 * Fetch one category's products. Filtering happens in the database — the old
 * version downloaded the entire table and filtered in the browser, so every
 * category page cost a full-catalogue transfer.
 */
export const getProductsByCategory = async (
  category: Product['category']
): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(LIST_COLUMNS)
      .eq('category', category)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products by category from Supabase:', error);
      return [];
    }

    return (data ?? []).map(mapDbProductToClient);
  } catch (e) {
    console.error('Exception loading products by category:', e);
    return [];
  }
};

/** Featured products for the home page — filtered and capped in the database. */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(LIST_COLUMNS)
      .or('is_bestseller.eq.true,is_new.eq.true')
      .order('id', { ascending: true })
      .limit(6);

    if (error) {
      console.error('Error fetching featured products from Supabase:', error);
      return [];
    }

    return (data ?? []).map(mapDbProductToClient);
  } catch (e) {
    console.error('Exception loading featured products:', e);
    return [];
  }
};
