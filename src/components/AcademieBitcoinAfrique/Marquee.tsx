import React from 'react'

export function Marquee() {
  const items = [
    'Bitcoin‑only',
    '◆',
    'Français',
    '◆',
    '6 sessions live',
    '◆',
    'Pas de trading',
    '◆',
    'Jitsi',
    '◆',
    'Intervenants africains',
    '◆',
    'Lightning',
    '◆',
    'Auto‑souveraineté',
    '◆',
  ]
  const doubled = [...items, ...items, ...items, ...items]

  return (
    <div
      style={{
        padding: '32px 0',
        background: 'var(--ink)',
        color: 'var(--cream)',
        borderTop: '1px solid #333',
        borderBottom: '1px solid #333',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        className="marquee-track serif"
        style={{
          display: 'inline-flex',
          gap: 44,
          fontSize: 'clamp(28px, 5vw, 44px)',
          letterSpacing: '-0.01em',
        }}
      >
        {doubled.map((it, i) => (
          <span
            key={i}
            style={{
              color: it === '◆' ? 'var(--orange)' : 'inherit',
              fontStyle: it === '◆' ? 'normal' : 'italic',
            }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}
