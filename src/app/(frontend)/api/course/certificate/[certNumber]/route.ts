import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCertificateTemplateUrl } from '@/lib/certificate-shared'

export const dynamic = 'force-dynamic'

type CompletionDoc = {
  id: string | number
  name?: string
  certNumber?: string
  certHash?: string
  completionDate?: string
  score?: number
  scorePercent?: number
  language?: 'English' | 'French'
  tierLevel?: 'ba' | 'ad' | 'pr'
  downloadsTotals?: number
}

async function getCompletionByCertNumber(certNumber: string): Promise<CompletionDoc | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'course-completions',
    where: { certNumber: { equals: certNumber } },
    limit: 1,
    overrideAccess: true,
  })

  return (result.docs[0] as CompletionDoc | undefined) ?? null
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certNumber: string }> },
) {
  const { certNumber } = await params
  const certHash = req.nextUrl.searchParams.get('cert_hash')

  if (!certHash) {
    return NextResponse.json({ error: 'Missing certificate hash.' }, { status: 400 })
  }

  const doc = await getCompletionByCertNumber(certNumber)
  if (!doc?.certHash || doc.certHash !== certHash) {
    return NextResponse.json({ error: 'Certificate not found.' }, { status: 404 })
  }

  const language = doc.language ?? 'English'
  const tierLevel = doc.tierLevel ?? 'ba'

  return NextResponse.json({
    certId: doc.certNumber,
    certHash: doc.certHash,
    name: doc.name ?? 'Course Participant',
    certNumber: doc.certNumber,
    score: doc.score ?? 0,
    scorePercent: doc.scorePercent ?? 0,
    completionDate: doc.completionDate ?? new Date().toISOString(),
    language,
    tierLevel,
    templateUrl: getCertificateTemplateUrl(language, tierLevel),
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ certNumber: string }> },
) {
  const { certNumber } = await params
  const body = (await req.json()) as { cert_hash?: string }
  const certHash = body.cert_hash ?? req.nextUrl.searchParams.get('cert_hash')

  if (!certHash) {
    return NextResponse.json({ error: 'Missing certificate hash.' }, { status: 400 })
  }

  const doc = await getCompletionByCertNumber(certNumber)
  if (!doc?.certHash || doc.certHash !== certHash) {
    return NextResponse.json({ error: 'Certificate not found.' }, { status: 404 })
  }

  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()
  const downloadsTotals = (doc.downloadsTotals ?? 0) + 1

  await payload.update({
    collection: 'course-completions',
    id: doc.id,
    data: {
      certDownloaded: true,
      timeDownloaded: now,
      downloadsTotals,
    },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true, downloadsTotals })
}
