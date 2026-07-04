import type { Metadata } from 'next'
import { Sora } from 'next/font/google'

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const LOGO_URL =
  'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners-official_logo.png'

export const metadata: Metadata = {
  title: { absolute: 'Maintenance - African Bitcoiners' },
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  return (
    <main
      className={sora.className}
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF9F5',
        padding: '3rem 1.5rem',
        boxSizing: 'border-box',
        fontFamily: `${sora.style.fontFamily}, ui-sans-serif, system-ui, sans-serif`,
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '32rem',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_URL}
          alt="African Bitcoiners"
          width={220}
          height={80}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '220px',
            marginBottom: '2.5rem',
          }}
        />

        <div
          aria-hidden="true"
          style={{
            width: '4rem',
            height: '4px',
            borderRadius: '9999px',
            backgroundColor: '#FD5A47',
            marginBottom: '2rem',
          }}
        />

        <h1
          style={{
            margin: '0 0 1rem',
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#253343',
            lineHeight: 1.2,
          }}
        >
          We&apos;ll be right back!
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: '28rem',
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            lineHeight: 1.6,
            color: '#667085',
          }}
        >
          bitcoiners.africa is currently undergoing scheduled maintenance. We will be back shortly.
          Thank you for your patience!
        </p>
      </div>
    </main>
  )
}
