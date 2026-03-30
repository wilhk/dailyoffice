# 30-Day Job Search Devotional App

A simple React + Vite devotional app with:
- Listing page with 30 days
- Checkmarks for completed days
- Reset progress button
- Detail page with scripture, devotional, questions, reflection, and prayer
- localStorage-based progress tracking
- devotional content stored separately in `src/content.js`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

Import this folder into Vercel and deploy. No additional config required.

## Deploy to GitHub Pages

This app currently uses `BrowserRouter`. For easy GitHub Pages deployment, change `src/main.jsx`:

```jsx
import { HashRouter } from 'react-router-dom'
```

and replace:

```jsx
<BrowserRouter>
```

with:

```jsx
<HashRouter>
```

Then build and deploy the `dist` folder.

## Structure

- `src/content.js` — devotional data
- `src/storage.js` — local progress helpers
- `src/pages/ListingPage.jsx` — listing page
- `src/pages/DetailPage.jsx` — detail page
