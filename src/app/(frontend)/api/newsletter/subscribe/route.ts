import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { addContactForForm } from '@/lib/activecampaign'
import { getFormConfigBySlug, sendFormNotifications } from '@/lib/form-notifications'
import { buildFormSubmitResponse } from '@/lib/form-settings'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  console.log('[newsletter/subscribe] Step 1: request received')

  try {
    const { name, email, country, honey } = await req.json()
    console.log('[newsletter/subscribe] Step 1: parsed body', {
      email,
      name: name ?? '',
      country: country ?? '',
      honey: honey ? '(set)' : '(empty)',
    })

    if (honey) {
      console.log('[newsletter/subscribe] honey trap triggered — skipping save/sync/notifications')
      return NextResponse.json({ ok: true })
    }

    if (!email || typeof email !== 'string') {
      console.log('[newsletter/subscribe] Step 1: validation failed — email required')
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    console.log('[newsletter/subscribe] Step 1: validation passed')

    const payload = await getPayload({ config })
    const submissionData = { name: name ?? '', email, country: country ?? '' }

    console.log('[newsletter/subscribe] Step 2: saving to form-submissions collection...')
    const doc = await payload.create({
      collection: 'form-submissions',
      data: {
        formName: 'newsletter-signup',
        formSlug: 'newsletter-signup',
        data: submissionData,
        submittedAt: new Date().toISOString(),
        ipAddress: req.headers.get('x-forwarded-for') ?? '',
        status: 'active',
      },
      overrideAccess: true,
    })
    console.log('[newsletter/subscribe] Step 2: saved form-submission id=', doc.id)

    console.log('[newsletter/subscribe] Step 3: syncing to ActiveCampaign (formSlug=newsletter-signup)...')
    await addContactForForm(email, name ?? '', 'newsletter-signup', payload)
    console.log('[newsletter/subscribe] Step 3: ActiveCampaign sync complete')

    console.log('[newsletter/subscribe] Step 4: sending notifications via sendFormNotifications...')
    const formConfig = await getFormConfigBySlug('newsletter-signup')
    if (!formConfig || formConfig.enabled === false) {
      console.log('[newsletter/subscribe] Step 4: form config missing or disabled — skipping notifications')
    } else {
      await sendFormNotifications('newsletter-signup', submissionData)
      console.log('[newsletter/subscribe] Step 4: notifications sent')
    }

    const response = buildFormSubmitResponse('newsletter-signup', formConfig)
    console.log('[newsletter/subscribe] Step 5: returning success', { formSlug: response.formSlug })

    return NextResponse.json(response)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[newsletter/subscribe] ERROR at step — flow stopped:', message, err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
