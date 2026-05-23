# Scripture Compare

A clean, fast Bible verse translation comparator built with Vite + React. Compare any verse or passage across multiple translations side by side.

## Features

- 13+ translations including NIV, NLT, ESV, MSG, NKJV, and more (free, no API key needed)
- Parallel fetching — all translations load simultaneously
- Verse range support (`Psalm 23:1-6`, `John 1:1-14`)
- Shareable URLs (`?ref=John+3:16&t=kjv,web,bbe`)
- Per-card copy button
- Skeleton loaders & graceful error states
- Mobile responsive

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com for auto-deploys
```

## Project Structure

```
src/
  App.jsx                    # Root component, URL state management
  App.module.css
  main.jsx                   # Entry point
  index.css                  # Global tokens + resets
  components/
    SearchBar.jsx             # Reference input + Compare button
    SearchBar.module.css
    TranslationSelector.jsx   # Translation toggle chips
    TranslationSelector.module.css
    VerseCard.jsx             # Individual translation result card
    VerseCard.module.css
    EmptyState.jsx            # Landing state with example verses
    EmptyState.module.css
  data/
    translations.js           # Translation list + defaults
    bibleApi.js               # Fetch service
  hooks/
    useVerse.js               # Custom hooks (optional use)
```

## Tech Stack

- [Vite](https://vitejs.dev) — build tool
- [React 18](https://react.dev) — UI
- [Bolls Bible API](https://bolls.life) — free Bible API with 50+ translations
- [Tabler Icons](https://tabler.io/icons) — icon font
- [Google Fonts](https://fonts.google.com) — Montserrat + Roboto Mono
- [Vercel](https://vercel.com) — hosting
