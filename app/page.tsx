'use client'
import Link from 'next/link'
import { companies } from '@/lib/data'
import { formatUsd, payPerSecond, earningsSoFar } from '@/lib/pay'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const list = [...companies].sort((a, b) => b.totalCompUsd - a.totalCompUsd)

  const [now, setNow] = useState<Date>(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 200)
    return () => clearInterval(id)
  }, [])

  // total per second for all Top 10
  const globalPPS = list.reduce(
    (sum, c) => sum + payPerSecond(c.totalCompUsd, c.fiscalYear),
    0
  )

  // total earned today (since midnight)
  const globalEarnedToday = list.reduce(
    (sum, c) =>
      sum +
      earningsSoFar(c.totalCompUsd, c.fiscalYear, now.getTime()),
    0
  )

  return (
    <div className="grid">

      {/* Viral Global Counter */}
      <div className="card">
        <h1 className="h1">Top 10 CEO Pay Tracker</h1>

        <div className="muted">
          Based on latest public filings. Updated in real time.
        </div>

        {/* Global Today */}
        <div className="bigCounter">
          <div>Global Earned Today</div>
          <div className="superLarge">{formatUsd(globalEarnedToday)}</div>
        </div>

        {/* Per Second */}
        <div className="bigCounter">
          <div>Total Per Second</div>
          <div className="large">{formatUsd(globalPPS)} / sec</div>
        </div>

        {/* Share buttons */}
        <div className="shareGroup">
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `Check this out ${formatUsd(globalPPS)} per second from Top 10 CEOs https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
              )
            }
          >
            Copy viral text
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card">
        <div className="cardTitle">
          <h2 className="h2">Leaderboard</h2>
          <span className="pill">Top {list.length}</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>CEO</th>
              <th>Total comp</th>
              <th>Ratio</th>
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
                <td>
  {Math.round(c.totalCompUsd / c.medianWorkerPayUsd)}x
</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
