'use client'

import { useMemo, useState } from 'react'
import { companies, dataMeta } from '../lib/data.generated'
import { formatUsd, payPerSecond } from '../lib/pay'

export default function HomePage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return companies.filter(c =>
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.ticker.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const sorted = [...filtered].sort((a, b) =>
    (b.totalCompUsd ?? 0) - (a.totalCompUsd ?? 0)
  )

  const totalComp = sorted.reduce((sum, c) =>
    sum + (c.totalCompUsd ?? 0), 0
  )

  const totalPps = sorted.reduce((sum, c) =>
    sum + (c.totalCompUsd && c.fiscalYear
      ? payPerSecond(c.totalCompUsd, c.fiscalYear)
      : 0),
    0
  )

  return (
    <div style={{ padding: 60 }}>

      <h1 style={{ fontSize: 48, fontWeight: 800 }}>
        CEO Pay Intelligence
      </h1>

      <div style={{ marginTop: 10, color: '#888' }}>
        Generated: {dataMeta.generatedAt}
      </div>

      <div style={{ marginTop: 40, fontSize: 32 }}>
        Total CEO Compensation: {formatUsd(totalComp)}
      </div>

      <div style={{ fontSize: 24, marginTop: 10 }}>
        Combined Per Second: {formatUsd(totalPps)}
      </div>

      <div style={{ marginTop: 40 }}>
        <input
          placeholder="Search company or ticker"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 10,
            width: 300,
            fontSize: 16
          }}
        />
      </div>

      <table style={{ width: '100%', marginTop: 40 }}>
        <thead>
          <tr>
            <th align="left">Company</th>
            <th align="left">Ticker</th>
            <th align="left">CEO</th>
            <th align="left">Total Comp</th>
            <th align="left">Ratio</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map(c => (
            <tr key={c.ticker}>
              <td>{c.companyName}</td>
              <td>{c.ticker}</td>
              <td>{c.ceoName}</td>
              <td>
                {c.totalCompUsd
                  ? formatUsd(c.totalCompUsd)
                  : 'Unknown'}
              </td>
              <td>
                {c.payRatio
                  ? `${c.payRatio}x`
                  : 'Unknown'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}



