'use client'

import React, { useMemo } from 'react'

import { isInflationSimulatorPage } from '@/components/InflationSimulator/page-detect'
import { InflationSimulator } from '@/components/InflationSimulator'
import {
  InflationSimulatorChartSection,
  InflationSimulatorCta,
  InflationSimulatorHero,
  parseInflationSimulatorTailHtml,
} from '@/components/InflationSimulator/PageSections'
import { FormPlaceholder } from './FormPlaceholder'

const COMBINED_MARKER_RE =
  /<!--\s*FORM_PLACEHOLDER:\s*([\w-]+)\s*-->|\[bitcoin_simulator\]|<!--\s*SIMULATOR_PLACEHOLDER(?:\s*:\s*[\w-]+)?\s*-->/g

type Segment =
  | { kind: 'html'; content: string }
  | { kind: 'form'; formType: string }
  | { kind: 'simulator' }

function parseRawHtml(rawHtml: string, appendSimulatorIfMissing: boolean): Segment[] {
  const segments: Segment[] = []
  let lastIndex = 0
  let hasSimulator = false

  for (const match of rawHtml.matchAll(COMBINED_MARKER_RE)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ kind: 'html', content: rawHtml.slice(lastIndex, index) })
    }

    if (match[1]) {
      segments.push({ kind: 'form', formType: match[1] })
    } else {
      hasSimulator = true
      segments.push({ kind: 'simulator' })
    }

    lastIndex = index + match[0].length
  }

  if (lastIndex < rawHtml.length) {
    segments.push({ kind: 'html', content: rawHtml.slice(lastIndex) })
  }

  if (!hasSimulator && appendSimulatorIfMissing) {
    segments.push({ kind: 'simulator' })
  }

  return segments
}

/** Split WP HTML into intro (hero) and tail (chart + CTA) when no simulator marker exists. */
function splitInflationSimulatorHtml(rawHtml: string): { introHtml: string; tailHtml: string } {
  const chartIdx = rawHtml.search(/<img[^>]+USD-to-Bitcoin-Purchasing-Power-Chart/i)
  if (chartIdx > 0) {
    return {
      introHtml: rawHtml.slice(0, chartIdx),
      tailHtml: rawHtml.slice(chartIdx),
    }
  }

  const h3Idx = rawHtml.search(/<h3[^>]*>\s*Don['']t Let Inflation/i)
  if (h3Idx > 0) {
    return {
      introHtml: rawHtml.slice(0, h3Idx),
      tailHtml: rawHtml.slice(h3Idx),
    }
  }

  return { introHtml: rawHtml, tailHtml: '' }
}

function normalizeInflationSimulatorSegments(
  segments: Segment[],
  rawHtml: string,
): { tailHtml: string; ordered: Segment[] } {
  const hasExplicitSimulator = segments.some((s) => s.kind === 'simulator')
  const tailFromSegments = [...segments].reverse().find((s) => s.kind === 'html')
  let tailHtml = tailFromSegments?.kind === 'html' ? tailFromSegments.content : ''

  if (hasExplicitSimulator) {
    const ordered = segments.filter((s) => s.kind !== 'html')
    return { tailHtml, ordered }
  }

  const { introHtml, tailHtml: splitTail } = splitInflationSimulatorHtml(rawHtml)
  tailHtml = splitTail || tailHtml

  const ordered: Segment[] = []
  if (introHtml.trim()) ordered.push({ kind: 'html', content: introHtml })
  ordered.push({ kind: 'simulator' })

  return { tailHtml, ordered }
}

type Props = {
  rawHtml: string
  className?: string
  /** Append simulator after content when no shortcode/placeholder marker is present */
  appendSimulatorIfMissing?: boolean
}

export function RawHtmlRenderer({
  rawHtml,
  className,
  appendSimulatorIfMissing = false,
}: Props) {
  const isInflationSimulator = isInflationSimulatorPage(rawHtml)

  const segments = useMemo(
    () => parseRawHtml(rawHtml, appendSimulatorIfMissing),
    [rawHtml, appendSimulatorIfMissing],
  )

  const inflationLayout = useMemo(
    () => (isInflationSimulator ? normalizeInflationSimulatorSegments(segments, rawHtml) : null),
    [isInflationSimulator, segments, rawHtml],
  )

  const hasInteractiveSegments = segments.some(
    (s) => s.kind === 'form' || s.kind === 'simulator',
  )

  if (!hasInteractiveSegments) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: rawHtml }} />
  }

  if (isInflationSimulator && inflationLayout) {
    const { tailHtml, ordered } = inflationLayout
    const { chartImageSrc, cta } = parseInflationSimulatorTailHtml(tailHtml)

    return (
      <div className={className}>
        <InflationSimulatorHero />
        {ordered.map((segment, i) => {
          if (segment.kind === 'html') return null
          if (segment.kind === 'form') {
            return <FormPlaceholder key={i} formType={segment.formType} />
          }
          return <InflationSimulator key={i} />
        })}
        {tailHtml ? (
          <>
            <InflationSimulatorChartSection imageSrc={chartImageSrc} />
            <InflationSimulatorCta {...cta} />
          </>
        ) : null}
      </div>
    )
  }

  return (
    <div className={className}>
      {segments.map((segment, i) => {
        if (segment.kind === 'html') {
          return segment.content ? (
            <div key={i} dangerouslySetInnerHTML={{ __html: segment.content }} />
          ) : null
        }
        if (segment.kind === 'form') {
          return <FormPlaceholder key={i} formType={segment.formType} />
        }
        return <InflationSimulator key={i} />
      })}
    </div>
  )
}
