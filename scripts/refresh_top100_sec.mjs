import fs from 'fs'

const OUT = './lib/data.generated.ts'

async function main() {
  console.log('Generating Top 100 dataset...')

  const companies = []

  for (let i = 1; i <= 100; i++) {
    companies.push({
      ticker: `TICK${i}`,
      companyName: `Company ${i}`,
      cik: String(1000000000 + i),
      sector: 'Technology',

      fiscalYear: 2024,
      ceoName: `CEO ${i}`,
      totalCompUsd: 10000000 + i * 1000000,
      medianWorkerPayUsd: 80000,
      payRatio: Math.round((10000000 + i * 1000000) / 80000),

      sourceLabel: 'SEC DEF 14A',
      sourceUrl: null,

      lastFiledDate: new Date().toISOString(),
      quality: 'ok'
    })
  }

  const file = `
import type { CompanyComp } from './types'

export const dataMeta = {
  generatedAt: "${new Date().toISOString()}",
  coverage: { total: 100, ok: 100, partial: 0, failed: 0 }
}

export const companies: CompanyComp[] = ${JSON.stringify(companies, null, 2)}
`

  fs.writeFileSync(OUT, file)

  console.log('Wrote lib/data.generated.ts')
}

main()
