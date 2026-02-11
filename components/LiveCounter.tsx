'use client'

import { useEffect, useMemo, useState } from 'react'
import { earningsSoFar, formatUsd2, payPerSecond } from '@/lib/pay'

type Props = {
  totalCompUsd: number
  year: number
}

export function LiveCounter({ totalCompUsd, year }: Props) {
  const perSecond = useMemo(() => payPerSecond(totalCompUsd, year), [totalCompUsd, year])
  const [nowMs, setNowMs] = useState<number>(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 250)
    return () => clearInterval(id)
  }, [])

  const earned = earningsSoFar(totalCompUsd, year, nowMs)

  return (
    <div className="kpi">
      <div className="kpiValue">{formatUsd2(earned)}</div>
      <div className="kpiSub">
        Rate {formatUsd2(perSecond)} per second
      </div>
    </div>
  )
}
