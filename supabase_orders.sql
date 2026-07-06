-- ─────────────────────────────────────────────────────────────
-- Care Drive — Orders table
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Powers: website checkout → order saved → shows in Admin Dashboard → invoice.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.orders (
  id             text primary key,
  customer_name  text        not null,
  customer_email text        not null,
  customer_phone text,
  items          jsonb       not null default '[]'::jsonb,
  subtotal       numeric     not null default 0,
  total          numeric     not null default 0,
  payment_option text        not null default 'full',
  down_payment   numeric,
  status         text        not null default 'Pending',
  created_at     timestamptz not null default now()
);

-- Row Level Security.
-- The site uses the public anon key for both checkout and the admin dashboard
-- (same as the existing products table), so we allow anon to insert/read/update/delete.
alter table public.orders enable row level security;

drop policy if exists "orders_anon_insert" on public.orders;
drop policy if exists "orders_anon_select" on public.orders;
drop policy if exists "orders_anon_update" on public.orders;
drop policy if exists "orders_anon_delete" on public.orders;

create policy "orders_anon_insert" on public.orders for insert to anon with check (true);
create policy "orders_anon_select" on public.orders for select to anon using (true);
create policy "orders_anon_update" on public.orders for update to anon using (true) with check (true);
create policy "orders_anon_delete" on public.orders for delete to anon using (true);
