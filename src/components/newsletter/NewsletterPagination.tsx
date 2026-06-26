'use client'

import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

const LINK_BLUE = '#046bd2'
const LINK_BLUE_HOVER = '#045cb4'

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
        active ? 'rounded-sm bg-[#046bd2] text-white' : 'text-[#046bd2] hover:text-[#045cb4]',
      )}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </button>
  )
}

function Ellipsis() {
  return <span className="px-1 text-[#046bd2]">&hellip;</span>
}

export function NewsletterPagination({ page, totalPages, className }: Props) {
  const router = useRouter()

  function go(p: number) {
    if (p === 1) router.push('/bitcoin-newsletter')
    else router.push(`/bitcoin-newsletter/page/${p}`)
  }

  const pages: (number | 'ellipsis')[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else if (page <= 3) {
    pages.push(1, 2, 'ellipsis', totalPages)
  } else if (page >= totalPages - 2) {
    pages.push(1, 'ellipsis', totalPages - 1, totalPages)
  } else {
    pages.push(1, 'ellipsis', page, 'ellipsis', totalPages)
  }

  return (
    <nav aria-label="Post pagination" className={cn('w-full pt-8 text-center', className)}>
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

        {page < totalPages && (
          <button
            type="button"
            onClick={() => go(page + 1)}
            className="ml-2 inline-flex items-center gap-1 font-sans text-base font-medium transition-colors"
            style={{ color: LINK_BLUE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = LINK_BLUE_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = LINK_BLUE
            }}
          >
            Next <span aria-hidden>&rarr;</span>
          </button>
        )}
      </div>
    </nav>
  )
}
