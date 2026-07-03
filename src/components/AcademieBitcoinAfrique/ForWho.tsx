'use client'

import React from 'react'
import { FOR_EXCLUDE, FOR_INCLUDE } from './data'
import { Blob } from './shapes'

export function ForWho() {
  return (
    <section
      id="pour-qui"
      className="sec-pad"
      style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}
    >
      <Blob
        color="#f5dcc4"
        size={360}
        style={{
          position: 'absolute',
          right: -120,
          bottom: -80,
          animation: 'academie-float3 16s ease-in-out infinite',
          opacity: 0.6,
        }}
        className="academie-hide-lg"
      />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
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
            ◐ Pour qui ?
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(44px, 6vw, 76px)',
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            Fait pour toi <em style={{ color: 'var(--orange-deep)' }}>si…</em>
          </h2>
        </div>

        <div
          className="academie-grid-for-who"
          style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24 }}
        >
          <div
            className="reveal d1"
            style={{
              padding: 40,
              borderRadius: 28,
              background: 'var(--white)',
              border: '1px solid var(--line)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#e8f5e9',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#2e7d32',
                  fontSize: 18,
                }}
              >
                ✓
              </div>
              <div className="serif" style={{ fontSize: 28 }}>
                Parfait pour
              </div>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              {FOR_INCLUDE.map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.5 }}>
                  <span
                    className="mono"
                    style={{
                      color: 'var(--orange-deep)',
                      fontSize: 12,
                      paddingTop: 5,
                      minWidth: 20,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal d2"
            style={{
              padding: 40,
              borderRadius: 28,
              background: 'linear-gradient(135deg, #faf6f0, #f0e4d4)',
              border: '1px solid var(--line)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#fce4e4',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#c62828',
                  fontSize: 18,
                }}
              >
                ✕
              </div>
              <div className="serif" style={{ fontSize: 28 }}>
                Pas pour
              </div>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              {FOR_EXCLUDE.map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.5 }}>
                  <span
                    className="mono"
                    style={{
                      color: 'var(--orange-deep)',
                      fontSize: 12,
                      paddingTop: 5,
                      minWidth: 20,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: '1px dashed rgba(224, 138, 60, 0.5)',
                fontSize: 13,
                color: 'var(--ink-soft)',
                fontStyle: 'italic',
              }}
            >
              « On enseigne Bitcoin, pas la spéculation. »
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
