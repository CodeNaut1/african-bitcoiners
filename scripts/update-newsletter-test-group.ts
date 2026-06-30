import { getPayload } from 'payload'
import config from '@/payload.config'

async function main() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'form-settings', overrideAccess: true })
  const forms = (settings.forms ?? []).map((form: any) =>
    form.formSlug === 'newsletter-signup' ? { ...form, teamEmailGroup: 'test' } : form,
  )
  await payload.updateGlobal({
    slug: 'form-settings',
    data: { forms },
    overrideAccess: true,
  })
  payload.logger.info('Updated newsletter-signup teamEmailGroup to test')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
