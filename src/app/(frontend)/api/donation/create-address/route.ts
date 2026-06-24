import { NextResponse } from 'next/server'
import { createOnchainAddress } from '@/lib/blink'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const address = await createOnchainAddress()
    return NextResponse.json({ ok: true, address })
  } catch (err: any) {
    console.error('[donation/create-address]', err.message)
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
