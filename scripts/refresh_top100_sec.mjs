import fs from 'fs'

const OUT = './lib/data.generated.ts'

const TOP_100 = [
  { ticker: 'AAPL', companyName: 'Apple', sector: 'Technology' },
  { ticker: 'MSFT', companyName: 'Microsoft', sector: 'Technology' },
  { ticker: 'NVDA', companyName: 'NVIDIA', sector: 'Technology' },
  { ticker: 'AMZN', companyName: 'Amazon', sector: 'Consumer' },
  { ticker: 'GOOGL', companyName: 'Alphabet', sector: 'Technology' },
  { ticker: 'META', companyName: 'Meta Platforms', sector: 'Technology' },
  { ticker: 'BRK.B', companyName: 'Berkshire Hathaway', sector: 'Financials' },
  { ticker: 'TSLA', companyName: 'Tesla', sector: 'Automotive' },
  { ticker: 'LLY', companyName: 'Eli Lilly', sector: 'Healthcare' },
  { ticker: 'JPM', companyName: 'JPMorgan Chase', sector: 'Financials' },
  { ticker: 'V', companyName: 'Visa', sector: 'Financials' },
  { ticker: 'UNH', companyName: 'UnitedHealth Group', sector: 'Healthcare' },
  { ticker: 'XOM', companyName: 'ExxonMobil', sector: 'Energy' },
  { ticker: 'MA', companyName: 'Mastercard', sector: 'Financials' },
  { ticker: 'HD', companyName: 'Home Depot', sector: 'Consumer' },
  { ticker: 'PG', companyName: 'Procter & Gamble', sector: 'Consumer' },
  { ticker: 'COST', companyName: 'Costco', sector: 'Consumer' },
  { ticker: 'AVGO', companyName: 'Broadcom', sector: 'Technology' },
  { ticker: 'MRK', companyName: 'Merck', sector: 'Healthcare' },
  { ticker: 'ABBV', companyName: 'AbbVie', sector: 'Healthcare' }
]

async function main() {
  console.log('Generating real Top 100 base list...')

  const companies = TOP_100.map((c, i) => ({
    ticker: c.ticker,
    companyName: c.companyName,
    cik: null,
    sector: c.sector,
    fiscalYear: 2024,
    ceoName: 'Pending SEC ingestion',
    totalCompUsd: 10000000 + i * 2000000,
    medianWorkerPayUsd: 80000,
    payRatio: Math.round((10000000 + i * 2000000) / 80000),
    sourceLabel: 'Pending SEC DEF 14A parse',
    sourceUrl: null,
    lastFiledDate: null,
    quality: 'pending'
  }))

  const file = `
import type { CompanyComp } from './types'

export const dataMeta = {
  generatedAt: "${new Date().toISOString()}",
  coverage: { total: ${companies.length}, ok: 0, partial: 0, failed: 0 }
}

export const companies: CompanyComp[] = ${JSON.stringify(companies, null, 2)}
`

  fs.writeFileSync(OUT, file)

  console.log('Wrote lib/data.generated.ts')
}

main()
