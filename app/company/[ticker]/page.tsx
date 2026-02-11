import Link from 'next/link'
import { notFound } from 'next/navigation'
import { companies } from '@/lib/data'
import { formatUsd } from '@/lib/pay'
import { LiveCounter } from '@/components/LiveCounter'

export default function CompanyPage({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase()
  const company = companies.find((c) => c.ticker === ticker)
  if (!company) return notFound()

  const year = new Date().getUTCFullYear()

  return (
    <div className="grid">
      <div className="card">
        <div className="cardTitle">
          <h1 className="h1">
            {company.companyName} <span className="muted">· {company.ticker}</span>
          </h1>
          <span className="pill">{year}</span>
        </div>
        <div className="muted">
          CEO {company.ceoName}
        </div>
        <div style={{ height: 14 }} />
        <LiveCounter totalCompUsd={company.totalCompUsd} year={year} />
        <div style={{ height: 14 }} />
        <div className="muted" style={{ lineHeight: 1.5 }}>
          Annualized total compensation used for the counter: <span className="accent">{formatUsd(company.totalCompUsd)}</span>
        </div>
        <div style={{ height: 14 }} />
        <div className="muted" style={{ lineHeight: 1.5 }}>
          Source: <a className="accent" href={company.sourceUrl} target="_blank" rel="noreferrer">{company.sourceLabel}</a>
          <div>Fiscal year: {company.fiscalYear}</div>
        </div>
        <div style={{ height: 14 }} />
        <Link href="/" className="accent">
          Back to leaderboard
        </Link>
      </div>

      <div className="card">
        <div className="cardTitle">
          <h2 className="h2">Notes</h2>
          <span className="pill">Methodology</span>
        </div>
        <div className="muted" style={{ lineHeight: 1.5 }}>
          Total compensation is reported in the Summary Compensation Table in a company proxy statement, usually filed as DEF 14A.
          The value can swing year to year due to equity awards.
          The counter is a simple visualization: total compensation divided across the seconds in {year}.
        </div>
      </div>
    </div>
  )
}
