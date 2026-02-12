'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { companies, dataMeta } from '../lib/data.generated'
import { formatUsd, payPerSecond } from '../lib/pay'

type SortKey =
  | 'comp'
  | 'ratio'
  | 'marketCap'

export default function HomePage() {
  const [now, setNow] = useState(new Date())
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('All')
  const [sortBy, setSortBy] =
    useState<SortKey>('comp')

  useEffect(() => {
    const id = setInterval(
      () => setNow(new Date()),
      100
    )
    return () => clearInterval(id)
  }, [])

  const uniqueSectors = Array.from(
    new Set(companies.map(c => c.sector))
  )

  const filtered = useMemo(() => {
    return companies
      .filter(c =>
        (c.companyName || '')
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (c.ticker || '')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter(c =>
        sector === 'All'
          ? true
          : c.sector === sector
      )
  }, [search, sector])

  const sorted = useMemo(() => {
    const copy = [...filtered]

    if (sortBy === 'comp') {
      copy.sort(
        (a, b) =>
          (b.totalCompUsd ?? 0) -
          (a.totalCompUsd ?? 0)
      )
    }

    if (sortBy === 'ratio') {
      copy.sort(
        (a, b) =>
          (b.payRatio ?? 0) -
          (a.payRatio ?? 0)
      )
    }

    if (sortBy === 'marketCap') {
      copy.sort(
        (a, b) =>
          b.marketCapUsd -
          a.marketCapUsd
      )
    }

    return copy
  }, [filtered, sortBy])

  const globalPps = sorted.reduce(
    (sum, c) => {
      if (
        !c.totalCompUsd ||
        !c.fiscalYear
      )
        return sum

      return (
        sum +
        payPerSecond(
          c.totalCompUsd,
          c.fiscalYear
        )
      )
    },
    0
  )

  const secondsSinceYearStart = (() => {
    const start = new Date(
      now.getFullYear(),
      0,
      1
    ).getTime()
    return (
      (now.getTime() - start) /
      1000
    )
  })()

  const globalEarned =
    globalPps *
    secondsSinceYearStart

  return (
    <div
      style={{
        padding: 60,
        backgroundColor:
          '#0b0f14',
        color: '#ffffff',
        minHeight: '100vh',
        fontFamily:
          'Inter, -apple-system, sans-serif'
      }}
    >
      {/* HERO */}
      <h1
        style={{
          fontSize: 56,
          fontWeight: 800
        }}
      >
        CEO Pay Intelligence
      </h1>

      <div
        style={{
          marginTop: 10,
          color: '#888'
        }}
      >
        YTD CEO Compensation Across Top{' '}
        {sorted.length} Companies
      </div>

      <div
        style={{
          marginTop: 50,
          fontSize: 72,
          fontWeight: 900,
          color: '#00ff88',
          transition:
            'all 0.1s linear'
        }}
      >
        {formatUsd(globalEarned)}
      </div>

      <div
        style={{
          fontSize: 22,
          marginTop: 10,
          color: '#ccc'
        }}
      >
        {formatUsd(globalPps)} per
        second · Updated live
      </div>

      {/* CONTROLS */}
      <div
        style={{
          marginTop: 50,
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap'
        }}
      >
        <input
          placeholder="Search company"
          value={search}
          onChange={e =>
            setSearch(
              e.target.value
            )
          }
          style={{
            padding: 12,
            fontSize: 16,
            backgroundColor:
              '#111',
            color: '#fff',
            border:
              '1px solid #333'
          }}
        />

        <select
          value={sector}
          onChange={e =>
            setSector(
              e.target.value
            )
          }
          style={{
            padding: 12,
            backgroundColor:
              '#111',
            color: '#fff',
            border:
              '1px solid #333'
          }}
        >
          <option>
            All
          </option>
          {uniqueSectors.map(
            s => (
              <option
                key={s}
              >
                {s}
              </option>
            )
          )}
        </select>

        <select
          value={sortBy}
          onChange={e =>
            setSortBy(
              e.target
                .value as SortKey
            )
          }
          style={{
            padding: 12,
            backgroundColor:
              '#111',
            color: '#fff',
            border:
              '1px solid #333'
          }}
        >
          <option value="comp">
            Sort by Compensation
          </option>
          <option value="ratio">
            Sort by Pay Ratio
          </option>
          <option value="marketCap">
            Sort by Market Cap
          </option>
        </select>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: '100%',
          marginTop: 40,
          borderCollapse:
            'collapse'
        }}
      >
        <thead>
          <tr
            style={{
              color: '#888'
            }}
          >
            <th align="left">
              Rank
            </th>
            <th align="left">
              Company
            </th>
            <th align="left">
              CEO
            </th>
            <th align="left">
              Sector
            </th>
            <th align="left">
              Market Cap
            </th>
            <th align="left">
              Total Comp
            </th>
            <th align="left">
              Pay Ratio
            </th>
            <th align="left">
              Per Second
            </th>
            <th align="left">
              Median Salary
              Time
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map(
            (
              c,
              index
            ) => {
              const pps =
                c.totalCompUsd &&
                c.fiscalYear
                  ? payPerSecond(
                      c.totalCompUsd,
                      c.fiscalYear
                    )
                  : 0

              const secondsToEarnMedian =
                c.medianWorkerPayUsd &&
                pps
                  ? c.medianWorkerPayUsd /
                    pps
                  : null

              const minutes =
                secondsToEarnMedian
                  ? (
                      secondsToEarnMedian /
                      60
                    ).toFixed(1)
                  : '—'

              return (
                <tr
                  key={
                    c.ticker
                  }
                  style={{
                    borderTop:
                      '1px solid #222'
                  }}
                >
                  <td>
                    {index +
                      1}
                  </td>

                  <td>
                    <Link
                      href={`/company/${c.ticker}`}
                      style={{
                        color:
                          '#00ff88',
                        textDecoration:
                          'none'
                      }}
                    >
                      {
                        c.companyName
                      }
                    </Link>
                  </td>

                  <td>
                    {c.ceoName}
                  </td>

                  <td>
                    {c.sector}
                  </td>

                  <td>
                    {formatUsd(
                      c.marketCapUsd
                    )}
                  </td>

                  <td>
                    {formatUsd(
                      c.totalCompUsd ||
                        0
                    )}
                  </td>

                  <td
                    style={{
                      color:
                        '#00ff88'
                    }}
                  >
                    {
                      c.payRatio
                    }
                    x
                  </td>

                  <td>
                    {formatUsd(
                      pps
                    )}
                  </td>

                  <td>
                    {minutes}{' '}
                    min
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </div>
  )
}
