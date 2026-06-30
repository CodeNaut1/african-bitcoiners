import { cn } from '@/utilities/ui'
import Link from 'next/link'
import * as React from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  variant?: 'dark' | 'light'
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, variant = 'light' }) => {
  const isLight = variant === 'light'

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        // Full-bleed bar below the header, regardless of parent container width.
        'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen',
        isLight ? 'border-b border-black/5 bg-white' : 'border-b border-white/10 bg-[#253343]',
        className,
      )}
    >
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', isLight ? 'py-4' : 'py-3')}>
        <ol
          className={cn(
            'flex flex-wrap items-center gap-1 text-sm',
            isLight ? 'text-brand-text-muted' : 'text-white/70',
          )}
        >
          <li>
            <Link
              href="/"
              className={cn(
                'transition-colors hover:text-brand-primary',
                isLight ? 'text-brand-text-muted' : undefined,
              )}
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li aria-hidden="true" className={cn('select-none', isLight ? 'text-brand-border-mid' : 'text-white/40')}>
                &gt;
              </li>
              <li>
                {item.href && index < items.length - 1 ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'transition-colors hover:text-brand-primary',
                      isLight ? 'text-brand-text-muted' : 'text-white/70',
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={cn('font-medium', isLight ? 'text-brand-text-dark' : 'text-brand-primary')}>
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export { Breadcrumbs }
