import { DefaultTemplate } from '@payloadcms/next/templates'
import type { AdminViewServerProps } from 'payload'
import React from 'react'

import ImportNewsletterClient from './Client'

export default function ImportNewsletterView({
  initPageResult,
  i18n,
  locale,
  params,
  payload,
  permissions,
  searchParams,
  viewActions,
}: AdminViewServerProps) {
  const { req, visibleEntities } = initPageResult

  return (
    <DefaultTemplate
      i18n={i18n}
      locale={locale}
      params={params}
      payload={payload}
      permissions={permissions}
      req={req}
      searchParams={searchParams}
      viewActions={viewActions}
      viewType="dashboard"
      visibleEntities={visibleEntities}
    >
      <ImportNewsletterClient />
    </DefaultTemplate>
  )
}
