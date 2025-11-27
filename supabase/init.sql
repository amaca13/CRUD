-- Supabase SQL to create posts table and Row Level Security (RLS)
create extension if not exists "uuid-ossp";

create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  title text,
  body text,
  media_path text,
  media_type text,
  is_public boolean default false,
  inserted_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "Insert own posts" on public.posts
  for insert
  with check (auth.uid() = user_id);

create policy "Update own posts" on public.posts
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Delete own posts" on public.posts
  for delete
  using (auth.uid() = user_id);

create policy "Select public posts for authenticated" on public.posts
  for select
  using (
    is_public = true OR auth.uid() = user_id
  );
