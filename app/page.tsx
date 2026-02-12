'use client'

import Link from 'next/link'
import { companies } from '@/lib/data'
import { formatUsd, payPerSecond, earningsSoFar } from '@/lib/pay'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const list = [...companies].sort((a, b) => b.totalCompUsd - a.totalCompUsd)

  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 100)
    return () => clearInterval(id)
  }, [])

  const globalPPS = list.reduce(
    (sum, c) => sum + payPerSecond(c.totalCompUsd, c.fiscalYear),
    0
  )

  const globalEarned = list.reduce(
    (sum, c) =>
      sum + earningsSoFar(c.totalCompUsd, c.fiscalYear, now.getTime()),
    0
  )

  const largestGap = Math.max(
    ...list.map(c =>
      Math.round(c.totalCompUsd / c.medianWorkerPayUsd)
    )
  )

  return (
    <div className="grid">

      <div className="card">
        <h1 className="h1">CEO Pay Per Second</h1>

        <div className="muted">
          Real-time earnings of the highest-paid CEOs in America.
        </div>

        <div className="bigCounter">
          <div className="muted">Earned So Far This Year</div>
          <div className="superLarge accent">
            {formatUsd(globalEarned)}
          </div>
        </div>

        <div className="bigCounter">
          <div className="muted">Combined Rate</div>
          <div className="large">
            {formatUsd(globalPPS)} per second
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="h2">Largest Pay Gap</h2>
        <div className="superLarge accent">
          {largestGap}x
        </div>
        <div className="muted">
          Highest CEO-to-median-worker pay ratio among the Top 10.
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <td className="accent">
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


