import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  buildResultPageUrl,
  checkCertificateEligibility,
  findCourseCompletion,
  sendCertificateDownloadTeamNotification,
} from '@/lib/course-completion'

export const dynamic = 'force-dynamic'

async function handleLookup(email?: string, uniqueCode?: string) {
  if (!email && !uniqueCode) {
    return NextResponse.json({ error: 'Provide email or uniqueCode.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const completion = await findCourseCompletion(payload, email, uniqueCode)

  if (!completion?.certNumber || !completion.certHash) {
    return NextResponse.json(
      { error: 'No certificate found for this email/code.' },
      { status: 404 },
    )
  }

  const eligibility = await checkCertificateEligibility(payload, email, uniqueCode)
  if (!eligibility.eligible) {
    return NextResponse.json(
      {
        error: `Your certificate will be available on ${eligibility.availableDate}. Please check back then.`,
      },
      { status: 403 },
    )
  }

  await sendCertificateDownloadTeamNotification(completion.name)

  return NextResponse.json({
    certId: completion.certNumber,
    certHash: completion.certHash,
    name: completion.name,
    certNumber: completion.certNumber,
    score: completion.score,
    scorePercent: completion.scorePercent,
    completionDate: completion.completionDate,
    language: completion.language ?? 'English',
    tierLevel: completion.tierLevel ?? 'ba',
    redirectUrl: buildResultPageUrl(completion.certNumber, completion.certHash),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; uniqueCode?: string }
    const email = body.email?.trim()
    const uniqueCode = body.uniqueCode?.trim()
    return handleLookup(email, uniqueCode)
  } catch (err) {
    console.error('[certificate/lookup]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email') ?? undefined
    const uniqueCode = searchParams.get('uniqueCode') ?? undefined
    return handleLookup(email, uniqueCode)
  } catch (err) {
    console.error('[certificate/lookup]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
