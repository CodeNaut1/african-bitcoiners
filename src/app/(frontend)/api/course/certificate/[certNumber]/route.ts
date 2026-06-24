import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import sharp from 'sharp'

export const dynamic = 'force-dynamic'

function buildCertSvg(name: string, certNumber: string, completionDate: string, lang: string): string {
  const dateStr = new Date(completionDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const isFr = lang === 'French'
  const title = isFr ? 'Certificat d\'Achèvement' : 'Certificate of Completion'
  const body = isFr
    ? 'Ceci certifie que'
    : 'This certifies that'
  const sub = isFr
    ? 'a complété avec succès le cours Bitcoin pour Débutants (BFB)\ndispensé par African Bitcoiners'
    : 'has successfully completed the Bitcoin for Beginners (BFB) course\ndelivered by African Bitcoiners'
  const certLabel = isFr ? 'Certificat N°' : 'Certificate No.'
  const dateLabel = isFr ? 'Date d\'obtention :' : 'Date of Completion:'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="640" viewBox="0 0 900 640">
  <!-- Background -->
  <rect width="900" height="640" fill="#FFFDF7"/>
  <!-- Border -->
  <rect x="20" y="20" width="860" height="600" rx="8" fill="none" stroke="#F7931A" stroke-width="3"/>
  <rect x="30" y="30" width="840" height="580" rx="6" fill="none" stroke="#F7931A" stroke-width="1" stroke-dasharray="8 4"/>

  <!-- Top accent bar -->
  <rect x="20" y="20" width="860" height="8" rx="4" fill="#F7931A"/>

  <!-- African Bitcoiners wordmark -->
  <text x="450" y="80" font-family="Georgia, serif" font-size="14" fill="#F7931A" text-anchor="middle" letter-spacing="4">AFRICAN BITCOINERS</text>

  <!-- Bitcoin ₿ icon -->
  <text x="450" y="150" font-family="Arial, sans-serif" font-size="52" fill="#F7931A" text-anchor="middle">₿</text>

  <!-- Title -->
  <text x="450" y="210" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="#1A1A1A" text-anchor="middle">${title}</text>

  <!-- Divider -->
  <line x1="300" y1="230" x2="600" y2="230" stroke="#F7931A" stroke-width="1.5"/>

  <!-- Presented to label -->
  <text x="450" y="270" font-family="Georgia, serif" font-size="14" fill="#666" text-anchor="middle">${body}</text>

  <!-- Recipient name -->
  <text x="450" y="320" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#1A1A1A" text-anchor="middle">${escapeXml(name)}</text>

  <!-- Course description -->
  <text x="450" y="365" font-family="Georgia, serif" font-size="13" fill="#444" text-anchor="middle">${sub.split('\n')[0]}</text>
  <text x="450" y="385" font-family="Georgia, serif" font-size="13" fill="#444" text-anchor="middle">${sub.split('\n')[1]}</text>

  <!-- Divider -->
  <line x1="200" y1="420" x2="700" y2="420" stroke="#E5E7EB" stroke-width="1"/>

  <!-- Cert number and date -->
  <text x="250" y="460" font-family="monospace" font-size="11" fill="#888" text-anchor="middle">${certLabel}</text>
  <text x="250" y="478" font-family="monospace" font-size="14" font-weight="bold" fill="#1A1A1A" text-anchor="middle">${escapeXml(certNumber)}</text>

  <text x="650" y="460" font-family="monospace" font-size="11" fill="#888" text-anchor="middle">${dateLabel}</text>
  <text x="650" y="478" font-family="monospace" font-size="13" fill="#1A1A1A" text-anchor="middle">${escapeXml(dateStr)}</text>

  <!-- Bottom tagline -->
  <text x="450" y="560" font-family="Georgia, serif" font-size="11" fill="#F7931A" text-anchor="middle" letter-spacing="2">BITCOIN IS FOR EVERYONE · BITCOINERS.AFRICA</text>
</svg>`
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ certNumber: string }> },
) {
  const { certNumber } = await params

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'course-completions' as any,
    where: { certNumber: { equals: certNumber } },
    limit: 1,
    overrideAccess: true,
  })

  const doc = result.docs?.[0] as any
  if (!doc) {
    return NextResponse.json({ error: 'Certificate not found.' }, { status: 404 })
  }

  const svg = buildCertSvg(
    doc.name ?? 'Course Participant',
    doc.certNumber ?? certNumber,
    doc.completionDate ?? new Date().toISOString(),
    doc.courseLang ?? 'English',
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new NextResponse(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="certificate-${certNumber}.png"`,
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
