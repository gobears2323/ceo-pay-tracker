import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="card">
      <h1 className="h1">Not found</h1>
      <div className="muted">That ticker is not in your dataset yet.</div>
      <div style={{ height: 12 }} />
      <Link className="accent" href="/">
        Back home
      </Link>
    </div>
  )
}
