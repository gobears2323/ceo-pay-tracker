'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { companies, dataMeta } from '../lib/data.generated'
import { formatUsd, payPerSecond } from '../lib/pay'

export default function HomePage() {
  const [now, setNow] = useState(new Date())
  const [search, setSearch] = useState('')

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 100)
    return () => clearInterval(id)
  }, [])

  const filtered = useMemo(() => {
    return companies.filter(c =>
      (c.companyName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.ticker || '').toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const sorted = [...filtered].sort(
    (a, b) => (b.totalCompUsd ?? 0) - (a.totalCompUsd ?? 0)
  )

  const globalPps = sorted.reduce((sum, c) => {
    if (!c.totalCompUsd || !c.fiscalYear) return sum
    return sum + payPerSecond(c.totalCompUsd, c.fiscalYear)
  }, 0)

  const secondsSinceYearStart = (() => {
    const start = new Date(now.getFullYear(), 0, 1).getTime()
    return (now.getTime() - start) / 1000
  })()

  const globalEarned = globalPps * secondsSinceYearStart

  return (
    <div
      style={{
        padding: 60,
        backgroundColor: '#0b0f14',
        color: '#ffffff',
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* HERO */}
      <h1 style={{ fontSize: 52, fontWeight: 800 }}>
        CEO Pay Intelligence
      </h1>

      <div style={{ marginTop: 10, color: '#888' }}>
        YTD CEO Compensation Across Top {sorted.length} Companies
      </div>

      <div
        style={{
          marginTop: 50,
          fontSize: 64,
          fontWeight: 900,
          color: '#00ff88'
        }}
      >
        {formatUsd(globalEarned)}
      </div>

      <div style={{ fontSize: 22, marginTop: 10, color: '#ccc' }}>
        {formatUsd(globalPps)} per second (combined)
      </div>

      {/* SEARCH */}
      <div style={{ marginTop: 50 }}>
        <input
          placeholder="Search company or ticker"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 12,
            width: 320,
            fontSize: 16,
            backgroundColor: '#111',
            color: '#fff',
            border: '1px solid #333'
          }}
        />
      </div>

      {/* TABLE */}
      <table
        style={{
          width: '100%',
          marginTop: 40,
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr style={{ color: '#888' }}>
            <th align="left">Rank</th>
            <th align="left">Company</th>
            <th align="left">CEO</th>
            <th align="left">Sector</th>
            <th align="left">Total Comp</th>
            <th align="left">Pay Ratio</th>
            <th align="left">Per Second</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((c, index) => {
            const pps =
              c.totalCompUsd && c.fiscalYear
                ? payPerSecond(c.totalCompUsd, c.fiscalYear)
                : null

            return (
              <tr
                key={c.ticker}
                style={{ borderTop: '1px solid #222' }}
              >
                <td>{index + 1}</td>

                <td>
                  <Link
                    href={`/company/${c.ticker}`}
                    style={{
                      color: '#00ff88',
                      textDecoration: 'none'
                    }}
                  >
                    {c.companyName}
                  </Link>
                </td>

                <td>{c.ceoName}</td>

                <td>{c.sector}</td>

                <td>{formatUsd(c.totalCompUsd || 0)}</td>

                <td style={{ color: '#00ff88' }}>
                  {c.payRatio}x
                </td>

                <td>{pps ? formatUsd(pps) : '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
