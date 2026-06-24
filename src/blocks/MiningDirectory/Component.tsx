import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Globe, Twitter } from 'lucide-react'

import { cn } from '@/utilities/ui'
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
    sort: 'country',
  })

  const orgs = result.docs

  const grouped: Record<string, typeof orgs> = {}
  for (const org of orgs) {
    const key = org.country || 'Other'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(org)
  }

  const countries = Object.keys(grouped).sort()

  return (
    <section className="py-16 bg-brand-cream">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <SectionHeading heading={heading} subheading={subheading} align="left" className="mb-0" />
          {showAddListingButton && (
            <ABButton asChild variant="primary" size="sm">
              <Link href={addListingUrl}>+ Add Your Organization</Link>
            </ABButton>
          )}
        </div>

        {orgs.length === 0 ? (
          <p className="text-brand-text-muted text-center py-12">No mining organizations listed yet.</p>
        ) : groupByCountry ? (
          <div className="space-y-12">
            {countries.map((country) => (
              <div key={country}>
                <h3 className="text-lg font-bold text-brand-secondary mb-6 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-brand-primary inline-block" />
                  {country}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {grouped[country].map((org) => (
                    <OrgCard key={org.id} org={org} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orgs.map((org) => <OrgCard key={org.id} org={org} />)}
          </div>
        )}
      </Container>
    </section>
  )
}

function OrgCard({ org }: { org: any }) {
  return (
    <div className="bg-white rounded-card border border-brand-border-light shadow-card hover:shadow-elevated transition-shadow p-5 flex flex-col gap-3">
      {/* Logo + name */}
      <div className="flex items-start gap-3">
        {org.logoImage && typeof org.logoImage === 'object' ? (
          <div className="w-12 h-12 rounded-btn overflow-hidden shrink-0 border border-brand-border-light">
            <Media resource={org.logoImage} className="w-full h-full object-contain p-1" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-btn bg-brand-primary/10 shrink-0 flex items-center justify-center text-brand-primary font-bold text-lg">
            {org.name?.charAt(0) ?? '⛏'}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-brand-secondary text-sm leading-tight">{org.name}</h4>
          {org.city && <p className="text-xs text-brand-text-muted mt-0.5">{org.city}</p>}
        </div>
      </div>

      {org.description && (
        <p className="text-xs text-brand-text-mid leading-relaxed line-clamp-3">{org.description}</p>
      )}

      {/* Links */}
      <div className="flex items-center gap-3 mt-auto pt-1">
        {org.websiteURL && (
          <a href={org.websiteURL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
            <Globe size={13} /> Website
          </a>
        )}
        {org.twitterURL && (
          <a href={org.twitterURL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-brand-text-muted hover:text-brand-primary transition-colors">
            <Twitter size={13} /> Twitter
          </a>
        )}
      </div>
    </div>
  )
}
