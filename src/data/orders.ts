import { supabase } from '../supabaseClient';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export type PaymentOption = 'full' | 'down';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentOption: PaymentOption;
  downPayment?: number;
  status: string;
  createdAt: string;
}

// ── DB ↔ Client mappers ──────────────────────────────────────────────────────

export const mapDbOrderToClient = (db: any): Order => ({
  id: db.id,
  customerName: db.customer_name,
  customerEmail: db.customer_email,
  customerPhone: db.customer_phone || '',
  items: db.items || [],
  subtotal: Number(db.subtotal),
  total: Number(db.total),
  paymentOption: db.payment_option,
  downPayment: db.down_payment != null ? Number(db.down_payment) : undefined,
  status: db.status || 'Pending',
  createdAt: db.created_at,
});

export const mapClientOrderToDb = (o: Order) => ({
  id: o.id,
  customer_name: o.customerName,
  customer_email: o.customerEmail,
  customer_phone: o.customerPhone || null,
  items: o.items,
  subtotal: o.subtotal,
  total: o.total,
  payment_option: o.paymentOption,
  down_payment: o.downPayment ?? null,
  status: o.status,
});

// ── Supabase CRUD ────────────────────────────────────────────────────────────

/** Load all orders, newest first. Returns [] on error/empty. */
export const loadOrdersFromSupabase = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders from Supabase:', error);
      return [];
    }
    return (data ?? []).map(mapDbOrderToClient);
  } catch (e) {
    console.error('Exception loading orders from Supabase:', e);
    return [];
  }
};

/** Insert a new order (called at checkout). */
export const addOrderToSupabase = async (o: Order) => {
  const dbData = mapClientOrderToDb(o);
  const { error } = await supabase.from('orders').insert(dbData);
  if (error) throw error;
};

/** Update an order's status. */
export const updateOrderStatusInSupabase = async (id: string, status: string) => {
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);
  if (error) throw error;
};

/** Delete an order by id. */
export const deleteOrderFromSupabase = async (id: string) => {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
};
