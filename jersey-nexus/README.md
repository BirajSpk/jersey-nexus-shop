# JerseyNexus

Full-stack e-commerce demo built with React + TailwindCSS + Supabase.

## Setup

1. Copy env file
```
cp .env.example .env
```
Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

2. Install and run
```
npm install
npm run dev
```

3. Supabase schema
Run the SQL in `supabase/schema.sql` on your Supabase project. Optionally run `supabase/seed.sql` to load dummy data (update user ids to your auth user ids after creating accounts).

## Features
- Hero with animated Learn More
- Auth-aware Navbar: Login/Register or Account, admin Dashboard link
- Products list and product detail pages (NPR)
- Cart with immediate counter updates; Buy Now; checkout requires login
- Profile editing (name, email, password, avatar)
- Admin: view orders, manage products, list users
