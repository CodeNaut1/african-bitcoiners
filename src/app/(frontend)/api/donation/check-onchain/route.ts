import { type NextRequest, NextResponse } from 'next/server'
import { checkOnchainStatus } from '@/lib/blink'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')
  if (!address) {
    return NextResponse.json({ error: 'address is required' }, { status: 400 })
  }

  try {
    const status = await checkOnchainStatus(address)
    return NextResponse.json({ status })
  } catch (err: any) {
    console.error('[donation/check-onchain]', err.message)
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
