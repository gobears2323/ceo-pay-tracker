'use client'

import { useEffect, useState } from 'react'
import { companies } from '../../../lib/data.generated'
import { formatUsd, payPerSecond } from '../../../lib/pay'
import { useParams } from 'next/navigation'

export default function CompanyPage() {
  const params = useParams()
  const ticker = params?.ticker as string

  const company = companies.find(c => c.ticker === ticker)

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 100)
    return () => clearInterval(id)
  }, [])

  if (!company) {
    return (
      <div style={{ padding: 60 }}>
        Company not found
      </div>
    )
  }

  const pps =
    company.totalCompUsd && company.fiscalYear
      ? payPerSecond(company.totalCompUsd, company.fiscalYear)
      : 0

  const secondsSinceYearStart = (() => {
    const start = new Date(now.getFullYear(), 0, 1).getTime()
    return (now.getTime() - start) / 1000
  })()

  const earned = pps * secondsSinceYearStart

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
      <h1 style={{ fontSize: 48, fontWeight: 800 }}>
        {company.companyName}
      </h1>

      <div style={{ marginTop: 10, color: '#888' }}>
        {company.ticker} · {company.sector}
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 56,
          fontWeight: 900,
          color: '#00ff88'
        }}
      >
        {formatUsd(earned)}
      </div>

      <div style={{ marginTop: 10 }}>
        {formatUsd(pps)} per second
      </div>

      <div style={{ marginTop: 40 }}>
        CEO: {company.ceoName}
      </div>

      <div style={{ marginTop: 10 }}>
        Total Compensation:{' '}
        {company.totalCompUsd
          ? formatUsd(company.totalCompUsd)
          : 'Unknown'}
      </div>

      <div style={{ marginTop: 10 }}>
        Pay Ratio: {company.payRatio}x
      </div>
    </div>
  )
}
