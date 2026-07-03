'use client'

import React, { useState } from 'react'
import { FAQS } from './data'

export function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="sec-pad" style={{ background: 'var(--white)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 48, textAlign: 'center' }}>
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
            ◐ FAQ
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
            Questions <em style={{ color: 'var(--orange-deep)' }}>fréquentes.</em>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                borderRadius: 20,
                border: '1px solid var(--line)',
                background: open === i ? 'var(--cream)' : 'var(--white)',
                overflow: 'hidden',
                transition: 'background .25s ease',
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%',
                  padding: '24px 28px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                  gap: 16,
                }}
              >
                <span className="serif" style={{ fontSize: 22, letterSpacing: '-0.01em' }}>
                  {f.q}
                </span>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--orange)',
                    color: 'white',
                    display: 'grid',
                    placeItems: 'center',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform .3s ease',
                    fontSize: 18,
                    fontWeight: 300,
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 200 : 0,
                  overflow: 'hidden',
                  transition: 'max-height .4s cubic-bezier(.2,.7,.2,1)',
                }}
              >
                <div
                  style={{
                    padding: '0 28px 26px',
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
