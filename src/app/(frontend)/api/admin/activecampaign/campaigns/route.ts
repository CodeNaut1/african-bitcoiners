import { NextRequest, NextResponse } from 'next/server'
import { requireAdminOrEditor } from '@/lib/admin-auth'
import { cleanupActiveCampaignHtml } from '@/lib/activecampaign/cleanup-html'

export const dynamic = 'force-dynamic'

const AC_URL = process.env.ACTIVECAMPAIGN_API_URL
const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY

const STATUS_LABELS: Record<string, string> = {
  '0': 'Draft',
  '1': 'Scheduled',
  '2': 'Sending',
  '3': 'Paused',
  '4': 'Stopped',
  '5': 'Sent',
}

type AcCampaign = {
  id: string
  name: string
  sdate?: string
  status: string
  message_id?: string
  campaign_message_id?: string
  [key: string]: unknown
}

async function acFetch(path: string) {
  const res = await fetch(`${AC_URL}/api/3${path}`, {
    headers: { 'Api-Token': AC_KEY! },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`ActiveCampaign API error ${res.status}: ${text.slice(0, 200)}`)
  }

  return res.json()
}

async function fetchCampaignHtml(campaign: AcCampaign): Promise<{ subject: string; html: string }> {
  const messageId = campaign.message_id

  if (!messageId) {
    return { subject: '', html: '' }
  }

  console.log('[ac/campaigns] Fetching message ID:', campaign.message_id)

  const messageData = await acFetch(`/messages/${messageId}`)
  const message = messageData.message ?? messageData
  let html = message.html ?? ''
  let subject = message.subject ?? ''

  console.log('[ac/campaigns] Message HTML length:', html?.length || 0)

  if (!html && campaign.campaign_message_id) {
    const campaignMessageData = await acFetch(`/campaignMessages/${campaign.campaign_message_id}`)
    const campaignMessage = campaignMessageData.campaignMessage ?? campaignMessageData
    html = campaignMessage?.html ?? campaignMessage?.message?.html ?? ''
    subject = subject || campaignMessage?.subject || campaignMessage?.message?.subject || ''
    console.log('[ac/campaigns] CampaignMessage HTML length:', html?.length || 0)
  }

  return { subject, html }
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminOrEditor(req)
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.error === 'Forbidden' ? 403 : 401 })
  }

  if (!AC_URL || !AC_KEY) {
    return NextResponse.json({ error: 'ActiveCampaign not configured' }, { status: 400 })
  }

  try {
    const data = await acFetch('/campaigns?orders[sdate]=DESC&limit=20&filters[status]=5')
    const campaigns: AcCampaign[] = data.campaigns ?? []

    const results = await Promise.all(
      campaigns.map(async (campaign) => {
        const { subject, html } = await fetchCampaignHtml(campaign)
        const rawHtml = html || ''
        const htmlContent = cleanupActiveCampaignHtml(rawHtml)

        return {
          id: campaign.id,
          name: campaign.name,
          subject: subject || campaign.name,
          sendDate: campaign.sdate ?? null,
          status: STATUS_LABELS[String(campaign.status)] ?? String(campaign.status),
          htmlContent,
        }
      }),
    )

    return NextResponse.json({ campaigns: results })
  } catch (err) {
    console.error('[ac/campaigns]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch campaigns' },
      { status: 500 },
    )
  }
}
