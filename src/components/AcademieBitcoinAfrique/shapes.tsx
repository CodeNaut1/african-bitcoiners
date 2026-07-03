import React from 'react'

export function Blob({
  color = 'var(--orange-soft)',
  size = 260,
  style = {},
  className = '',
}: {
  color?: string
  size?: number
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={style}
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M44.8,-61.3C58.4,-52.4,69.9,-39.7,74.7,-24.9C79.5,-10.1,77.5,6.9,71.2,21.6C64.9,36.4,54.3,48.9,41.2,57.6C28.2,66.3,12.6,71.3,-3.6,76.2C-19.8,81,-39.7,85.7,-52,78.1C-64.3,70.5,-69.2,50.6,-72.8,32.3C-76.4,14,-78.8,-2.7,-74.2,-17.3C-69.6,-31.9,-58.1,-44.3,-44.5,-53.7C-30.8,-63,-15.4,-69.3,-0.4,-68.7C14.6,-68.1,31.2,-70.2,44.8,-61.3Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

export function Ring({
  size = 120,
  color = 'var(--orange)',
  stroke = 1,
  style = {},
  className = '',
}: {
  size?: number
  color?: string
  stroke?: number
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={style}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="49" fill="none" stroke={color} strokeWidth={stroke} />
    </svg>
  )
}

export function Dots({
  cols = 8,
  rows = 8,
  gap = 14,
  color = 'var(--orange)',
  style = {},
  className = '',
}: {
  cols?: number
  rows?: number
  gap?: number
  color?: string
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <svg
      className={className}
      width={cols * gap}
      height={rows * gap}
      style={style}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * gap + gap / 2}
            cy={r * gap + gap / 2}
            r="1.4"
            fill={color}
            opacity="0.55"
          />
        )),
      )}
    </svg>
  )
}

export function Arc({
  size = 180,
  color = 'var(--orange)',
  style = {},
}: {
  size?: number
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style} aria-hidden="true">
      <path d="M 10,50 A 40 40 0 0 1 90,50" stroke={color} strokeWidth="1" fill="none" />
      <path d="M 14,50 A 36 36 0 0 1 86,50" stroke={color} strokeWidth="1" fill="none" opacity=".5" />
      <path d="M 18,50 A 32 32 0 0 1 82,50" stroke={color} strokeWidth="1" fill="none" opacity=".25" />
    </svg>
  )
}

export function OrangeMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      <defs>
        <linearGradient id="om-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0a855" />
          <stop offset="1" stopColor="#c97428" />
        </linearGradient>
      </defs>
      <circle cx="22" cy="22" r="21" fill="url(#om-g)" />
      <text
        x="22"
        y="22"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Inter', 'Helvetica', sans-serif"
        fontWeight="800"
        fontSize="26"
        fill="white"
      >
        ₿
      </text>
    </svg>
  )
}
