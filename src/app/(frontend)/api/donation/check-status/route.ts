import { type NextRequest, NextResponse } from 'next/server'
import { checkLnPaymentStatus } from '@/lib/blink'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const paymentHash = req.nextUrl.searchParams.get('paymentHash')
  if (!paymentHash) {
    return NextResponse.json({ error: 'paymentHash is required' }, { status: 400 })
  }

  try {
    const status = await checkLnPaymentStatus(paymentHash)
    return NextResponse.json({ status })
  } catch (err: any) {
    console.error('[donation/check-status]', err.message)
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
