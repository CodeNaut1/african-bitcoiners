'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Check, X } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

type Feature = { feature: string; included: boolean }
type Tier = {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  description?: string
  features?: Feature[]
  buttonText?: string
  buttonLink?: string
  isHighlighted?: boolean
  badge?: string
}

type Props = {
  eyebrow?: string
  heading?: string
  subheading?: string
  currency?: 'sats' | 'usd' | 'eur'
  tiers: Tier[]
}

const CURRENCY_SYMBOLS: Record<string, string> = { sats: '₿ ', usd: '$', eur: '€' }
const CURRENCY_SUFFIX: Record<string, string> = { sats: ' sats', usd: '', eur: '' }

function formatPrice(amount: number, currency: string, isYearly: boolean): string {
  const sym = CURRENCY_SYMBOLS[currency] ?? ''
  const suf = CURRENCY_SUFFIX[currency] ?? ''
  const val = isYearly ? Math.round(amount * 0.8) : amount
  if (val === 0) return 'Free'
  return `${sym}${val.toLocaleString()}${suf}`
}

export function PricingTiersBlockComponent({ eyebrow, heading, subheading, currency = 'sats', tiers }: Props) {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-16 bg-brand-cream">
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading || ''}
            subheading={subheading}
            align="center"
            className="mb-8"
          />
        )}

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={cn('text-sm font-semibold', !isYearly ? 'text-brand-secondary' : 'text-brand-text-muted')}>Monthly</span>
          <button
            onClick={() => setIsYearly((v) => !v)}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors duration-200',
              isYearly ? 'bg-brand-primary' : 'bg-brand-border-light',
            )}
            aria-label="Toggle yearly billing"
          >
            <span
              className={cn(
                'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
                isYearly ? 'translate-x-6' : 'translate-x-0',
              )}
            />
          </button>
          <span className={cn('text-sm font-semibold', isYearly ? 'text-brand-secondary' : 'text-brand-text-muted')}>
            Yearly <span className="text-brand-primary text-xs ml-1">Save 20%</span>
          </span>
        </div>

        {/* Tier cards */}
        <div className={cn('grid gap-6', tiers.length === 3 ? 'md:grid-cols-3' : tiers.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'max-w-sm mx-auto')}>
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={cn(
                'relative rounded-card flex flex-col p-8',
                tier.isHighlighted
                  ? 'bg-brand-secondary text-white shadow-elevated scale-105'
                  : 'bg-white border border-brand-border-light shadow-card',
              )}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {tier.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className={cn('text-lg font-bold mb-1', tier.isHighlighted ? 'text-white' : 'text-brand-secondary')}>
                  {tier.name}
                </h3>
                {tier.description && (
                  <p className={cn('text-sm', tier.isHighlighted ? 'text-white/75' : 'text-brand-text-muted')}>
                    {tier.description}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <p className={cn('text-4xl font-extrabold', tier.isHighlighted ? 'text-brand-primary' : 'text-brand-secondary')}>
                  {formatPrice(tier.monthlyPrice, currency, isYearly)}
                </p>
                <p className={cn('text-sm mt-1', tier.isHighlighted ? 'text-white/60' : 'text-brand-text-muted')}>
                  per {isYearly ? 'year' : 'month'}
                </p>
              </div>

              {tier.features && tier.features.length > 0 && (
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      {f.included ? (
                        <Check size={16} className="text-brand-primary shrink-0" />
                      ) : (
                        <X size={16} className={cn('shrink-0', tier.isHighlighted ? 'text-white/40' : 'text-brand-border-light')} />
                      )}
                      <span className={cn(f.included ? '' : 'opacity-50', tier.isHighlighted ? 'text-white/90' : 'text-brand-text-mid')}>
                        {f.feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tier.buttonText && tier.buttonLink && (
                <ABButton asChild variant={tier.isHighlighted ? 'orange' : 'secondary'} size="md" className="mt-auto w-full">
                  <Link href={tier.buttonLink}>{tier.buttonText}</Link>
                </ABButton>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
