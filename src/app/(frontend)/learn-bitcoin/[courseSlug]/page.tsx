import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { CoursePage } from '@/components/CoursePage'
import { KidsPage } from '@/components/KidsPage'
import { LearningResourcesPage } from '@/components/LearningResourcesPage'
import { AfricanLanguagePage } from '@/components/AfricanLanguagePage'
import { KeepBitcoinPage } from '@/components/KeepBitcoinPage'
import { MisconceptionsPage } from '@/components/MisconceptionsPage'
import { WhyBitcoinOnlyPage } from '@/components/WhyBitcoinOnlyPage'
import { NorthernNigeriaBitcoinSeminarPage } from '@/components/NorthernNigeriaBitcoinSeminarPage'
import { WhitepaperPage } from '@/components/WhitepaperPage'
import { CourseQuiz } from '@/components/CourseQuiz'
import { CourseFeedback } from '@/components/CourseFeedback'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PageClient from '../../[slug]/page.client'
import { getQuiz } from '@/data/course-quizzes'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ courseSlug: string }> }

export default async function LearnBitcoinSubPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { courseSlug } = await paramsPromise

  // ── Quiz routes ──────────────────────────────────────────────────────────────
  const enQuizMatch = courseSlug.match(/^day-(\d+)-quiz$/)
  const frQuizMatch = courseSlug.match(/^quiz-du-jour-(\d+)$/)
  const feedbackMatch = courseSlug.match(/^day-(\d+)-feedback$/)

  if (enQuizMatch || frQuizMatch) {
    const day = parseInt((enQuizMatch ?? frQuizMatch)![1])
    const lang = enQuizMatch ? 'en' : 'fr'
    const quiz = getQuiz(day, lang)

    if (!quiz) {
      return (
        <Container className="py-16 text-center">
          <h1 className="text-2xl font-bold text-brand-secondary mb-4">
            {lang === 'en' ? `Day ${day} quiz coming soon.` : `Quiz du jour ${day} bientôt disponible.`}
          </h1>
        </Container>
      )
    }

    return (
      <div className="min-h-screen bg-brand-cream">
        <Container className="py-10">
          <Breadcrumbs items={[
            { label: 'Learn Bitcoin', href: '/learn-bitcoin' },
            { label: lang === 'en' ? `Day ${day} Quiz` : `Quiz du Jour ${day}` },
          ]} />
          <div className="mt-8">
            <CourseQuiz quiz={quiz} />
          </div>
        </Container>
      </div>
    )
  }

  if (feedbackMatch) {
    const day = parseInt(feedbackMatch[1])
    return (
      <div className="min-h-screen bg-brand-cream">
        <Container className="py-10">
          <Breadcrumbs items={[
            { label: 'Learn Bitcoin', href: '/learn-bitcoin' },
            { label: `Day ${day} Feedback` },
          ]} />
          <div className="mt-8">
            <CourseFeedback day={day} />
          </div>
        </Container>
      </div>
    )
  }

  // ── CMS fallback ─────────────────────────────────────────────────────────────
  const fullSlug = `learn-bitcoin/${courseSlug}`
  const url = '/' + fullSlug
  const page = await queryCmsPage(fullSlug)

  if (!page) return <PayloadRedirects url={url} />

  const parent = page.parent && typeof page.parent === 'object' ? (page.parent as any) : null

  return (
    <div>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      {parent && (
        <Breadcrumbs
          items={[
            { label: parent.title, href: `/${parent.slug}` },
            { label: page.title },
          ]}
        />
      )}
      {courseSlug === 'free-bitcoin-course' ? (
        <CoursePage />
      ) : courseSlug === 'bitcoin-for-kids' ? (
        <KidsPage />
      ) : courseSlug === 'bitcoin-learning-resources' ? (
        <LearningResourcesPage />
      ) : courseSlug === 'african-language-resources' ? (
        <AfricanLanguagePage />
      ) : courseSlug === 'how-to-keep-bitcoin-in-your-head' ? (
        <KeepBitcoinPage />
      ) : courseSlug === 'top-10-bitcoin-misconceptions' ? (
        <MisconceptionsPage />
      ) : courseSlug === 'why-bitcoin-only' ? (
        <WhyBitcoinOnlyPage />
      ) : courseSlug === 'bitcoin-whitepaper' ? (
        <WhitepaperPage />
      ) : courseSlug === 'northern-nigeria-bitcoin-seminar' ? (
        <NorthernNigeriaBitcoinSeminarPage />
      ) : (
        <RenderBlocks blocks={(page.content as any[]) ?? []} />
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { courseSlug } = await paramsPromise

  if (courseSlug === 'northern-nigeria-bitcoin-seminar') {
    return {
      title: 'Northern Nigeria Bitcoin Seminar',
      description:
        'A comprehensive immersion into Bitcoin technologies, featuring a community meetup and hands-on lightning network development bootcamp in Kaduna.',
      alternates: { canonical: '/learn-bitcoin/northern-nigeria-bitcoin-seminar' },
    }
  }

  const page = await queryCmsPage(`learn-bitcoin/${courseSlug}`)
  return generateMeta({ doc: page })
}

const queryCmsPage = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
