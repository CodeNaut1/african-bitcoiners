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
    <nav aria-label="Breadcrumb" className={cn('py-3', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-text-muted">
        <li>
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li aria-hidden="true" className="select-none">
              &gt;
            </li>
            <li>
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="hover:text-brand-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-brand-primary font-medium">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

export { Breadcrumbs }
