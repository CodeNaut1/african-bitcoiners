'use client'

import React from 'react'
import { LEARN } from './data'
import { Ring } from './shapes'

export function Learn() {
  return (
    <section
      id="apprendre"
      className="sec-pad"
      style={{ background: 'var(--white)', position: 'relative' }}
    >
      <Ring
        size={200}
        color="var(--orange-deep)"
        style={{ position: 'absolute', right: 60, top: 60, opacity: 0.2 }}
        className="academie-hide-lg"
      />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          className="reveal academie-grid-learn-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            marginBottom: 56,
            alignItems: 'end',
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                fontSize: 12,
                color: 'var(--orange-deep)',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              ◐ Ce que tu vas apprendre
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(44px, 6vw, 76px)',
                lineHeight: 0.95,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Des <em style={{ color: 'var(--orange-deep)' }}>fondations</em>
              <br />
              aux <em style={{ color: 'var(--orange-deep)' }}>gestes concrets.</em>
            </h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>
            On avance pas à pas, en commençant par comprendre la monnaie avant la technique. Puis tu
            passes à la pratique encadrée, sans raccourci ni promesse irréaliste.
          </p>
        </div>

        <div
          className="academie-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          {LEARN.map((l, i) => (
            <div
              key={i}
              className={`reveal d${i % 4}`}
              style={{
                padding: 32,
                background: 'var(--white)',
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background .3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--cream)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--white)'
              }}
            >
              <div
                className="mono"
                style={{ fontSize: 12, color: 'var(--orange-deep)', letterSpacing: '.12em' }}
              >
                {l.n}
              </div>
              <div>
                <h3
                  className="serif"
                  style={{
                    fontSize: 30,
                    lineHeight: 1.05,
                    margin: '12px 0 10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {l.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0 }}>
                  {l.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
