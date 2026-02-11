import { CompanyComp } from './types'

// V1 sample dataset
// Replace these with your Top 100 list and the latest disclosed total compensation
export const companies: CompanyComp[] = [
  {
    ticker: 'AAPL',
    companyName: 'Apple',
    ceoName: 'Tim Cook',
    fiscalYear: 2023,
    totalCompUsd: 63200000,
    sourceLabel: 'SEC proxy statement',
    sourceUrl: 'https://www.sec.gov/edgar/browse/?CIK=0000320193'
  },
  {
    ticker: 'MSFT',
    companyName: 'Microsoft',
    ceoName: 'Satya Nadella',
    fiscalYear: 2024,
    totalCompUsd: 79300000,
    sourceLabel: 'SEC proxy statement',
    sourceUrl: 'https://www.sec.gov/edgar/browse/?CIK=0000789019'
  },
  {
    ticker: 'NVDA',
    companyName: 'Nvidia',
    ceoName: 'Jensen Huang',
    fiscalYear: 2024,
    totalCompUsd: 34400000,
    sourceLabel: 'SEC proxy statement',
    sourceUrl: 'https://www.sec.gov/edgar/browse/?CIK=0001045810'
  }
]
