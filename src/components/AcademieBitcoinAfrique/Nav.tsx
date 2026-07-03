'use client'

import React from 'react'
import { OrangeMark } from './shapes'

export function AcademieNav({ onCta }: { onCta: () => void }) {
  return (
    <nav className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <OrangeMark size={28} />
        <span className="brand">Cohorte 1</span>
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a className="link" href="#programme">
          Programme
        </a>
        <a className="link" href="#apprendre">
          Apprendre
        </a>
        <a className="link" href="#pour-qui">
          Pour qui
        </a>
        <a className="link" href="#faq">
          FAQ
        </a>
      </div>
      <button
        type="button"
        className="btn-primary"
        style={{ padding: '10px 18px', fontSize: 14 }}
        onClick={onCta}
      >
        S&apos;inscrire <span className="arrow">→</span>
      </button>
    </nav>
  )
}
