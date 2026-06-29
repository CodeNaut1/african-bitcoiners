import React from 'react'

import { COPY } from '@/components/OrganizationActivityUpdatePage/data'
import { OrganizationActivityUpdateForm } from '@/components/forms/OrganizationActivityUpdateForm'

const PAGE_BG = '#FFFCFA'
const HEADING = '#37312C'

export function OrganizationActivityUpdatePage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-12 sm:px-6 md:py-16 md:pb-24">
        <div className="mx-auto max-w-[750px]">
          <h2
            className="font-heading text-2xl font-bold tracking-[-0.4px] md:text-[28px]"
            style={{ color: HEADING }}
          >
            {COPY.formTitle}
          </h2>
          <div className="mt-8">
            <OrganizationActivityUpdateForm />
          </div>
        </div>
      </section>
    </div>
  )
}
