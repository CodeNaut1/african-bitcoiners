import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RawHtmlRenderer } from './RawHtmlRenderer'

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
      <section className="bg-white py-12 px-4">
        <RawHtmlRenderer
          rawHtml={rawHtml}
          className={cn(
            'wp-content mx-auto max-w-4xl',
            'prose prose-base md:prose-lg max-w-none',
            'prose-headings:font-heading prose-headings:text-brand-secondary prose-headings:font-bold',
            'prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-6 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-5 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-4',
            'prose-p:text-brand-text-dark prose-p:leading-relaxed prose-p:mb-4',
            'prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline',
            'prose-img:rounded-lg prose-img:mx-auto prose-img:max-w-full prose-img:h-auto',
            'prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6',
            'prose-li:mb-2 prose-li:text-brand-text-dark',
            'prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:pl-4 prose-blockquote:italic',
            'prose-table:w-full prose-th:bg-brand-secondary prose-th:text-white prose-th:p-3 prose-td:p-3 prose-td:border',
            'prose-strong:text-brand-secondary prose-strong:font-bold',
            'prose-hr:border-gray-200 prose-hr:my-8',
          )}
        />
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
