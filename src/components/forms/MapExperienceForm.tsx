'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const schema = z.object({
  recommendScore: z.coerce.number().min(1).max(10),
  recommendReason: z.string().min(1, 'Required'),
  applicationScore: z.coerce.number().min(1).max(10),
  applicationReason: z.string().min(1, 'Required'),
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
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
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

export function MapExperienceForm() {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })
  const recommendScore = watch('recommendScore')
  const applicationScore = watch('applicationScore')
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'map-experience',
    onSuccess: () => reset(),
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage="Thank you for sharing your experience with us!"
      errorMsg={errorMsg}
    >
      <form
        onSubmit={handleSubmit((data) =>
          submit({
            context: 'bitcoiners-map',
            npsScore: data.recommendScore,
            reason: data.recommendReason,
            contextRating: data.applicationScore,
            applicationReason: data.applicationReason,
            improvement: data.improvementAdvice,
          }),
        )}
        noValidate
        className="flex flex-col gap-6"
      >
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <p className="text-sm text-brand-text-mid">
          <span className="text-brand-primary">*</span> indicates required fields
        </p>
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-brand-text-dark">
            1. How likely are you to recommend African Bitcoiners to a friend or colleague?{' '}
            <span className="text-brand-primary">*</span>
          </legend>
          <ScoreRow
            name="recommendScore"
            value={recommendScore}
            onChange={(n) => setValue('recommendScore', n, { shouldValidate: true })}
            error={errors.recommendScore?.message}
          />
        </fieldset>
        <ABTextarea
          label="What's the main reason for your score above? *"
          rows={3}
          error={errors.recommendReason?.message}
          {...register('recommendReason')}
        />
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-brand-text-dark">
            2. How would you rate your application process? <span className="text-brand-primary">*</span>
          </legend>
          <ScoreRow
            name="applicationScore"
            value={applicationScore}
            onChange={(n) => setValue('applicationScore', n, { shouldValidate: true })}
            error={errors.applicationScore?.message}
          />
        </fieldset>
        <ABTextarea
          label="What's the main reason for your score above? *"
          rows={3}
          error={errors.applicationReason?.message}
          {...register('applicationReason')}
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
          className="self-start rounded-lg px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#253343] disabled:opacity-60"
          style={{ backgroundColor: '#E1640C' }}
        >
          {isLoading ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </FormShell>
  )
}
