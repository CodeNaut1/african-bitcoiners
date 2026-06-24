import Link from 'next/link'
import React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Media } from '@/components/Media'

type Product = {
  name: string
  tagline?: string
  description?: string
  mockupImage?: any
  badge?: string
  primaryButtonLabel?: string
  primaryButtonUrl?: string
  secondaryButtonLabel?: string
  secondaryButtonUrl?: string
  features?: Array<{ feature: string }>
}

type Props = {
  eyebrow?: string
  heading?: string
  subheading?: string
  products: Product[]
}

export function ProductsGridBlockComponent({ eyebrow, heading, subheading, products }: Props) {
  return (
    <section className="py-16 bg-white">
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading || ''}
            subheading={subheading}
            align="center"
            className="mb-12"
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="rounded-card border border-brand-border-light shadow-card hover:shadow-elevated transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              {/* Mockup image */}
              {product.mockupImage && typeof product.mockupImage === 'object' && (
                <div className="relative h-52 bg-brand-cream overflow-hidden">
                  <Media resource={product.mockupImage} fill className="object-cover" />
                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  {product.badge && !product.mockupImage && (
                    <span className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {product.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-brand-secondary mb-1">{product.name}</h3>
                  {product.tagline && (
                    <p className="text-sm font-medium text-brand-primary mb-2">{product.tagline}</p>
                  )}
                  {product.description && (
                    <p className="text-sm text-brand-text-mid leading-relaxed">{product.description}</p>
                  )}
                </div>

                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2 mb-6 flex-1">
                    {product.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-brand-text-mid">
                        <Check size={15} className="text-brand-primary mt-0.5 shrink-0" />
                        <span>{f.feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {(product.primaryButtonLabel || product.secondaryButtonLabel) && (
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {product.primaryButtonLabel && product.primaryButtonUrl && (
                      <ABButton asChild variant="primary" size="sm">
                        <Link href={product.primaryButtonUrl}>{product.primaryButtonLabel}</Link>
                      </ABButton>
                    )}
                    {product.secondaryButtonLabel && product.secondaryButtonUrl && (
                      <ABButton asChild variant="secondary" size="sm">
                        <Link href={product.secondaryButtonUrl}>{product.secondaryButtonLabel}</Link>
                      </ABButton>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
