'use client'

import React from 'react'

export function Avatar({ name, size = 44, hue = 50 }: { name: string; size?: number; hue?: number }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((s) => s[0])
    .join('')

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 30% 30%, hsl(${hue + 10}, 60%, 80%), hsl(${hue}, 70%, 45%))`,
        color: 'white',
        fontSize: size * 0.38,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        border: '2px solid white',
        boxShadow: '0 6px 16px -8px rgba(26, 26, 26, 0.35)',
      }}
    >
      {initials}
    </div>
  )
}
