'use client'

import { useEffect, useMemo, useState } from 'react'
import { earningsSoFar, formatUsd, payPerSecond } from '../lib/pay'
import type { CompanyComp } from '../lib/types'

export function RealtimeCounter({ item }: { item: CompanyComp }) {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 250)
    return () => clearInterval(id)
  }, [])

  const pps = useMemo(() => payPerSecond(item.totalCompUsd, item.fiscalYear), [item])
  const earned = useMemo(
    () => earningsSoFar(item.totalCompUsd, item.fiscalYear, now.getTime()),
    [item, now]
  )

  const anyItem = item as any
  const ceoLabel = anyItem.ceoName ?? anyItem.ceo ?? 'CEO'
  const companyLabel = anyItem.company ?? anyItem.companyName ?? anyItem.name ?? anyItem.ticker ?? 'Company'

  return (
    <div className="kpi">
      <div className="kpiValue">{formatUsd(earned)}</div>
      <div className="kpiSub">
        {ceoLabel} at {companyLabel} has earned this year so far, assuming pay accrues evenly.
      </div>
      <div className="kpiSub">
        Implied rate: {formatUsd(pps)} per second based on reported {item.fiscalYear} total compensation.
      </div>
    </div>
  )
}

