'use client'

import { useEffect, useMemo, useState } from 'react'
import { earnedSoFarThisYear, formatUsd, payPerSecond } from '../lib/pay'
import type { CeoComp } from '../lib/types'

export function RealtimeCounter({ item }: { item: CeoComp }) {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 250)
    return () => clearInterval(id)
  }, [])

  const pps = useMemo(() => payPerSecond(item.totalCompUsd, item.fiscalYear), [item])
  const earned = useMemo(() => earnedSoFarThisYear(pps, now), [pps, now])

  return (
    <div className="kpi">
      <div className="kpiValue">{formatUsd(earned)}</div>
      <div className="kpiSub">
        {item.ceo} at {item.company} has earned this year so far, assuming pay accrues evenly.
      </div>
      <div className="kpiSub">
        Implied rate: {formatUsd(pps)} per second based on reported {item.fiscalYear} total compensation.
      </div>
    </div>
  )
}
