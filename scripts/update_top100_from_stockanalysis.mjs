// Pulls Top 100 U.S. listed companies by market cap from stockanalysis.com
// Writes a minimal template you can paste into lib/data.ts
//
// Usage
//   node scripts/update_top100_from_stockanalysis.mjs
//
// Notes
//   This is a best effort HTML scrape and can break if the site changes.

const url = 'https://stockanalysis.com/list/biggest-companies/'

function extractTableRows(html) {
  const rows = []
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g
  let m
  while ((m = rowRegex.exec(html))) rows.push(m[1])
  return rows
}

function extractCellText(rowHtml) {
  const cells = []
  const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g
  let m
  while ((m = cellRegex.exec(rowHtml))) {
    const raw = m[1]
    const text = raw
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    cells.push(text)
  }
  return cells
}

function parseTop100(html) {
  const rows = extractTableRows(html)
  const out = []
  for (const row of rows) {
    const cells = extractCellText(row)
    // Expected headers include: Rank, Company, Ticker, Market Cap, Price, Change, Volume
    if (!cells.length) continue
    if (cells[0] === 'Rank') continue
    const ticker = cells.find((c) => /^[A-Z\.]{1,10}$/.test(c))
    const companyName = cells[1]
    if (!ticker || !companyName) continue
    out.push({ ticker, companyName })
    if (out.length >= 100) break
  }
  return out
}

const res = await fetch(url, {
  headers: {
    'user-agent': 'ceo-pay-tracker/0.1 (contact: you)'
  }
})

if (!res.ok) {
  console.error('Fetch failed', res.status, res.statusText)
  process.exit(1)
}

const html = await res.text()
const top100 = parseTop100(html)

console.log(`Found ${top100.length} rows`)
console.log('Paste this into lib/data.ts and fill in CEO + compensation:')
console.log('')
console.log('export const companies: CompanyComp[] = [')
for (const c of top100) {
  console.log(
    `  { ticker: '${c.ticker}', companyName: '${c.companyName.replace(/'/g, "\\'")}', ceoName: 'TBD', fiscalYear: 2025, totalCompUsd: 0, sourceLabel: 'TBD', sourceUrl: 'https://www.sec.gov/edgar/search/' },`
  )
}
console.log(']')
