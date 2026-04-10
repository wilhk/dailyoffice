create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  bible_settings jsonb not null default '{"provider":"biblegateway","version":"NIV"}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_app_state enable row level security;

create policy if not exists "Users can read their own state"
  on public.user_app_state
  for select
  using (auth.uid() = user_id);

create policy if not exists "Users can insert their own state"
  on public.user_app_state
  for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can update their own state"
  on public.user_app_state
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
