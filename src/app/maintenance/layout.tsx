import { Sora } from 'next/font/google'
import React from 'react'

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={sora.className} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
