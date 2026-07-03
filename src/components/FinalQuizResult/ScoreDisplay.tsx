import React from 'react'

type Props = {
  score: string | null
  percent: string | null
  totalQuestions: number
}

export function FinalQuizScoreDisplay({ score, percent, totalQuestions }: Props) {
  const hasScore = score != null
  const hasPercent = percent != null

  if (!hasScore && !hasPercent) {
    return (
      <div className="mt-6">
        <p className="text-5xl font-bold text-brand-primary sm:text-6xl">—</p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      {hasScore && (
        <p className="text-5xl font-bold leading-none text-brand-primary sm:text-6xl">
          {score}/{totalQuestions}
        </p>
      )}
      {hasPercent && (
        <p className="mt-2 text-4xl font-bold text-brand-primary sm:text-5xl">{percent}%</p>
      )}
      {hasScore && hasPercent && (
        <p className="mt-3 text-sm text-brand-text-muted sm:text-base">
          You scored {score} out of {totalQuestions} ({percent}%)
        </p>
      )}
    </div>
  )
}
