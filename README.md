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

Run these SQL scripts in Supabase SQL Editor:
- `supabase/user_app_state.sql`
- `supabase/user_feedback.sql`

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
- `supabase/user_feedback.sql` — table + RLS policies for feedback submission
