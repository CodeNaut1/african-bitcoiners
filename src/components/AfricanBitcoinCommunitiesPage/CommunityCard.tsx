import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { CommunityEntry } from '@/components/AfricanBitcoinCommunitiesPage/data'

const HEADING = '#37312C'
const BODY = '#37312C'
const CTA_ORANGE = '#F45341'

export function CommunityCard({ community }: { community: CommunityEntry }) {
  const imageFit = community.imageFit ?? 'cover'

  return (
    <article className="flex h-full flex-col rounded-sm bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-white">
          <Image
            src={community.image}
            alt=""
            fill
            sizes="80px"
            className={imageFit === 'contain' ? 'object-contain p-1' : 'object-cover'}
          />
        </div>
        <h3
          className="pt-1 text-[22px] font-bold leading-snug tracking-[-0.4px]"
          style={{ color: HEADING }}
        >
          {community.name}
        </h3>
      </div>
      <p className="mt-3 flex-1 text-base font-normal leading-relaxed tracking-[-0.2px]" style={{ color: BODY }}>
        {community.description}
      </p>
      <div className="mt-4">
        <Link
          href={community.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-80"
          style={{ color: CTA_ORANGE }}
        >
          Visit website
        </Link>
      </div>
    </article>
  )
}
