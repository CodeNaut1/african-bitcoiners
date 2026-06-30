import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'

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
  isHome?: boolean
}

export function ProductsGridBlockComponent({ eyebrow, heading, subheading, products, isHome }: Props) {
  return (
    <section className={cn('py-16 md:py-20', isHome ? 'bg-[#FFFBF5]' : 'bg-white')}>
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading || ''}
            subheading={subheading}
            align="center"
            className="mb-10 md:mb-14"
            isHome={isHome}
          />
        )}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {products.map((product, i) => (
            <div
              key={i}
              className={cn(
                'overflow-hidden transition-shadow duration-200',
                isHome
                  ? 'flex flex-col rounded-[16px] border border-[#0000001A] bg-[#FFFAF0]'
                  : 'flex flex-col rounded-card border border-brand-border-light shadow-card hover:shadow-elevated',
              )}
            >
              {isHome ? (
                <>
                  <div className="p-6 md:p-8">
                    <h3 className="mb-3 font-[family-name:var(--font-instrument-serif)] text-3xl font-normal text-[#4D4D4D] md:text-5xl">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mb-6 text-md leading-relaxed text-[#4D4D4D] md:text-md">
                        {product.description}
                      </p>
                    )}
                    {product.primaryButtonLabel && product.primaryButtonUrl && (
                      <Link
                        href={product.primaryButtonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#AEAEAE] bg-transparent px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#777777] transition-colors hover:bg-[#4D4D4D] hover:text-white"
                      >
                        {product.primaryButtonLabel}
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                  {product.mockupImage && typeof product.mockupImage === 'object' && (
                    <div className="relative mt-auto aspect-[7/5] w-full">
                      <Media resource={product.mockupImage} fill className="object-cover" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {product.mockupImage && typeof product.mockupImage === 'object' && (
                    <div className="relative h-52 overflow-hidden bg-brand-cream">
                      <Media resource={product.mockupImage} fill className="object-cover" />
                      {product.badge && (
                        <span className="absolute right-3 top-3 rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                      {product.badge && !product.mockupImage && (
                        <span className="mb-3 inline-block rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white">
                          {product.badge}
                        </span>
                      )}
                      <h3 className="mb-1 text-xl font-bold text-brand-secondary">{product.name}</h3>
                      {product.tagline && (
                        <p className="mb-2 text-sm font-medium text-brand-primary">{product.tagline}</p>
                      )}
                      {product.description && (
                        <p className="text-sm leading-relaxed text-brand-text-mid">{product.description}</p>
                      )}
                    </div>

                    {(product.primaryButtonLabel || product.secondaryButtonLabel) && (
                      <div className="mt-auto flex flex-wrap gap-3">
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
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
