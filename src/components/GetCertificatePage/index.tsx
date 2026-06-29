import React, { Suspense } from 'react'

import { GetCertificateContent } from '@/components/GetCertificatePage/content'

export function GetCertificatePage() {
  return (
    <Suspense>
      <GetCertificateContent />
    </Suspense>
  )
}
