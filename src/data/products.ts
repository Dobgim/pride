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

// No demo products — add your real products via the Admin Dashboard.
export const INITIAL_PRODUCTS: Product[] = [];

// ── DB ↔ Client mappers ──────────────────────────────────────────────────────

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
  isBestseller: db.is_bestseller,
});

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
  is_bestseller: p.isBestseller || false,
});

// ── Supabase CRUD ────────────────────────────────────────────────────────────

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

export const getProductsByCategory = async (
  category: Product['category']
): Promise<Product[]> => {
  const all = await loadProductsFromSupabase();
  return all.filter((p) => p.category === category);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const all = await loadProductsFromSupabase();
  return all.filter((p) => p.isBestseller || p.isNew).slice(0, 6);
};
