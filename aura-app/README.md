# Aura — AI Receipt Tracker

A clean, professional React + TypeScript front-end for an AI-powered expense tracking app. Bilingual (EN / TH).

## Project Structure

```
src/
├── context/
│   └── AppContext.tsx        # Global state (user, receipts, language, routing)
├── pages/
│   ├── LoginPage.tsx / .css  # Login screen with language toggle
│   ├── HomePage.tsx / .css   # Dashboard: monthly chart + receipt history
│   ├── AddReceiptPage.tsx / .css  # Method picker → Camera scan or Manual form
│   └── AccountPage.tsx / .css    # Profile, settings, language, currency
├── components/
│   ├── BottomNav.tsx / .css  # Bottom navigation bar + FAB
│   ├── DonutChart.tsx / .css # Animated SVG donut chart
│   └── ReceiptCard.tsx / .css # Individual receipt row
├── types/
│   └── index.ts             # TypeScript interfaces and types
├── utils/
│   ├── translations.ts      # EN + TH string map
│   └── categories.ts        # Category colors, icons, helpers
├── App.tsx                  # Root: page router
├── main.tsx                 # React entry point
└── index.css                # Design tokens + global styles
```

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features

- **Login page** — email/password or Google, with EN/TH toggle
- **Home page** — animated donut chart, monthly totals, AI insight banner, receipt history
- **Add Receipt** — method picker (Camera scan with animated viewfinder, or Manual form with category grid)
- **Account page** — profile, stats, language switch, currency selector, toggles
- **Bilingual** — full EN / ภาษาไทย support throughout
- **Design** — dark glassmorphism, gold accents, Syne + DM Sans typography, smooth animations

## Tech Stack

- React 18 + TypeScript
- Vite
- CSS Modules (per-component CSS files)
- No external UI library — all custom components
