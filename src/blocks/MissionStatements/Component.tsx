import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Statement = {
  eyebrow?: string
  heading: any
  backgroundImage?: any
  textColor?: 'dark' | 'white' | 'orange'
}

type Props = {
  statements: Statement[]
  spacing?: 'large' | 'medium' | 'compact'
}

const spacingMap: Record<string, string> = {
  large: 'py-20',
  medium: 'py-14',
  compact: 'py-10',
}

const textColorMap: Record<string, { eyebrow: string; heading: string }> = {
  dark: { eyebrow: 'text-brand-primary', heading: 'text-brand-secondary' },
  white: { eyebrow: 'text-brand-accent', heading: 'text-white' },
  orange: { eyebrow: 'text-white/70', heading: 'text-brand-primary' },
}

export function MissionStatementsBlockComponent({ statements, spacing = 'large' }: Props) {
  return (
    <div>
      {statements.map((stmt, i) => {
        const hasImage = stmt.backgroundImage && typeof stmt.backgroundImage === 'object'
        const colors = textColorMap[stmt.textColor ?? 'dark'] ?? textColorMap.dark
        const py = spacingMap[spacing] ?? spacingMap.large

        return (
          <div key={i} className={cn('relative overflow-hidden', hasImage ? '' : i % 2 === 0 ? 'bg-white' : 'bg-brand-cream')}>
            {hasImage && (
              <div className="absolute inset-0 z-0">
                <Media resource={stmt.backgroundImage} fill className="object-cover" />
                <div className="absolute inset-0 bg-brand-secondary/70" />
              </div>
            )}
            <div className={cn('relative z-10', py)}>
              <Container>
                <div className="max-w-4xl">
                  {stmt.eyebrow && (
                    <p className={cn('text-xs font-bold uppercase tracking-widest mb-4', colors.eyebrow)}>
                      {stmt.eyebrow}
                    </p>
                  )}
                  <div className={cn('text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight', colors.heading)}>
                    <RichText data={stmt.heading} enableGutter={false} />
                  </div>
                </div>
              </Container>
            </div>
          </div>
        )
      })}
    </div>
  )
}
