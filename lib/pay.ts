export function secondsInYear(year: number) {
  const start = Date.UTC(year, 0, 1, 0, 0, 0)
  const end = Date.UTC(year + 1, 0, 1, 0, 0, 0)
  return Math.floor((end - start) / 1000)
}

export function payPerSecond(totalCompUsd: number, year: number) {
  return totalCompUsd / secondsInYear(year)
}

export function earningsSoFar(totalCompUsd: number, year: number, nowMs: number) {
  const start = Date.UTC(year, 0, 1, 0, 0, 0)
  const elapsedSeconds = Math.max(0, Math.floor((nowMs - start) / 1000))
  const earned = elapsedSeconds * payPerSecond(totalCompUsd, year)
  return Math.min(totalCompUsd, earned)
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatUsd2(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(amount)
}
