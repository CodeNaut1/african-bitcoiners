import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  description: string
  href: string
  imageSrc?: string
  imageAlt?: string
  bgColor?: string
}

export function PromoCard({ title, description, href, imageSrc, imageAlt, bgColor = '#253343' }: Props) {
  return (
    <Link href={href} className="block rounded-card overflow-hidden group border border-brand-border-light hover:shadow-card transition-shadow">
      {imageSrc ? (
        <div className="relative h-28 w-full">
          <Image src={imageSrc} alt={imageAlt ?? title} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-16 w-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <span className="text-white font-bold text-sm tracking-wide">{title}</span>
        </div>
      )}
      <div className="p-3">
        {imageSrc && <p className="font-semibold text-sm text-brand-secondary group-hover:text-brand-primary transition-colors mb-1">{title}</p>}
        <p className="text-xs text-brand-text-muted leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}
