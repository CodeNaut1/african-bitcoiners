'use client'

import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  page: number
  totalPages: number
  className?: string
}

function PageButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={active}
      className={cn(
        'inline-flex h-[2.35em] min-w-[2.35em] items-center justify-center px-2 font-sans text-base font-medium transition-colors',
        active
          ? 'rounded-sm bg-[#046bd2] text-white'
          : 'text-[#046bd2] underline underline-offset-2 hover:text-[#045cb4]',
      )}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </button>
  )
}

function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 font-sans text-base font-medium text-[#046bd2] underline underline-offset-2 transition-colors hover:text-[#045cb4]"
    >
      {children}
    </button>
  )
}

function Ellipsis() {
  return <span className="px-1 text-[#334155]">&hellip;</span>
}

function buildPageItems(page: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (page <= 2) {
    return [1, 2, 'ellipsis', totalPages]
  }

  if (page >= totalPages - 1) {
    return [1, 'ellipsis', totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages]
}

export function NewsletterPagination({ page, totalPages, className }: Props) {
  const router = useRouter()

  function go(p: number) {
    if (p === 1) router.push('/bitcoin-newsletter')
    else router.push(`/bitcoin-newsletter/page/${p}`)
  }

  const pages = buildPageItems(page, totalPages)

  return (
    <nav aria-label="Post pagination" className={cn('w-full pt-8', className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-[7rem] text-left">
          {page > 1 ? (
            <NavLink onClick={() => go(page - 1)}>
              <span aria-hidden>&larr;</span> Previous
            </NavLink>
          ) : (
            <span className="invisible inline-flex items-center gap-1 font-sans text-base" aria-hidden>
              &larr; Previous
            </span>
          )}
        </div>

        <div className="inline-flex flex-wrap items-center justify-center gap-1">
          {pages.map((p, i) =>
            p === 'ellipsis' ? (
              <Ellipsis key={`e-${i}`} />
            ) : (
              <PageButton key={p} active={p === page} onClick={() => go(p)}>
                {p}
              </PageButton>
            ),
          )}
        </div>

        <div className="min-w-[7rem] text-right">
          {page < totalPages ? (
            <NavLink onClick={() => go(page + 1)}>
              Next <span aria-hidden>&rarr;</span>
            </NavLink>
          ) : (
            <span className="invisible inline-flex items-center gap-1 font-sans text-base" aria-hidden>
              Next &rarr;
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}
