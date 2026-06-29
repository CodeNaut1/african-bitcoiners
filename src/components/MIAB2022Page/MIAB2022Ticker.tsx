'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

import { OTHER_YEARS } from '@/components/MIAB2022Page/data'

const TICKER_ORANGE = '#CB5F00'
const TICKER_CREAM = '#FFF7ED'

export function MIAB2022Ticker() {
  const [index, setIndex] = useState(0)

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? OTHER_YEARS.length - 1 : i - 1))
  }, [])

  const next = useCallback(() => {
    setIndex((i) => (i === OTHER_YEARS.length - 1 ? 0 : i + 1))
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [next])

  const item = OTHER_YEARS[index]

  return (
    <div className="mx-auto flex max-w-[1200px] items-stretch overflow-hidden rounded-sm bg-white shadow-sm">
      <div
        className="flex shrink-0 items-center px-5 py-4 md:px-8"
        style={{ backgroundColor: TICKER_ORANGE }}
      >
        <span
          className="whitespace-nowrap text-xs font-bold uppercase tracking-wide md:text-sm"
          style={{ color: TICKER_CREAM }}
        >
          View Other Years
        </span>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous year"
          className="shrink-0 text-[22px] leading-none text-[#222] transition-colors hover:text-[#CB5F00]"
        >
          ‹
        </button>

        <div className="min-w-0 flex-1 text-center">
          <Link
            href={item.href}
            className="block truncate text-sm font-bold uppercase tracking-tight text-[#222] transition-colors hover:text-[#CB5F00] md:text-xl"
          >
            {item.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next year"
          className="shrink-0 text-[22px] leading-none text-[#222] transition-colors hover:text-[#CB5F00]"
        >
          ›
        </button>
      </div>
    </div>
  )
}
