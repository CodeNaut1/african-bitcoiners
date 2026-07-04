import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { isInflationSimulatorPage } from '@/components/InflationSimulator/page-detect'
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

  const appendSimulatorIfMissing = Boolean(
    rawHtml &&
      /African Currency vs Bitcoin|bitcoin.inflation.simulator|Calculate your wealth loss/i.test(
        rawHtml,
      ) &&
      !/\[bitcoin_simulator\]|SIMULATOR_PLACEHOLDER/i.test(rawHtml),
  )

  const isInflationSimulator = isInflationSimulatorPage(rawHtml)

  if (rawHtml) {
    return (
      <section
        className={cn(
          'py-10 px-4 md:py-14',
          isInflationSimulator ? 'bg-[#FFF9F0]' : 'bg-white',
        )}
      >
        <RawHtmlRenderer
          rawHtml={rawHtml}
          appendSimulatorIfMissing={appendSimulatorIfMissing}
          className={cn(
            isInflationSimulator ? 'mx-auto max-w-5xl' : 'wp-content mx-auto max-w-4xl',
            !isInflationSimulator && [
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
            ],
          )}
        />
      </section>
    )
  }

  const proseClassName = cn(
    'max-w-none',
    backgroundColor === 'dark'
      ? 'prose-invert prose-a:text-brand-accent'
      : 'prose-headings:text-brand-secondary prose-strong:text-brand-secondary prose-a:text-brand-primary',
    'prose-headings:font-heading prose-a:font-semibold prose-a:no-underline hover:prose-a:underline',
  )

  return (
    <section className={cn('py-16 md:py-20', bgMap[backgroundColor] ?? bgMap.white)}>
      <Container>
        {hasImage ? (
          <div
            className={cn(
              'flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16',
              imagePosition === 'left' ? 'lg:flex-row-reverse' : '',
            )}
          >
            <div className="min-w-0 flex-1">
              <RichText data={content} enableGutter={false} className={proseClassName} />
            </div>
            <div className="w-full shrink-0 lg:w-[42%]">
              <Media
                resource={sideImage}
                imgClassName="w-full h-auto rounded-card shadow-elevated"
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <RichText data={content} enableGutter={false} className={proseClassName} />
          </div>
        )}
      </Container>
    </section>
  )
}
