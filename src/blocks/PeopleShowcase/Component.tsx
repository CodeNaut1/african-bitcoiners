import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type OtherYear = { year: number; url: string }

type Props = {
  year: number
  heading?: string
  layout?: 'grid-2col' | 'list-alternating'
  showYearNav?: boolean
  otherYears?: OtherYear[]
  backgroundColor?: 'cream' | 'white' | 'dark'
}

export async function PeopleShowcaseBlockComponent({
  year,
  heading,
  layout = 'grid-2col',
  showYearNav = true,
  otherYears,
  backgroundColor = 'cream',
}: Props) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'miab-nominees',
    limit: 50,
    overrideAccess: false,
    depth: 1,
    where: { year: { equals: year }, isPublished: { equals: true } },
    sort: 'rank',
  })

  const people = result.docs
  const isDark = backgroundColor === 'dark'

  return (
    <section className={cn('py-16', isDark ? 'bg-brand-secondary' : backgroundColor === 'white' ? 'bg-white' : 'bg-brand-cream')}>
      <Container>
        {(heading) && (
          <SectionHeading
            heading={heading}
            align="center"
            dark={isDark}
            className="mb-12"
          />
        )}

        {people.length === 0 ? (
          <p className={cn('text-center', isDark ? 'text-white/60' : 'text-brand-text-muted')}>
            No nominees published for {year} yet.
          </p>
        ) : layout === 'grid-2col' ? (
          <GridLayout people={people} isDark={isDark} />
        ) : (
          <ListLayout people={people} isDark={isDark} />
        )}

        {/* Year navigation */}
        {showYearNav && otherYears && otherYears.length > 0 && (
          <div className="mt-16 pt-10 border-t border-brand-border-light text-center">
            <p className={cn('text-sm font-semibold mb-4', isDark ? 'text-white/60' : 'text-brand-text-muted')}>
              View Other Years
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {otherYears.map((y) => (
                <Link
                  key={y.year}
                  href={y.url}
                  className={cn(
                    'px-5 py-2 rounded-btn text-sm font-semibold border-2 transition-colors',
                    isDark
                      ? 'border-white/30 text-white hover:border-brand-primary hover:text-brand-primary'
                      : 'border-brand-secondary text-brand-secondary hover:border-brand-primary hover:text-brand-primary',
                  )}
                >
                  MIAB {y.year}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

function GridLayout({ people, isDark }: { people: any[]; isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {people.map((person, i) => {
        const isAccent = i % 4 === 1 || i % 4 === 2
        return (
          <div
            key={person.id}
            className={cn(
              'rounded-card p-6 flex gap-5 items-start',
              isDark
                ? isAccent ? 'bg-brand-primary/20' : 'bg-white/10'
                : isAccent ? 'bg-brand-primary/8 border border-brand-primary/20' : 'bg-white border border-brand-border-light shadow-card',
            )}
          >
            {/* Rank */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-extrabold text-sm">
              {person.rank}
            </div>
            {/* Photo */}
            {person.photo && typeof person.photo === 'object' && (
              <div className="shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow">
                <Media resource={person.photo} className="w-full h-full object-cover" />
              </div>
            )}
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn('font-bold text-base', isDark ? 'text-white' : 'text-brand-secondary')}>{person.name}</h3>
                {person.countryFlagEmoji && <span className="text-lg">{person.countryFlagEmoji}</span>}
              </div>
              {person.country && (
                <p className={cn('text-xs font-medium mb-2', isDark ? 'text-white/60' : 'text-brand-text-muted')}>{person.country}</p>
              )}
              {person.bio && (
                <div className={cn('text-sm leading-relaxed line-clamp-3', isDark ? 'text-white/80' : 'text-brand-text-mid')}>
                  <RichText data={person.bio} enableGutter={false} />
                </div>
              )}
              {person.socialLinks && person.socialLinks.length > 0 && (
                <div className="flex gap-3 mt-2">
                  {person.socialLinks.slice(0, 3).map((s: any, j: number) => (
                    <a key={j} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                      {s.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ListLayout({ people, isDark }: { people: any[]; isDark: boolean }) {
  return (
    <div className="space-y-10">
      {people.map((person, i) => {
        const isEven = i % 2 === 1
        return (
          <div
            key={person.id}
            className={cn(
              'flex flex-col md:flex-row gap-8 items-start pb-10 border-b',
              isDark ? 'border-white/10' : 'border-brand-border-light',
              isEven ? 'md:flex-row-reverse' : '',
            )}
          >
            {/* Photo + rank */}
            <div className="shrink-0 relative">
              {person.photo && typeof person.photo === 'object' ? (
                <div className="w-32 h-32 rounded-card overflow-hidden shadow-elevated">
                  <Media resource={person.photo} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-card bg-brand-primary/10 flex items-center justify-center">
                  <span className="text-4xl">{person.countryFlagEmoji || '👤'}</span>
                </div>
              )}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-brand-primary text-white text-xs font-extrabold flex items-center justify-center">
                {person.rank}
              </div>
            </div>
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-brand-secondary')}>{person.name}</h3>
                {person.countryFlagEmoji && <span className="text-2xl">{person.countryFlagEmoji}</span>}
              </div>
              {person.country && (
                <p className={cn('text-sm font-semibold mb-3', isDark ? 'text-brand-primary' : 'text-brand-primary')}>{person.country}</p>
              )}
              {person.bio && (
                <div className={cn('text-sm leading-relaxed', isDark ? 'text-white/80' : 'text-brand-text-mid')}>
                  <RichText data={person.bio} enableGutter={false} />
                </div>
              )}
              {person.socialLinks && person.socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {person.socialLinks.map((s: any, j: number) => (
                    <a key={j} href={s.url} target="_blank" rel="noopener noreferrer"
                      className={cn(
                        'text-xs font-semibold px-3 py-1 rounded-full border transition-colors',
                        isDark
                          ? 'border-white/30 text-white hover:border-brand-primary hover:text-brand-primary'
                          : 'border-brand-secondary/30 text-brand-secondary hover:border-brand-primary hover:text-brand-primary',
                      )}>
                      {s.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
