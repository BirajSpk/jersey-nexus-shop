-- Insert dummy users (link to existing auth.users by known UUIDs in local dev)
-- Replace these UUIDs with actual auth user IDs after signup
insert into public.users (id, name, email, role)
values
  ('00000000-0000-0000-0000-000000000001', 'Admin User', 'admin@example.com', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'John Doe', 'john@example.com', 'user'),
  ('00000000-0000-0000-0000-000000000003', 'Jane Smith', 'jane@example.com', 'user')
on conflict (id) do nothing;

-- Products
insert into public.products (id, name, category, price_npr, description, image_url) values
  (uuid_generate_v4(), 'FC Barcelona Home Jersey', 'Football', 3200, 'Premium match-quality fabric', 'https://picsum.photos/seed/barca/600/600'),
  (uuid_generate_v4(), 'Manchester United Home Jersey', 'Football', 3000, 'Classic design with modern materials', 'https://picsum.photos/seed/manu/600/600'),
  (uuid_generate_v4(), 'Nepal National Team Jersey', 'Cricket', 2800, 'Support the Rhinos', 'https://picsum.photos/seed/nepal/600/600'),
  (uuid_generate_v4(), 'India National Team Jersey', 'Cricket', 3500, 'Lightweight and breathable', 'https://picsum.photos/seed/india/600/600'),
  (uuid_generate_v4(), 'T1 Esports Jersey', 'Esports', 2600, 'Bold esports style', 'https://picsum.photos/seed/t1/600/600'),
  (uuid_generate_v4(), 'Team Liquid Jersey', 'Esports', 2700, 'Soft-touch fabric', 'https://picsum.photos/seed/liquid/600/600'),
  (uuid_generate_v4(), 'LA Lakers Jersey', 'Basketball', 2900, 'Iconic purple and gold', 'https://picsum.photos/seed/lakers/600/600'),
  (uuid_generate_v4(), 'GS Warriors Jersey', 'Basketball', 3100, 'Durable fan jersey', 'https://picsum.photos/seed/warriors/600/600')
on conflict do nothing;

-- Sample order
insert into public.orders (id, user_id, total_amount, status)
values (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 5800, 'paid')
on conflict do nothing;

