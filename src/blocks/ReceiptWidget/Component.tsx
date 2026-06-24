import React from 'react'

import { Container } from '@/components/ui/container'

type Metric = { label: string; value: string }

type Props = {
  title?: string
  metrics: Metric[]
  totalLabel?: string
  totalValue?: string
  footerText?: string
}

export function ReceiptWidgetBlockComponent({
  title = 'Proof of Work',
  metrics,
  totalLabel = 'TOTAL IMPACT',
  totalValue = '∞ Sats',
  footerText = 'Thank you for being part of the movement.',
}: Props) {
  return (
    <section className="py-16 bg-brand-cream">
      <Container narrow>
        <div className="mx-auto max-w-sm">
          {/* Receipt paper */}
          <div
            className="bg-white font-mono text-brand-secondary shadow-elevated"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), 96% 100%, 92% calc(100% - 8px), 88% 100%, 84% calc(100% - 8px), 80% 100%, 76% calc(100% - 8px), 72% 100%, 68% calc(100% - 8px), 64% 100%, 60% calc(100% - 8px), 56% 100%, 52% calc(100% - 8px), 48% 100%, 44% calc(100% - 8px), 40% 100%, 36% calc(100% - 8px), 32% 100%, 28% calc(100% - 8px), 24% 100%, 20% calc(100% - 8px), 16% 100%, 12% calc(100% - 8px), 8% 100%, 4% calc(100% - 8px), 0 100%)' }}
          >
            {/* Header */}
            <div className="px-6 pt-8 pb-4 border-b border-dashed border-brand-border-light text-center">
              <p className="text-xs tracking-widest uppercase text-brand-text-muted mb-1">African Bitcoiners</p>
              <h2 className="text-xl font-bold tracking-wide">{title}</h2>
              <p className="text-xs text-brand-text-muted mt-1">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            {/* Metrics */}
            <div className="px-6 py-4">
              {metrics.map((m, i) => (
                <div key={i} className="flex justify-between items-baseline py-2 border-b border-dotted border-brand-border-light last:border-0">
                  <span className="text-xs uppercase tracking-wide text-brand-text-muted">{m.label}</span>
                  <span className="text-sm font-bold">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mx-6 border-t-2 border-brand-secondary px-0 py-4 flex justify-between items-baseline">
              <span className="text-xs font-bold uppercase tracking-widest">{totalLabel}</span>
              <span className="text-lg font-extrabold text-brand-primary">{totalValue}</span>
            </div>

            {/* Barcode */}
            <div className="px-6 pb-6 pt-2 text-center">
              <svg viewBox="0 0 200 40" className="w-full h-10 mb-2" aria-hidden>
                {Array.from({ length: 60 }).map((_, i) => (
                  <rect
                    key={i}
                    x={i * 3.3}
                    y={0}
                    width={i % 5 === 0 ? 2 : 1}
                    height={i % 3 === 0 ? 40 : 30}
                    fill="#253343"
                    opacity={0.8}
                  />
                ))}
              </svg>
              <p className="text-[10px] tracking-widest text-brand-text-muted">BITCOINERS.AFRICA</p>
            </div>

            {/* Footer */}
            {footerText && (
              <div className="px-6 pb-8 text-center border-t border-dashed border-brand-border-light pt-4">
                <p className="text-xs text-brand-text-muted italic">{footerText}</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
