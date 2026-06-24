import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = {
  content?: any
  rawHtml?: string
  sideImage?: any
  imagePosition?: 'right' | 'left'
  backgroundColor?: 'white' | 'cream' | 'dark'
}

const bgMap: Record<string, string> = {
  white: 'bg-white text-brand-secondary',
  cream: 'bg-brand-cream text-brand-secondary',
  dark: 'bg-brand-secondary text-white',
}

export function RichContentBlockComponent({
  content,
  rawHtml,
  sideImage,
  imagePosition = 'right',
  backgroundColor = 'white',
}: Props) {
  const hasImage = sideImage && typeof sideImage === 'object'

  if (rawHtml) {
    return (
      <section className={cn('py-14', bgMap[backgroundColor] ?? bgMap.white)}>
        <Container>
          <div
            className="wp-content prose prose-lg max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: rawHtml }}
          />
        </Container>
      </section>
    )
  }

  return (
    <section className={cn('py-14', bgMap[backgroundColor] ?? bgMap.white)}>
      <Container>
        {hasImage ? (
          <div
            className={cn(
              'flex flex-col lg:flex-row gap-12 items-start',
              imagePosition === 'left' ? 'lg:flex-row-reverse' : '',
            )}
          >
            <div className="flex-1 min-w-0">
              <RichText data={content} enableGutter={false} />
            </div>
            <div className="lg:w-[40%] shrink-0">
              <div className="relative rounded-card overflow-hidden shadow-elevated aspect-[4/3]">
                <Media resource={sideImage} fill className="object-cover" />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <RichText data={content} enableGutter={false} />
          </div>
        )}
      </Container>
    </section>
  )
}
