# CEO Pay Tracker (V1)

This is a Next.js app that displays a CEO pay leaderboard and a real time counter that accrues compensation per second.

## What is in V1

• Home page leaderboard
• Company detail page with live counter
• Data is a simple array in `lib/data.ts`

## Run locally

1. Install Node.js 18 or newer
2. In this repo folder

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Add companies

Edit `lib/data.ts`.

Each company record needs

• ticker
• companyName
• ceoName
• fiscalYear (the year of the disclosed compensation)
• totalCompUsd (total compensation in USD)
• sourceLabel and sourceUrl

## Optional: pull Top 100 by market cap

This script scrapes a public list and prints a template you can paste into `lib/data.ts`.

```bash
node scripts/update_top100_from_stockanalysis.mjs
```

You still need to fill in CEO name and compensation.

## Deployment

The fastest path is Vercel.

```bash
npm run build
```

Push to GitHub then import in Vercel.
