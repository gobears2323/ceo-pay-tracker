import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CEO Pay Tracker',
  description: 'Real time CEO pay counters using public compensation disclosures'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="header">
            <div className="brand">
              <div className="brandTitle">CEO Pay Tracker</div>
              <span className="badge">V1</span>
            </div>
            <div className="muted">Public proxy statement data</div>
          </div>
          {children}
          <div className="footer">
            Data is directional. Always verify against the latest SEC proxy statement.
          </div>
        </div>
      </body>
    </html>
  )
}
