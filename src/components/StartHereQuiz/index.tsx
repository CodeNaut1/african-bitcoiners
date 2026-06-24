'use client'

import React, { useState } from 'react'
import { ABButton } from '@/components/ui/ab-button'

type Question = {
  q: string
  options: string[]
  correct: number
}

const QUESTIONS: Question[] = [
  {
    q: 'What is Bitcoin?',
    options: [
      'A digital currency controlled by central banks',
      'A peer-to-peer electronic cash system with no central authority',
      'A type of credit card that works online',
      'A government-backed savings account',
    ],
    correct: 1,
  },
  {
    q: 'What does it mean for Bitcoin to be "decentralized"?',
    options: [
      'It is managed by a team in Silicon Valley',
      'It runs on a single secure server',
      'No single person, company, or government controls it',
      'It is decentralized only in Africa',
    ],
    correct: 2,
  },
  {
    q: 'What is a Bitcoin private key?',
    options: [
      'Your exchange account password',
      'A secret number that gives you control over your Bitcoin',
      'A code you need to buy Bitcoin',
      'The PIN on your mobile banking app',
    ],
    correct: 1,
  },
  {
    q: 'What is the Lightning Network?',
    options: [
      'A fast internet service for Bitcoin miners',
      'A government project to speed up Bitcoin',
      'A layer-2 protocol for fast, cheap Bitcoin payments',
      'A special type of Bitcoin wallet',
    ],
    correct: 2,
  },
  {
    q: 'What does "Not your keys, not your coins" mean?',
    options: [
      'You need a physical USB key to access Bitcoin',
      'If someone else holds your private keys, they control your Bitcoin',
      'You must print your Bitcoin wallet on paper',
      'Only miners can truly own Bitcoin',
    ],
    correct: 1,
  },
]

type Result = {
  score: number
  level: 'beginner' | 'intermediate' | 'advanced'
  title: string
  message: string
  cta: { label: string; href: string }[]
}

function getResult(score: number): Result {
  if (score <= 1) {
    return {
      score,
      level: 'beginner',
      title: 'You\'re a Bitcoin Beginner — Perfect Starting Point!',
      message: 'Everyone starts somewhere! The Bitcoin for Beginners course was made for exactly where you are right now. Join thousands of Africans who started with zero knowledge and now understand Bitcoin deeply.',
      cta: [
        { label: 'Join the Free BFB Course', href: '/learn-bitcoin/free-bitcoin-course/' },
        { label: 'Read the Newsletter', href: '/bitcoin-newsletter/' },
      ],
    }
  }
  if (score <= 3) {
    return {
      score,
      level: 'intermediate',
      title: 'You\'re at Intermediate Level — Keep Going!',
      message: 'You have a solid foundation. Now it\'s time to go deeper — join our community, read the weekly newsletter, and connect with Bitcoin holders across Africa.',
      cta: [
        { label: 'Join the Community', href: '/community-bitcoin-africa/' },
        { label: 'Read the Newsletter', href: '/bitcoin-newsletter/' },
        { label: 'Complete the BFB Course', href: '/learn-bitcoin/free-bitcoin-course/' },
      ],
    }
  }
  return {
    score,
    level: 'advanced',
    title: 'You\'re Advanced — Welcome to the Orange Pill Club!',
    message: 'Impressive Bitcoin knowledge! You\'re exactly the kind of person who can help us build Bitcoin adoption across Africa. Share your knowledge, submit feedback for sats, or explore our partnership opportunities.',
    cta: [
      { label: 'Submit Feedback & Earn Sats', href: '/earn-bitcoin/1000-sats-feedback-bounty/' },
      { label: 'Partner With Us', href: '/about-us/connect-with-us/' },
      { label: 'View the Bounty Matrix', href: '/feedback-bounty-matrix/' },
    ],
  }
}

const LEVEL_COLORS = {
  beginner: { badge: 'bg-blue-100 text-blue-700', bar: 'bg-blue-400', ring: 'ring-blue-200' },
  intermediate: { badge: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-400', ring: 'ring-yellow-200' },
  advanced: { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500', ring: 'ring-green-200' },
}

export function StartHereQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [result, setResult] = useState<Result | null>(null)

  function handleAnswer(qIndex: number, optIndex: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = optIndex
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const unanswered = answers.findIndex((a) => a === null)
    if (unanswered !== -1) {
      alert(`Please answer question ${unanswered + 1}.`)
      return
    }
    const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length
    setResult(getResult(score))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (result) {
    const colors = LEVEL_COLORS[result.level]
    const pct = Math.round((result.score / QUESTIONS.length) * 100)
    return (
      <div className="max-w-xl mx-auto py-4">
        {/* Score circle */}
        <div className="text-center mb-8">
          <div className={`inline-flex flex-col items-center justify-center w-28 h-28 rounded-full bg-white border-4 ${colors.ring} ring-4 shadow-elevated mb-4`}>
            <span className="text-3xl font-extrabold text-brand-secondary">{result.score}/{QUESTIONS.length}</span>
            <span className="text-xs text-brand-text-muted">{pct}% correct</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.badge} mb-3`}>
            {result.level}
          </div>
          <h2 className="text-xl font-bold text-brand-secondary leading-snug">{result.title}</h2>
        </div>

        {/* Score bar */}
        <div className="h-2 bg-brand-border-light rounded-full overflow-hidden mb-8">
          <div className={`h-full rounded-full transition-all duration-700 ${colors.bar}`} style={{ width: `${pct}%` }} />
        </div>

        <p className="text-brand-text-mid leading-relaxed mb-8">{result.message}</p>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          {result.cta.map((c, i) => (
            <a
              key={c.href}
              href={c.href}
              className={`block text-center font-bold text-sm px-6 py-3 rounded-btn transition-colors ${
                i === 0
                  ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                  : 'border border-brand-secondary text-brand-secondary hover:bg-brand-cream'
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setResult(null) }}
          className="mt-6 text-xs text-brand-text-muted hover:text-brand-secondary underline w-full text-center"
        >
          Retake the quiz
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {QUESTIONS.map((q, qi) => (
          <div key={qi} className="bg-white rounded-card border border-brand-border-light p-5">
            <p className="font-semibold text-brand-secondary mb-3 text-sm leading-snug">
              {qi + 1}. {q.q}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => (
                <label
                  key={oi}
                  className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-2.5 border transition-colors text-sm ${
                    answers[qi] === oi
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-secondary font-medium'
                      : 'border-brand-border-light hover:bg-brand-cream text-brand-text-mid'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${qi}`}
                    value={oi}
                    checked={answers[qi] === oi}
                    onChange={() => handleAnswer(qi, oi)}
                    className="accent-brand-primary h-4 w-4 flex-shrink-0"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <ABButton type="submit" variant="primary" size="lg" className="w-full justify-center">
          See My Bitcoin Level →
        </ABButton>
      </form>
    </div>
  )
}
