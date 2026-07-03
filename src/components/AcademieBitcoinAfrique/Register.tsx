'use client'

import React from 'react'
import { MasterclassSignupForm } from '@/components/forms/MasterclassSignupForm'
import { Blob, Ring } from './shapes'

export function Register() {
  return (
    <section
      id="inscription"
      className="sec-pad"
      style={{
        background: 'linear-gradient(180deg, var(--cream) 0%, #f0e4d4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Ring
        size={340}
        color="var(--orange-deep)"
        style={{
          position: 'absolute',
          left: -80,
          top: 80,
          opacity: 0.2,
          animation: 'academie-spin-slow 120s linear infinite',
        }}
        className="academie-hide-lg"
      />
      <Blob
        color="#f5dcc4"
        size={420}
        style={{
          position: 'absolute',
          right: -160,
          top: 40,
          opacity: 0.5,
          animation: 'academie-float1 20s ease-in-out infinite',
        }}
        className="academie-hide-lg"
      />

      <div
        className="academie-grid-register"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 48,
          position: 'relative',
          alignItems: 'center',
        }}
      >
        <div className="reveal">
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
            ◐ Rejoindre la cohorte
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(44px, 6vw, 80px)',
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Prêt·e à <em style={{ color: 'var(--orange-deep)' }}>commencer ?</em>
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--ink-soft)',
              marginTop: 24,
              maxWidth: 440,
            }}
          >
            Remplis le formulaire pour rejoindre la cohorte. Les consignes détaillées (Jitsi,
            devoirs, ressources) sont communiquées aux inscrits.
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Places limitées pour un suivi de qualité',
              'Gratuit — cohorte pilote',
              'Certificat de participation',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: '#e8f5e9',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#2e7d32',
                    fontSize: 12,
                  }}
                >
                  ✓
                </div>
                {t}
              </div>
            ))}
          </div>
        </div>

        <MasterclassSignupForm />
      </div>
    </section>
  )
}
