import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { validateFinalQuizStart } from '@/lib/course-quiz-validation'

export const dynamic = 'force-dynamic'

type Body = {
  email?: string
  uniqueCode?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body
    const email = body.email?.trim()
    const uniqueCode = body.uniqueCode?.trim()

    const payload = await getPayload({ config: configPromise })
    const result = await validateFinalQuizStart(payload, { email, uniqueCode })

    if ('error' in result && result.error) {
      return NextResponse.json(result, { status: 403 })
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('[course/final-quiz/validate]', err)
    return NextResponse.json({ error: true, reason: 'server_error', message: 'Server error.' }, { status: 500 })
  }
}
