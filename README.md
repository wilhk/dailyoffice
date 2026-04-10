# 30-Day Job Search Devotional App

A React + Vite devotional app with:
- Listing page with 30 days
- Detail page with scripture, devotional, questions, reflection, and prayer
- Dynamic scripture text by selected version (`NIV`, `ESV`, `NLT`, `NKJV`, `KJV`, `CUNP`, `CNV`, `CCB`)
- Bible provider/version settings
- Local progress tracking
- Optional Supabase auth + cloud sync (sign up/sign in/sign out)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Supabase setup (required for sign-in + cloud sync)

What you need to provide:
- A Supabase account + project
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Create a local env file:

```bash
cp .env.example .env
```

Then fill in:

```bash
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Run this SQL in Supabase SQL Editor:

```sql
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
```

Or run the bundled script directly:
- `supabase/user_app_state.sql`

Auth setup in Supabase:
- Enable Email provider (`Authentication -> Providers -> Email`)
- If email confirmation is enabled, users must confirm email before first password sign-in.

## Deploy to GitHub Pages

The app uses `HashRouter`, so GitHub Pages works.

For hosted auth on GitHub Pages:
- In Supabase Auth URL settings, add your site URL(s):
  - `https://<your-username>.github.io`
  - `https://<your-username>.github.io/<your-repo>/`

## Structure

- `src/content.js` — devotional data
- `src/storage.js` — local storage helpers
- `src/scripture.js` — scripture + version/provider helpers
- `src/lib/supabase.js` — Supabase client bootstrap
- `src/context/AppStateContext.jsx` — auth/session/progress/settings state + cloud sync
- `src/pages/ListingPage.jsx` — listing + account + settings page
- `src/pages/DetailPage.jsx` — detail page
- `.env.example` — required Supabase env variable names
- `supabase/user_app_state.sql` — table + RLS policies for cloud sync
