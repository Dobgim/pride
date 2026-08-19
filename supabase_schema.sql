-- ─────────────────────────────────────────────────────────────
-- Care Drive — full schema for a fresh Supabase project.
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Creates: products table, orders table, and the public media bucket.
-- ─────────────────────────────────────────────────────────────

-- ── Products ────────────────────────────────────────────────
create table if not exists public.products (
  id             text primary key,
  name           text    not null,
  category       text    not null,
  price          numeric not null default 0,
  down_payment   numeric,
  original_price numeric,
  image          text,
  rating         numeric not null default 5,
  reviews        integer not null default 0,
  badge          text,
  short_desc     text,
  features       jsonb   not null default '[]'::jsonb,
  specs          jsonb   not null default '{}'::jsonb,
  in_stock       boolean not null default true,
  is_new         boolean not null default false,
  is_bestseller  boolean not null default false,
  created_at     timestamptz not null default now()
);

-- Category and featured lookups are now filtered in the database, so index them.
create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (is_bestseller, is_new);

alter table public.products enable row level security;

drop policy if exists "products_anon_select" on public.products;
drop policy if exists "products_anon_insert" on public.products;
drop policy if exists "products_anon_update" on public.products;
drop policy if exists "products_anon_delete" on public.products;

create policy "products_anon_select" on public.products for select to anon using (true);
create policy "products_anon_insert" on public.products for insert to anon with check (true);
create policy "products_anon_update" on public.products for update to anon using (true) with check (true);
create policy "products_anon_delete" on public.products for delete to anon using (true);

-- ── Orders ──────────────────────────────────────────────────
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

alter table public.orders enable row level security;

drop policy if exists "orders_anon_insert" on public.orders;
drop policy if exists "orders_anon_select" on public.orders;
drop policy if exists "orders_anon_update" on public.orders;
drop policy if exists "orders_anon_delete" on public.orders;

create policy "orders_anon_insert" on public.orders for insert to anon with check (true);
create policy "orders_anon_select" on public.orders for select to anon using (true);
create policy "orders_anon_update" on public.orders for update to anon using (true) with check (true);
create policy "orders_anon_delete" on public.orders for delete to anon using (true);

-- ── Media bucket ────────────────────────────────────────────
-- Product photos and videos live here, NOT as base64 inside the rows.
-- Storage is CDN-served, which is what keeps database egress low.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- The anon role must be able to SEE the bucket row, or the storage API
-- reports "Bucket not found" on upload even though the bucket exists.
drop policy if exists "buckets_anon_select" on storage.buckets;
create policy "buckets_anon_select" on storage.buckets
  for select to anon using (id = 'product-images');

drop policy if exists "product_images_public_read" on storage.objects;
drop policy if exists "product_images_anon_insert" on storage.objects;
drop policy if exists "product_images_anon_update" on storage.objects;
drop policy if exists "product_images_anon_delete" on storage.objects;

create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "product_images_anon_insert" on storage.objects
  for insert to anon with check (bucket_id = 'product-images');
create policy "product_images_anon_update" on storage.objects
  for update to anon using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
create policy "product_images_anon_delete" on storage.objects
  for delete to anon using (bucket_id = 'product-images');
