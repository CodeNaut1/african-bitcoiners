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
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        // Full-bleed dark bar that matches the site's dark navy, regardless of
        // the (often max-width constrained) container it is rendered inside.
        'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen',
        'bg-[#253343] border-b border-white/10',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
          <li>
            <Link href="/" className="transition-colors hover:text-brand-primary">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="select-none text-white/40">
                &gt;
              </li>
              <li>
                {item.href && index < items.length - 1 ? (
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-brand-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-brand-primary">{item.label}</span>
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
