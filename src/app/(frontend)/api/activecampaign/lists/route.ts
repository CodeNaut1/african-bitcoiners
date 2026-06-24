import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.ACTIVECAMPAIGN_API_URL
  const key = process.env.ACTIVECAMPAIGN_API_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'ActiveCampaign not configured' }, { status: 400 })
  }

  try {
    const res = await fetch(`${url}/api/3/lists?limit=100&filters[status]=1`, {
      headers: { 'Api-Token': key },
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[ac/lists] fetch failed:', res.status, text.slice(0, 200))
      return NextResponse.json({ error: `AC API error: ${res.status}` }, { status: 502 })
    }

    const data = await res.json()
    const lists = (data.lists ?? []).map((l: any) => ({
      id: l.id,
      name: l.name,
      subscriberCount: l.subscriber_count ?? '—',
    }))

    return NextResponse.json({ lists }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
