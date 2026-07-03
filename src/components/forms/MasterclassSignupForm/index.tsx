'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AFRICAN_COUNTRIES } from '@/components/forms/africanCountries'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { HEAR_ABOUT_OPTIONS } from '@/components/AcademieBitcoinAfrique/data'

const schema = z.object({
  prenom: z.string().min(1, 'Requis'),
  nom: z.string().min(1, 'Requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(5, 'Requis'),
  pays: z.string().min(1, 'Requis'),
  hearAbout: z.string().optional(),
  message: z.string().optional(),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

const SUCCESS_MESSAGE =
  'Merci pour votre inscription ! Nous vous contacterons bientôt avec les détails du programme.'

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  padding: '14px 16px',
  borderRadius: 14,
  border: `1px solid ${hasError ? '#c62828' : 'var(--line)'}`,
  background: 'var(--white)',
  fontSize: 15,
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  width: '100%',
})

function FieldLabel({
  children,
  error,
}: {
  children: React.ReactNode
  error?: string
}) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 11,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
      }}
    >
      {children}
      {error && (
        <span style={{ color: '#c62828', textTransform: 'none' }}> · {error}</span>
      )}
    </span>
  )
}

export function MasterclassSignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', pays: 'Senegal', hearAbout: '' },
  })

  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'masterclass-signup',
    formSlug: 'masterclass-signup',
    onSuccess: () => reset(),
  })

  const [focusField, setFocusField] = useState<string | null>(null)

  const onSubmit = handleSubmit((data) => {
    submit({
      prenom: data.prenom,
      nom: data.nom,
      firstName: data.prenom,
      lastName: data.nom,
      email: data.email,
      telephone: data.telephone,
      phone: data.telephone,
      pays: data.pays,
      country: data.pays,
      hearAbout: data.hearAbout || '',
      message: data.message || '',
      honey: data.honey,
    })
  })

  if (isSuccess) {
    return (
      <div
        style={{
          padding: 40,
          borderRadius: 28,
          background: 'var(--white)',
          border: '1px solid var(--line)',
          textAlign: 'center',
          boxShadow: '0 40px 80px -40px rgba(26, 26, 26, 0.2)',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#e8f5e9',
            color: '#2e7d32',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 20px',
            fontSize: 32,
          }}
        >
          ✓
        </div>
        <div className="serif" style={{ fontSize: 28, lineHeight: 1.15, marginBottom: 12 }}>
          Inscription reçue.
        </div>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
          {SUCCESS_MESSAGE}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="reveal d1"
      style={{
        padding: 32,
        borderRadius: 28,
        background: 'var(--white)',
        border: '1px solid var(--line)',
        boxShadow: '0 40px 80px -40px rgba(26, 26, 26, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

      <div
        className="academie-grid-form-row"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
          <FieldLabel error={errors.prenom?.message}>Prénom *</FieldLabel>
          <input
            type="text"
            placeholder="Ex. Aïcha"
            {...register('prenom')}
            style={{
              ...inputStyle(Boolean(errors.prenom)),
              borderColor:
                errors.prenom ? '#c62828' : focusField === 'prenom' ? 'var(--orange)' : 'var(--line)',
            }}
            onFocus={() => setFocusField('prenom')}
            onBlur={() => setFocusField(null)}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
          <FieldLabel error={errors.nom?.message}>Nom *</FieldLabel>
          <input
            type="text"
            placeholder="Ex. Diallo"
            {...register('nom')}
            style={{
              ...inputStyle(Boolean(errors.nom)),
              borderColor:
                errors.nom ? '#c62828' : focusField === 'nom' ? 'var(--orange)' : 'var(--line)',
            }}
            onFocus={() => setFocusField('nom')}
            onBlur={() => setFocusField(null)}
          />
        </label>
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        <FieldLabel error={errors.email?.message}>Email *</FieldLabel>
        <input
          type="email"
          placeholder="tu@exemple.com"
          {...register('email')}
          style={{
            ...inputStyle(Boolean(errors.email)),
            borderColor:
              errors.email ? '#c62828' : focusField === 'email' ? 'var(--orange)' : 'var(--line)',
          }}
          onFocus={() => setFocusField('email')}
          onBlur={() => setFocusField(null)}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        <FieldLabel error={errors.telephone?.message}>Téléphone *</FieldLabel>
        <input
          type="tel"
          placeholder="+221 77 000 00 00"
          {...register('telephone')}
          style={{
            ...inputStyle(Boolean(errors.telephone)),
            borderColor:
              errors.telephone
                ? '#c62828'
                : focusField === 'telephone'
                  ? 'var(--orange)'
                  : 'var(--line)',
          }}
          onFocus={() => setFocusField('telephone')}
          onBlur={() => setFocusField(null)}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        <FieldLabel error={errors.pays?.message}>Pays *</FieldLabel>
        <select
          {...register('pays')}
          style={{
            ...inputStyle(Boolean(errors.pays)),
            borderColor:
              errors.pays ? '#c62828' : focusField === 'pays' ? 'var(--orange)' : 'var(--line)',
          }}
          onFocus={() => setFocusField('pays')}
          onBlur={() => setFocusField(null)}
        >
          {AFRICAN_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        <FieldLabel>Comment avez-vous entendu parler de nous ?</FieldLabel>
        <select
          {...register('hearAbout')}
          style={{
            ...inputStyle(false),
            borderColor: focusField === 'hearAbout' ? 'var(--orange)' : 'var(--line)',
          }}
          onFocus={() => setFocusField('hearAbout')}
          onBlur={() => setFocusField(null)}
        >
          <option value="">— Sélectionner —</option>
          {HEAR_ABOUT_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        <FieldLabel>Message ou questions</FieldLabel>
        <textarea
          rows={3}
          placeholder="Une question ou un message (optionnel)"
          {...register('message')}
          style={{
            ...inputStyle(false),
            borderColor: focusField === 'message' ? 'var(--orange)' : 'var(--line)',
            resize: 'vertical',
            minHeight: 88,
          }}
          onFocus={() => setFocusField('message')}
          onBlur={() => setFocusField(null)}
        />
      </label>

      {errorMsg && (
        <p style={{ color: '#c62828', fontSize: 14, margin: 0 }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={isLoading}
        style={{ marginTop: 8, justifyContent: 'center' }}
      >
        {isLoading ? 'Envoi…' : "S'inscrire à la cohorte"} <span className="arrow">→</span>
      </button>

      <p
        style={{
          fontSize: 12,
          color: 'var(--ink-soft)',
          lineHeight: 1.5,
          margin: 0,
          textAlign: 'center',
        }}
      >
        En t&apos;inscrivant, tu peux être contacté·e pour l&apos;organisation du programme. Tu peux
        demander la correction ou la suppression de tes données à{' '}
        <span className="mono" style={{ color: 'var(--orange-deep)' }}>
          lys@bitcoiners.africa
        </span>
        .
      </p>
    </form>
  )
}
