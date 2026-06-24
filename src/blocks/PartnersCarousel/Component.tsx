import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'

type InlinePartner = {
  name: string
  logoImage?: any
  websiteURL?: string
}

type Props = {
  heading?: string
  useGlobalPartners?: boolean
  partners?: InlinePartner[]
  speed?: 'slow' | 'normal' | 'fast'
}

const speedMap: Record<string, string> = {
  slow: '50s',
  normal: '30s',
  fast: '15s',
}

export async function PartnersCarouselBlockComponent({
  heading,
  useGlobalPartners = true,
  partners: inlinePartners,
  speed = 'normal',
}: Props) {
  let partners: InlinePartner[] = inlinePartners || []

  if (useGlobalPartners) {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'partners',
        limit: 50,
        overrideAccess: false,
        where: { _status: { equals: 'published' } },
      })
      partners = result.docs.map((p: any) => ({
        name: p.name,
        logoImage: p.logoImage,
        websiteURL: p.websiteURL,
      }))
    } catch {
      partners = inlinePartners || []
    }
  }

  if (partners.length === 0) return null

  const duration = speedMap[speed] ?? speedMap.normal
  // Duplicate items for seamless infinite loop
  const doubled = [...partners, ...partners]

  return (
    <section className="py-10 bg-white overflow-hidden">
      <Container>
        {heading && (
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-text-muted mb-6">
            {heading}
          </p>
        )}
      </Container>
      <div className="group relative">
        {/* Left / right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex items-center gap-10 group-hover:[animation-play-state:paused]"
          style={{
            animation: `scrollLeft ${duration} linear infinite`,
            width: 'max-content',
          }}
        >
          {doubled.map((partner, i) => {
            const inner = (
              <div className="shrink-0 flex items-center justify-center h-14 w-32">
                {partner.logoImage && typeof partner.logoImage === 'object' ? (
                  <Media
                    resource={partner.logoImage}
                    className="h-full w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className="text-sm font-semibold text-brand-text-muted">{partner.name}</span>
                )}
              </div>
            )

            return partner.websiteURL ? (
              <a key={i} href={partner.websiteURL} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
