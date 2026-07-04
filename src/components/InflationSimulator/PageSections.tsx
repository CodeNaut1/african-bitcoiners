import React from 'react'

import { IS } from './styles'

const CHART_IMAGE =
  'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/07/USD-to-Bitcoin-Purchasing-Power-Chart.png'

export function InflationSimulatorHero() {
  return (
    <header className="mb-8 text-center md:mb-10">
      <h1 className="font-heading text-[2rem] font-bold leading-tight text-brand-secondary md:text-[2.75rem] lg:text-[3.25rem]">
        African Currency vs Bitcoin{' '}
        <span style={{ color: IS.coral }}>Simulator</span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-brand-text-muted md:text-lg">
        Discover how inflation has silently destroyed your wealth and see what Bitcoin could have
        done instead
      </p>
    </header>
  )
}

export function InflationSimulatorChartSection({ imageSrc = CHART_IMAGE }: { imageSrc?: string }) {
  return (
    <section className="mt-10 md:mt-12">
      <div className="rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm md:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="font-heading text-xl font-bold leading-snug text-brand-secondary md:text-2xl">
            The Timeline of Wealth{' '}
            <span style={{ color: IS.coral }}>Destruction vs Protection</span>
          </h2>
          <div className="flex shrink-0 flex-wrap items-center gap-4 text-sm text-brand-text-dark">
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: IS.chartLegend.usd }}
                aria-hidden
              />
              USD Purchasing Power
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: IS.chartLegend.btc }}
                aria-hidden
              />
              Bitcoin
            </span>
          </div>
        </div>
        <img
          src={imageSrc}
          alt="USD purchasing power vs Bitcoin price timeline chart"
          className="h-auto w-full rounded-lg"
          loading="lazy"
        />
      </div>
    </section>
  )
}

type CtaProps = {
  title?: string
  description?: string
  buttonLabel?: string
  buttonHref?: string
}

export function InflationSimulatorCta({
  title = "Don't Let Inflation Steal Your Future",
  description = 'Every day you wait, inflation continues to silently destroy your wealth. Bitcoin offers a way to protect and grow your savings.',
  buttonLabel = 'Learn Bitcoin',
  buttonHref = '/learn-bitcoin/free-bitcoin-course',
}: CtaProps) {
  return (
    <section className="mt-10 md:mt-12">
      <div
        className="rounded-xl px-6 py-10 text-center md:px-12 md:py-14"
        style={{ backgroundColor: IS.coral }}
      >
        <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg">
          {description}
        </p>
        <a
          href={buttonHref}
          className="mt-8 inline-block rounded-md bg-white px-8 py-3.5 text-base font-bold transition-opacity hover:opacity-90"
          style={{ color: IS.coral }}
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  )
}

/** Pull chart image + CTA copy from migrated WP HTML when present. */
export function parseInflationSimulatorTailHtml(html: string): {
  chartImageSrc?: string
  cta: CtaProps
} {
  const imgMatch = html.match(/<img[^>]+src="([^"]+)"/i)
  const h3Match = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  const aMatch = html.match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i)

  const stripTags = (s: string) =>
    s
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()

  return {
    chartImageSrc: imgMatch?.[1],
    cta: {
      title: h3Match ? stripTags(h3Match[1]) : undefined,
      description: pMatch ? stripTags(pMatch[1]) : undefined,
      buttonLabel: aMatch ? stripTags(aMatch[2]) : undefined,
      buttonHref: aMatch?.[1]?.startsWith('http')
        ? aMatch[1].replace(
            'https://staging2.bitcoiners.africa/learn-section/free-bitcoin-course/',
            '/learn-bitcoin/free-bitcoin-course',
          )
        : aMatch?.[1] || undefined,
    },
  }
}
