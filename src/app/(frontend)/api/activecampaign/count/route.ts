import { type NextRequest, NextResponse } from 'next/server'
import { getListCount } from '@/lib/activecampaign'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const list = req.nextUrl.searchParams.get('list')
  if (!list) {
    return NextResponse.json({ error: 'Missing list param' }, { status: 400 })
  }
  const count = await getListCount(list)
  return NextResponse.json({ count }, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  })
}
