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
            headingClassName={isHome ? 'font-heading text-2xl font-normal md:text-3xl lg:text-4xl' : undefined}
          />
        )}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {products.map((product, i) => (
            <div
              key={i}
              className={cn(
                'overflow-hidden transition-shadow duration-200',
                isHome
                  ? 'rounded-[18px] border border-black/10 bg-[#FFFAF0] shadow-card hover:shadow-elevated'
                  : 'flex flex-col rounded-card border border-brand-border-light shadow-card hover:shadow-elevated',
              )}
            >
              {isHome ? (
                <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
                  <div className="flex flex-1 flex-col">
                    <h3 className="mb-2 font-heading text-xl font-normal text-brand-secondary md:text-2xl">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-brand-text-mid">
                        {product.description}
                      </p>
                    )}
                    {product.primaryButtonLabel && product.primaryButtonUrl && (
                      <Link
                        href={product.primaryButtonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-brand-secondary transition-colors hover:text-brand-primary"
                      >
                        {product.primaryButtonLabel}
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                  {product.mockupImage && typeof product.mockupImage === 'object' && (
                    <div className="relative mx-auto h-44 w-full shrink-0 overflow-hidden md:mx-0 md:h-52 md:w-[45%]">
                      <Media resource={product.mockupImage} fill className="object-contain object-right" />
                    </div>
                  )}
                </div>
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
