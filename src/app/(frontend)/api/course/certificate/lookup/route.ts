import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const uniqueCode = searchParams.get('uniqueCode')

  if (!email && !uniqueCode) {
    return NextResponse.json({ error: 'Provide email or uniqueCode.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  // Find course-completion — cast where to any to avoid Payload Where union type issues
  const whereClause = email
    ? { email: { equals: email } }
    : { uniqueCode: { equals: uniqueCode! } }

  const result = await payload.find({
    collection: 'course-completions' as any,
    where: whereClause as any,
    sort: '-completionDate',
    limit: 1,
    overrideAccess: true,
  })

  const completion = result.docs?.[0] as any
  if (!completion) {
    // Check if a signup exists to give better messaging
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  // Check 19-day wait from signup date
  if (uniqueCode) {
    const signupResult = await payload.find({
      collection: 'course-signups' as any,
      where: { uniqueCode: { equals: uniqueCode } },
      limit: 1,
      overrideAccess: true,
    })
    const signup = signupResult.docs?.[0] as any
    if (signup?.signupDate) {
      const signupTs = new Date(signup.signupDate).getTime()
      const daysSince = (Date.now() - signupTs) / (1000 * 60 * 60 * 24)
      if (daysSince < 19) {
        return NextResponse.json({ error: 'Certificate not yet available.' }, { status: 403 })
      }
    }
  }

  return NextResponse.json({
    name: completion.name,
    certNumber: completion.certNumber,
    completionDate: completion.completionDate,
    scorePercent: completion.scorePercent,
    courseLang: completion.courseLang,
  })
}
