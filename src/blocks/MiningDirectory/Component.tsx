import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Globe, Twitter } from 'lucide-react'

import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Media } from '@/components/Media'

type Props = {
  heading?: string
  subheading?: string
  groupByCountry?: boolean
  showAddListingButton?: boolean
  addListingUrl?: string
}

// Preferred display order for country groups (matches the live site).
const COUNTRY_ORDER = [
  'Democratic Republic of Congo',
  'Ethiopia',
  'Zambia',
  'Namibia',
  'Nigeria',
  'Pan-African',
  'GAMA Africa',
]

// Converts an ISO 3166-1 alpha-2 country code into a flag emoji.
function flagEmoji(code?: string | null) {
  if (!code || code.length !== 2) return null
  const cc = code.toUpperCase()
  if (!/^[A-Z]{2}$/.test(cc)) return null
  return String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
}

export async function MiningDirectoryBlockComponent({
  heading = 'African Mining Directory',
  subheading,
  groupByCountry = true,
  showAddListingButton = true,
  addListingUrl = '#mining-form',
}: Props) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'mining-orgs',
    limit: 200,
    overrideAccess: false,
    depth: 1,
    sort: 'createdAt',
  })

  const orgs = result.docs

  const grouped: Record<string, typeof orgs> = {}
  for (const org of orgs) {
    const key = org.country || 'Other'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(org)
  }

  const countries = Object.keys(grouped).sort((a, b) => {
    const ia = COUNTRY_ORDER.indexOf(a)
    const ib = COUNTRY_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading
          heading={heading}
          subheading={subheading}
          align="center"
          className="mx-auto mb-12 md:mb-16"
        />

        {orgs.length === 0 ? (
          <p className="py-12 text-center text-brand-text-muted">No mining organizations listed yet.</p>
        ) : groupByCountry ? (
          <div className="space-y-12 md:space-y-16">
            {countries.map((country) => (
              <div key={country}>
                <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-brand-secondary md:text-2xl">
                  {flagEmoji(grouped[country][0]?.countryFlagCode) ? (
                    <span className="text-2xl leading-none md:text-3xl" aria-hidden>
                      {flagEmoji(grouped[country][0]?.countryFlagCode)}
                    </span>
                  ) : (
                    <span className="inline-block h-0.5 w-7 bg-brand-primary" aria-hidden />
                  )}
                  {country}
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[country].map((org) => (
                    <OrgCard key={org.id} org={org} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orgs.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        )}

        {showAddListingButton && (
          <div className="mt-14 flex justify-center md:mt-16">
            <ABButton asChild variant="primary" size="md">
              <Link href={addListingUrl}>Submit a Mining Organization</Link>
            </ABButton>
          </div>
        )}
      </Container>
    </section>
  )
}

function OrgCard({ org }: { org: any }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-card border border-brand-border-light bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-elevated">
      <div className="flex items-start gap-4">
        {org.logoImage && typeof org.logoImage === 'object' ? (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-card border border-brand-border-light bg-white">
            <Media resource={org.logoImage} imgClassName="h-full w-full object-contain p-1.5" />
          </div>
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-brand-primary/10 text-lg font-bold text-brand-primary">
            {org.name?.charAt(0) ?? '⛏'}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="font-heading text-base font-semibold leading-snug text-brand-secondary">
            {org.name}
          </h4>
          {org.city && <p className="mt-0.5 text-xs text-brand-text-muted">{org.city}</p>}
        </div>
      </div>

      {org.description && (
        <p className="text-sm leading-relaxed text-brand-text-mid">{org.description}</p>
      )}

      <div className="mt-auto flex items-center gap-4 pt-1">
        {org.websiteURL && (
          <a
            href={org.websiteURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary transition-colors hover:text-brand-secondary"
          >
            <Globe size={14} /> Website
          </a>
        )}
        {org.twitterURL && (
          <a
            href={org.twitterURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-text-muted transition-colors hover:text-brand-primary"
          >
            <Twitter size={14} /> Twitter
          </a>
        )}
      </div>
    </div>
  )
}
