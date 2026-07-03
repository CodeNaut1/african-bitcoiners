'use client'

import React from 'react'

function Eyebrow() {
  return (
    <div
      className="reveal in"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 18px',
        borderRadius: 999,
        background: 'var(--white)',
        border: '1px solid var(--line)',
        fontSize: 13,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--orange-deep)',
            animation: 'academie-pulse 2s infinite',
          }}
        />
        Cohorte 1 — Inscriptions ouvertes
      </span>
      <span style={{ width: 1, height: 14, background: 'var(--line)' }} />
      <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
        FR · AFRIQUE
      </span>
    </div>
  )
}

function Supporting() {
  return (
    <p
      className="reveal in d2"
      style={{
        maxWidth: 620,
        fontSize: 18,
        lineHeight: 1.55,
        color: 'var(--ink-soft)',
        marginTop: 40,
      }}
    >
      Six sessions live sur trois semaines : de l&apos;argent à Bitcoin, puis pratique sécurisée,
      Lightning, et cas d&apos;usage africains.{' '}
      <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>
        Pas de trading. Pas d&apos;altcoins. Uniquement Bitcoin.
      </strong>
    </p>
  )
}

function HeroCommonCTA({ onCta }: { onCta: () => void }) {
  return (
    <div
      className="reveal in d3"
      style={{
        display: 'flex',
        gap: 14,
        marginTop: 36,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <button type="button" className="btn-primary" onClick={onCta}>
        S&apos;inscrire à la cohorte <span className="arrow">→</span>
      </button>
      <a href="#programme" className="btn-ghost" style={{ textDecoration: 'none' }}>
        Voir le programme
      </a>
    </div>
  )
}

export function HeroBitcoin({ onCta }: { onCta: () => void }) {
  return (
    <section
      style={{
        position: 'relative',
        background:
          'radial-gradient(ellipse at 80% 20%, #f5ead8 0%, var(--cream) 55%)',
        overflow: 'hidden',
        minHeight: '92vh',
      }}
      className="academie-hero"
    >
      <div
        style={{
          position: 'absolute',
          right: -40,
          top: 120,
          width: 520,
          height: 520,
          animation: 'academie-float1 14s ease-in-out infinite',
        }}
        className="academie-hide-lg"
      >
        <svg viewBox="0 0 520 520" width="520" height="520" aria-hidden="true">
          <defs>
            <radialGradient id="coinG" cx="35%" cy="35%">
              <stop offset="0" stopColor="#f5dcc4" />
              <stop offset=".55" stopColor="#e08a3c" />
              <stop offset="1" stopColor="#8a5a2a" />
            </radialGradient>
            <radialGradient id="coinShine" cx="30%" cy="25%">
              <stop offset="0" stopColor="white" stopOpacity=".7" />
              <stop offset=".4" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="260"
            cy="260"
            r="250"
            fill="none"
            stroke="var(--orange-deep)"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity=".35"
          />
          <circle
            cx="260"
            cy="260"
            r="210"
            fill="none"
            stroke="var(--orange-deep)"
            strokeWidth="1"
            opacity=".2"
          />
          <circle cx="260" cy="260" r="170" fill="url(#coinG)" />
          <circle cx="260" cy="260" r="170" fill="url(#coinShine)" />
          <circle
            cx="260"
            cy="260"
            r="170"
            fill="none"
            stroke="#8a5a2a"
            strokeWidth="2"
            opacity=".6"
          />
          <circle cx="260" cy="260" r="148" fill="none" stroke="white" strokeWidth="1" opacity=".4" />
          <text
            x="260"
            y="260"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="'Inter', 'Helvetica', sans-serif"
            fontWeight="800"
            fontSize="210"
            fill="white"
            style={{ letterSpacing: '-0.02em' }}
          >
            ₿
          </text>
          <g style={{ transformOrigin: '260px 260px', animation: 'academie-spin-slow 40s linear infinite' }}>
            <circle cx="260" cy="10" r="14" fill="#e08a3c" opacity=".9" />
            <circle cx="500" cy="260" r="10" fill="#f0a855" opacity=".7" />
            <circle cx="20" cy="260" r="8" fill="#f5c88a" opacity=".8" />
          </g>
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Eyebrow />
        <h1
          className="serif reveal in d1"
          style={{
            fontSize: 'clamp(54px, 9vw, 130px)',
            lineHeight: 0.92,
            margin: '28px 0 0',
            letterSpacing: '-0.025em',
            maxWidth: 980,
          }}
        >
          Comprendre <em style={{ color: 'var(--orange-deep)' }}>Bitcoin.</em>
          <br />
          Pour de vrai.
          <br />
          <span style={{ fontSize: '.6em', color: 'var(--ink-soft)', fontStyle: 'normal' }}>
            En français, pour l&apos;Afrique.
          </span>
        </h1>
        <Supporting />
        <HeroCommonCTA onCta={onCta} />
      </div>
    </section>
  )
}
