export type DataQuality =
  | 'ok'
  | 'missing_filing'
  | 'parse_failed'
  | 'partial'

export interface CompanyComp {
  ticker: string
  companyName: string
  cik: string
  sector: string

  fiscalYear: number | null
  ceoName: string | null
  totalCompUsd: number | null
  medianWorkerPayUsd: number | null

  payRatio: number | null

  sourceLabel: string
  sourceUrl: string | null

  lastFiledDate: string | null
  quality: DataQuality
}

