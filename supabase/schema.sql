create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('admin', 'sponsor', 'investor')),
  full_name text not null,
  email text not null unique,
  status text not null default 'pending' check (status in ('pending', 'active')),
  created_at timestamptz not null default now()
);

create table if not exists sponsor_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  company_name text not null,
  bio text,
  track_record_summary text,
  verification_status text not null default 'pending' check (verification_status in ('pending', 'verified'))
);

create table if not exists investor_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  accreditation_self_reported boolean not null default false,
  investment_preferences text[] not null default '{}'
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid references users(id) on delete set null,
  sponsor_name text not null,
  title text not null,
  slug text not null unique,
  city text not null,
  state text not null,
  summary text not null,
  market_story text not null,
  property_type text not null default 'multifamily',
  units integer not null default 0,
  target_irr numeric(5,2) not null default 0,
  equity_multiple numeric(5,2) not null default 0,
  cash_on_cash numeric(5,2) not null default 0,
  hold_period_years integer not null default 5,
  minimum_investment integer not null default 0,
  year_built integer not null default 2000,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'approved', 'rejected', 'published')),
  cover_tone text not null default 'marine',
  published_at date default current_date,
  created_at timestamptz not null default now()
);

create table if not exists listing_inquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  investor_id uuid references users(id) on delete set null,
  investor_name text not null,
  investor_email text not null,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted')),
  created_at timestamptz not null default now()
);

