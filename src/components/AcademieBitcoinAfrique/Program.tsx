'use client'

import React, { useState } from 'react'
import { PROGRAM, type ProgramSession } from './data'
import { Avatar } from './Avatar'
import { Blob, Dots } from './shapes'

const HUES = [70, 55, 45]

function SessionCard({ s, hue }: { s: ProgramSession; hue: number }) {
  return (
    <div
      style={{
        background: 'var(--white)',
        borderRadius: 22,
        border: '1px solid var(--line)',
        padding: 26,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 30px 60px -40px rgba(26, 26, 26, 0.25)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: `radial-gradient(circle, hsl(${hue}, 40%, 92%) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: 'var(--ink-soft)',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
            }}
          >
            Session · {s.day}
          </div>
          <div className="serif" style={{ fontSize: 32, lineHeight: 1.05, marginTop: 6 }}>
            {s.title}
          </div>
        </div>
        <div
          style={{
            padding: '6px 12px',
            borderRadius: 999,
            fontSize: 12,
            background: `hsl(${hue}, 40%, 95%)`,
            color: 'var(--orange-deep)',
            border: '1px solid rgba(224, 138, 60, 0.25)',
          }}
        >
          {s.kicker}
        </div>
      </div>

      <p
        style={{
          fontSize: 15,
          lineHeight: 1.55,
          color: 'var(--ink-soft)',
          margin: 0,
          position: 'relative',
        }}
      >
        {s.summary}
      </p>

      {s.project && (
        <div
          className="mono"
          style={{
            padding: '12px 14px',
            borderRadius: 12,
            background: '#faf6f0',
            fontSize: 13,
            border: '1px dashed rgba(224, 138, 60, 0.5)',
            position: 'relative',
          }}
        >
          {s.project}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingTop: 14,
          borderTop: '1px solid var(--line)',
          position: 'relative',
        }}
      >
        <Avatar name={s.speaker} hue={hue} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{s.speaker}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{s.org}</div>
        </div>
      </div>
    </div>
  )
}

export function Program() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="programme"
      className="sec-pad"
      style={{ paddingBottom: 120, position: 'relative' }}
    >
      <Blob
        color="#f5ead8"
        size={340}
        style={{
          position: 'absolute',
          left: -120,
          top: 80,
          animation: 'academie-float1 14s ease-in-out infinite',
          opacity: 0.7,
        }}
        className="academie-hide-lg"
      />
      <Dots
        cols={10}
        rows={10}
        gap={16}
        style={{ position: 'absolute', right: 60, top: 40, opacity: 0.5 }}
        className="academie-hide-lg"
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 32,
            marginBottom: 56,
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
              ◐ Programme · 3 semaines
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
              Six sessions, <br />
              <em style={{ color: 'var(--orange-deep)' }}>un fil clair.</em>
            </h2>
          </div>
          <p
            style={{
              maxWidth: 380,
              fontSize: 15,
              lineHeight: 1.6,
              color: 'var(--ink-soft)',
              margin: 0,
            }}
          >
            Le détail des objectifs, activités et devoirs est réservé aux personnes inscrites. Voici
            le fil conducteur des trois semaines.
          </p>
        </div>

        <div
          className="reveal d1"
          style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}
        >
          {PROGRAM.map((w, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              style={{
                padding: '14px 22px',
                borderRadius: 999,
                cursor: 'pointer',
                border: active === i ? '1px solid var(--ink)' : '1px solid var(--line)',
                background: active === i ? 'var(--ink)' : 'var(--white)',
                color: active === i ? 'var(--cream)' : 'var(--ink)',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all .25s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background:
                    active === i ? 'var(--orange)' : `hsl(${HUES[i]}, 60%, 55%)`,
                }}
              />
              {w.week}
              <span style={{ fontSize: 12, opacity: 0.7 }}>— {w.theme}</span>
            </button>
          ))}
        </div>

        <div
          className="academie-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
        >
          {PROGRAM[active].sessions.map((s, i) => (
            <div
              key={`${active}-${i}`}
              className="reveal in"
              style={{
                animation: `academie-fade-up .6s cubic-bezier(.2,.7,.2,1) ${i * 0.08}s both`,
              }}
            >
              <SessionCard s={s} hue={HUES[active]} />
            </div>
          ))}
        </div>

        <div
          className="reveal"
          style={{
            marginTop: 28,
            padding: 24,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #faf6f0, #f0e4d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              ✦
            </div>
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--orange-deep)',
                }}
              >
                Bonus · 10 min
              </div>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1.1 }}>
                Comment expliquer Bitcoin au grand public
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name="Prince Don" hue={40} />
            <div style={{ fontSize: 13 }}>Prince Don</div>
          </div>
        </div>
      </div>
    </section>
  )
}
