'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const schema = z.object({
  recommendScore: z.coerce.number().min(0).max(10),
  recommendReason: z.string().optional(),
  donationScore: z.coerce.number().min(0).max(10),
  donationReason: z.string().optional(),
  improvementAdvice: z.string().min(1, 'Required'),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

function ScoreRow({
  name,
  value,
  onChange,
  error,
}: {
  name: string
  value?: number
  onChange: (n: number) => void
  error?: string
}) {
  return (
    <div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
        {SCORES.map((n) => (
          <label
            key={n}
            className={`flex cursor-pointer items-center justify-center rounded border py-2 text-sm font-bold transition-colors ${
              value === n
                ? 'border-[#E1640C] bg-[#FFF3DE] text-[#584538]'
                : 'border-[#60391333] bg-[#F9F7F0] hover:border-[#E1640C]'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function DonationConfirmationForm() {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })
  const recommendScore = watch('recommendScore')
  const donationScore = watch('donationScore')
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'donation-feedback',
    onSuccess: () => reset(),
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage={successMessage}
      errorMsg={errorMsg}
    >
      <form
        onSubmit={handleSubmit((data) =>
          submit({
            context: 'donation-confirmation',
            npsScore: data.recommendScore,
            reason: data.recommendReason ?? '',
            contextRating: data.donationScore,
            donationReason: data.donationReason ?? '',
            improvement: data.improvementAdvice,
          }),
        )}
        noValidate
        className="flex flex-col gap-6"
      >
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <p className="text-sm" style={{ color: '#584538' }}>
          &quot;<span className="text-[#E1640C]">*</span>&quot; indicates required fields
        </p>

        <fieldset>
          <legend className="mb-3 text-sm font-medium" style={{ color: '#584538' }}>
            1. How likely are you to recommend African Bitcoiners to a friend or colleague?{' '}
            <span className="text-[#E1640C]">*</span>
          </legend>
          <ScoreRow
            name="recommendScore"
            value={recommendScore}
            onChange={(n) => setValue('recommendScore', n, { shouldValidate: true })}
            error={errors.recommendScore?.message}
          />
        </fieldset>

        <ABInput
          label="What's the main reason for your score above?"
          error={errors.recommendReason?.message}
          {...register('recommendReason')}
        />

        <fieldset>
          <legend className="mb-3 text-sm font-medium" style={{ color: '#584538' }}>
            2. How would you rate the donation process? <span className="text-[#E1640C]">*</span>
          </legend>
          <ScoreRow
            name="donationScore"
            value={donationScore}
            onChange={(n) => setValue('donationScore', n, { shouldValidate: true })}
            error={errors.donationScore?.message}
          />
        </fieldset>

        <ABInput
          label="What's the main reason for your score above?"
          error={errors.donationReason?.message}
          {...register('donationReason')}
        />

        <ABTextarea
          label="3. What advice do you have for us to improve your ratings above? *"
          rows={4}
          error={errors.improvementAdvice?.message}
          {...register('improvementAdvice')}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#253343] disabled:opacity-60 sm:w-[90%]"
          style={{ backgroundColor: '#E1640C' }}
        >
          {isLoading ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </FormShell>
  )
}
