-- Enable UUIDs
create extension if not exists "uuid-ossp";

-- Auth users table mirror (app-level profile)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text not null unique,
  role text not null default 'user' check (role in ('user','admin')),
  avatar_url text
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null check (category in ('Football','Cricket','Esports','Basketball')),
  price_npr integer not null check (price_npr > 0),
  description text,
  image_url text
);

create table if not exists public.cart (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  unique (user_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete set null,
  total_amount integer not null,
  status text not null default 'pending' check (status in ('pending','paid','shipped','cancelled')),
  created_at timestamp with time zone not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null check (quantity > 0),
  price_npr integer not null
);

-- Security (RLS)
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.cart enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies
-- users: a user can view and update their own profile. Admins can view all.
create policy if not exists users_self_select on public.users for select
  using (auth.uid() = id or exists(select 1 from public.users as u where u.id = auth.uid() and u.role = 'admin'));
create policy if not exists users_self_update on public.users for update
  using (auth.uid() = id) with check (auth.uid() = id);
create policy if not exists users_insert_self on public.users for insert
  with check (auth.uid() = id);

-- products: public readable; only admins can write
create policy if not exists products_read_all on public.products for select using (true);
create policy if not exists products_admin_write on public.products for all
  using (exists(select 1 from public.users where id = auth.uid() and role = 'admin'))
  with check (exists(select 1 from public.users where id = auth.uid() and role = 'admin'));

-- cart: owner can manage
create policy if not exists cart_owner_all on public.cart for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- orders: owner can read/insert; admins can read all
create policy if not exists orders_owner_ins on public.orders for insert
  with check (auth.uid() = user_id);
create policy if not exists orders_owner_sel on public.orders for select
  using (auth.uid() = user_id or exists(select 1 from public.users where id = auth.uid() and role='admin'));

-- order_items: join to order
create policy if not exists order_items_owner on public.order_items for select
  using (exists(select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or exists(select 1 from public.users where id = auth.uid() and role='admin'))));
create policy if not exists order_items_owner_ins on public.order_items for insert
  with check (exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- Helper RPC for upsert cart
create or replace function public.upsert_cart_item(p_user_id uuid, p_product_id uuid, p_quantity integer)
returns void language plpgsql security definer as $$
begin
  insert into public.cart (user_id, product_id, quantity)
  values (p_user_id, p_product_id, p_quantity)
  on conflict (user_id, product_id)
  do update set quantity = public.cart.quantity + excluded.quantity;
end;
$$;

