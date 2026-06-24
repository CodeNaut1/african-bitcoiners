import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export interface ABCardProps {
  image?: string
  imageAlt?: string
  title: string
  description?: string
  href: string
  linkText?: string
  className?: string
}

const ABCard: React.FC<ABCardProps> = ({
  image,
  imageAlt = '',
  title,
  description,
  href,
  linkText = 'Visit page →',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-card shadow-card border border-brand-border-light bg-white overflow-hidden transition-shadow hover:shadow-elevated',
        className,
      )}
    >
      {image && (
        <div className="relative h-48 w-full shrink-0">
          <Image src={image} alt={imageAlt} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-brand-secondary font-bold text-lg leading-snug">{title}</h3>
        {description && (
          <p className="text-brand-text-mid text-sm leading-relaxed flex-1">{description}</p>
        )}
        <Link
          href={href}
          className="text-brand-primary font-semibold text-sm hover:text-brand-secondary transition-colors mt-auto"
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
}

export { ABCard }
