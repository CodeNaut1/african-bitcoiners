import React from 'react'
import { Logo } from '@/components/Logo/Logo'

type Props = {
  logoUrl?: string | null
}

export function MaintenancePage({ logoUrl }: Props) {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-[#FFF9F5] px-6 py-12 text-[#253343]"
    >
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <Logo src={logoUrl} className="mb-10" />

        <div className="mb-8 h-1 w-16 rounded-full bg-[#EB5528]" aria-hidden="true" />

        <h1 className="mb-4 font-sora text-3xl font-bold tracking-tight sm:text-4xl">
          We&apos;ll be right back!
        </h1>

        <p className="max-w-md text-base leading-relaxed text-[#253343]/85 sm:text-lg">
          bitcoiners.africa is currently undergoing scheduled maintenance. We will be back shortly.
          Thank you for your patience!
        </p>
      </div>
    </main>
  )
}
