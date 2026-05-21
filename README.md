# Scripture Compare

A clean, fast Bible verse translation comparator built with Vite + React. Compare any verse or passage across multiple translations side by side.

## Features

- 12 translations (public domain, no API key needed to start)
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

## Upgrading to Licensed Translations (NIV, ESV, NLT, MSG)

The default setup uses `bible-api.com` which only has public domain translations.
To get NIV, ESV, NLT, MSG, AMP, CSB, and 1,600+ others:

1. Get a **free API key** at https://scripture.api.bible
2. Copy `.env.example` to `.env.local`
3. Add your key: `VITE_BIBLE_API_KEY=your_key_here`
4. Update `src/data/bibleApi.js` to use the api.bible endpoint
5. Update `src/data/translations.js` with the new translation IDs

Translation IDs for api.bible:
- ESV: `9879dbb7cfe39e4d-01`
- NIV: `78a9f6124f344018-01`
- NLT: `65eec8e0b60e656b-01`
- MSG: `65eec8e0b60e656b-01`
- KJV: `de4e12af7f28f599-01`
- NKJV: `9879dbb7cfe39e4d-04`

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
- [bible-api.com](https://bible-api.com) — free Bible API (public domain)
- [Tabler Icons](https://tabler.io/icons) — icon font
- [Google Fonts](https://fonts.google.com) — Lora + DM Mono + DM Sans
- [Vercel](https://vercel.com) — hosting
