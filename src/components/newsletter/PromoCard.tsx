import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  title: string
  image: string
  imageWidth: number
  imageHeight: number
  alt: string
  href?: string
}

export function PromoCard({ title, image, imageWidth, imageHeight, alt, href }: Props) {
  const imageEl = (
    <Image
      src={image}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className="h-auto w-full max-w-full"
      sizes="(max-width: 1024px) 80vw, 300px"
    />
  )

  return (
    <div className="bg-white p-8">
      <h2 className="mb-4 font-heading text-[1.7rem] font-bold leading-tight text-black">{title}</h2>
      {href ? (
        <Link href={href} className="block transition-opacity hover:opacity-90">
          {imageEl}
        </Link>
      ) : (
        imageEl
      )}
    </div>
  )
}
