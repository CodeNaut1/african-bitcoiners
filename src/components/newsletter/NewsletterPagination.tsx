'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  page: number
  totalPages: number
  className?: string
}

export function NewsletterPagination({ page, totalPages, className }: Props) {
  const router = useRouter()

  const hasPrev = page > 1
  const hasNext = page < totalPages
  const hasExtraPrev = page - 1 > 1
  const hasExtraNext = page + 1 < totalPages

  function go(p: number) {
    if (p === 1) router.push('/bitcoin-newsletter')
    else router.push(`/bitcoin-newsletter/page/${p}`)
  }

  return (
    <div className={cn('my-10', className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrev}
              onClick={() => go(page - 1)}
              className="text-brand-secondary hover:bg-brand-primary/10 hover:text-brand-primary"
            />
          </PaginationItem>

          {hasExtraPrev && (
            <PaginationItem><PaginationEllipsis className="text-brand-secondary" /></PaginationItem>
          )}

          {hasPrev && (
            <PaginationItem>
              <PaginationLink
                onClick={() => go(page - 1)}
                className="text-brand-secondary hover:bg-brand-primary/10 hover:text-brand-primary"
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => go(page)}
              className="bg-brand-primary border-brand-primary text-white hover:bg-brand-primary/90 hover:text-white"
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNext && (
            <PaginationItem>
              <PaginationLink
                onClick={() => go(page + 1)}
                className="text-brand-secondary hover:bg-brand-primary/10 hover:text-brand-primary"
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNext && (
            <PaginationItem><PaginationEllipsis className="text-brand-secondary" /></PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNext}
              onClick={() => go(page + 1)}
              className="text-brand-secondary hover:bg-brand-primary/10 hover:text-brand-primary"
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
