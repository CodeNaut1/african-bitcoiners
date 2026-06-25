'use client'

import React, { useMemo } from 'react'

import { FormPlaceholder } from './FormPlaceholder'

const PLACEHOLDER_RE = /<!--\s*FORM_PLACEHOLDER:\s*([\w-]+)\s*-->/g

type Segment =
  | { kind: 'html'; content: string }
  | { kind: 'form'; formType: string }

function parseRawHtml(rawHtml: string): Segment[] {
  const segments: Segment[] = []
  let lastIndex = 0

  for (const match of rawHtml.matchAll(PLACEHOLDER_RE)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ kind: 'html', content: rawHtml.slice(lastIndex, index) })
    }
    segments.push({ kind: 'form', formType: match[1] })
    lastIndex = index + match[0].length
  }

  if (lastIndex < rawHtml.length) {
    segments.push({ kind: 'html', content: rawHtml.slice(lastIndex) })
  }

  return segments
}

type Props = {
  rawHtml: string
  className?: string
}

export function RawHtmlRenderer({ rawHtml, className }: Props) {
  const segments = useMemo(() => parseRawHtml(rawHtml), [rawHtml])
  const hasPlaceholders = segments.some((s) => s.kind === 'form')

  if (!hasPlaceholders) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: rawHtml }} />
  }

  return (
    <div className={className}>
      {segments.map((segment, i) =>
        segment.kind === 'html' ? (
          segment.content ? (
            <div key={i} dangerouslySetInnerHTML={{ __html: segment.content }} />
          ) : null
        ) : (
          <FormPlaceholder key={i} formType={segment.formType} />
        ),
      )}
    </div>
  )
}
