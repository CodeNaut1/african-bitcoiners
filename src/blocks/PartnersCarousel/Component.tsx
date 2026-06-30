import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Container } from '@/components/ui/container'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type InlinePartner = {
  name: string
  logoImage?: any
  websiteURL?: string
  logoWidth?: number | null
}

type Props = {
  heading?: string
  useGlobalPartners?: boolean
  partners?: InlinePartner[]
  speed?: 'slow' | 'normal' | 'fast'
  isHome?: boolean
}

const speedMap: Record<string, string> = {
  slow: '30s',
  normal: '20s',
  fast: '12s',
}

// Default display width (px) for a logo when a partner has no explicit logoWidth.
const DEFAULT_LOGO_WIDTH = 240

type CarouselLogo = { url: string; width: number; link?: string; alt: string }

function resolveLogo(partner: InlinePartner): CarouselLogo | null {
  const logo = partner.logoImage
  if (!logo || typeof logo !== 'object') return null
  const url = getMediaUrl((logo as { url?: string }).url, (logo as { updatedAt?: string }).updatedAt)
  if (!url) return null
  return {
    url,
    width: partner.logoWidth || DEFAULT_LOGO_WIDTH,
    link: partner.websiteURL || undefined,
    alt: (logo as { alt?: string }).alt || partner.name || 'Partner logo',
  }
}

/**
 * Partners Carousel — a faithful port of the WordPress `partner_logos` slider.
 * Logos live in the Partners collection (logo, website URL, display width) so a
 * single CMS-driven treatment is shared by every instance of the block.
 */
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
        sort: 'name',
        depth: 1,
      })
      partners = result.docs.map((p: any) => ({
        name: p.name,
        logoImage: p.logoImage,
        websiteURL: p.websiteURL,
        logoWidth: p.logoWidth,
      }))
    } catch {
      partners = inlinePartners || []
    }
  }

  const logos = partners.map(resolveLogo).filter((l): l is CarouselLogo => l !== null)
  if (logos.length === 0) return null

  const duration = speedMap[speed] ?? speedMap.normal
  // Duplicate the set 4× for a seamless continuous loop (matches the WP markup).
  const loop = Array.from({ length: 4 }, () => logos).flat()

  return (
    <section className="overflow-hidden bg-[#F7F4EA] py-10 md:py-12">
      {heading && (
        <Container>
          <p className="mx-auto mb-8 max-w-4xl whitespace-pre-line text-center font-[family-name:var(--font-instrument-serif)] text-3xl font-normal leading-snug text-[#4D4D4D] sm:text-4xl md:text-5xl lg:text-6xl">
            {heading}
          </p>
        </Container>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
.afb-logo-carousel-wrapper { overflow: hidden; width: 100%; background: transparent; padding: 40px 0; }
.afb-logo-carousel { display: flex; gap: 0; width: fit-content; animation: afb-scroll-left ${duration} linear infinite; }
.afb-logo-item { flex-shrink: 0; border: 1px solid #D9D9D9; border-right: none; background: transparent; padding: 30px 40px; display: flex; align-items: center; justify-content: center; height: 150px; box-sizing: border-box; text-decoration: none; cursor: pointer; transition: background-color 0.3s ease, transform 0.2s ease; }
.afb-logo-item:hover { background-color: #F9F9F9; transform: scale(1.02); }
.afb-logo-item:last-child { border-right: 1px solid #D9D9D9; }
.afb-logo-item img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; pointer-events: none; }
@keyframes afb-scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-25%); } }
.afb-logo-carousel-wrapper:hover .afb-logo-carousel { animation-play-state: paused; }
@media (max-width: 768px) { .afb-logo-item { padding: 20px 30px; height: 120px; } }
`,
        }}
      />

      <div className="afb-logo-carousel-wrapper">
        <div className="afb-logo-carousel">
          {loop.map((logo, i) => {
            const inner = (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo.url} alt={logo.alt} />
            )
            return logo.link ? (
              <a
                key={i}
                href={logo.link}
                className="afb-logo-item"
                style={{ width: `${logo.width}px` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div key={i} className="afb-logo-item" style={{ width: `${logo.width}px` }}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
