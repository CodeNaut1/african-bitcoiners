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
  isHome?: boolean
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
  isHome,
}: Props) {
  let partners: InlinePartner[] = inlinePartners || []

  if (useGlobalPartners) {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'partners',
        limit: 50,
        overrideAccess: false,
        sort: 'name',
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
    <section className={cn('overflow-hidden py-10 md:py-12', isHome ? 'bg-[#F7F4EA]' : 'bg-white')}>
      <Container>
        {heading && (
          <p
            className={cn(
              'mb-6 text-center',
              isHome
                ? 'font-heading text-lg italic text-brand-secondary md:text-xl'
                : 'text-xs font-semibold uppercase tracking-widest text-brand-text-muted',
            )}
          >
            {heading}
          </p>
        )}
      </Container>
      <div className="group relative">
        <div
          className={cn(
            'pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r to-transparent',
            isHome ? 'from-[#F7F4EA]' : 'from-white',
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l to-transparent',
            isHome ? 'from-[#F7F4EA]' : 'from-white',
          )}
        />

        <div
          className="flex items-center gap-10 group-hover:[animation-play-state:paused]"
          style={{
            animation: `scrollLeft ${duration} linear infinite`,
            width: 'max-content',
          }}
        >
          {doubled.map((partner, i) => {
            const inner = (
              <div className="flex h-14 w-32 shrink-0 items-center justify-center md:h-16 md:w-36">
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
