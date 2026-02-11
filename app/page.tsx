import Link from 'next/link'
import { companies } from '@/lib/data'
import { formatUsd } from '@/lib/pay'

export default function HomePage() {
  const list = [...companies].sort((a, b) => b.totalCompUsd - a.totalCompUsd)

  return (
    <div className="grid">
      <div className="card">
        <div className="cardTitle">
          <h1 className="h1">Leaderboard</h1>
          <span className="pill">Top {list.length}</span>
        </div>
        <div className="muted">
          Latest disclosed total compensation from public filings. Counter uses this as an annualized rate.
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>CEO</th>
              <th>Total comp</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.ticker} className="rowLink">
                <td>
                  <Link href={`/company/${c.ticker}`}>
                    <span className="accent">{c.companyName}</span>
                    <span className="muted"> · {c.ticker}</span>
                  </Link>
                </td>
                <td>{c.ceoName}</td>
                <td>{formatUsd(c.totalCompUsd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="cardTitle">
          <h2 className="h2">How this works</h2>
          <span className="pill">V1</span>
        </div>
        <div className="muted" style={{ lineHeight: 1.5 }}>
          We take the most recent disclosed CEO total compensation and convert it into a per second rate.
          That rate is used to animate a counter for the current calendar year.
          This is a visualization, not a real time payroll feed.
        </div>
        <div style={{ height: 12 }} />
        <div className="muted" style={{ lineHeight: 1.5 }}>
          Next steps you can add fast:
          <div>1. Expand to Top 100 by market cap</div>
          <div>2. Split comp into salary, bonus, stock, option</div>
          <div>3. Show median worker pay ratio when available</div>
          <div>4. Auto refresh from SEC DEF 14A filings</div>
        </div>
      </div>
    </div>
  )
}
