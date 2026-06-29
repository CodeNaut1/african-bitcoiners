import React, { Suspense } from 'react'

import { GetCertificateTgContent } from '@/components/GetCertificateTgPage/content'

export function GetCertificateTgPage() {
  return (
    <Suspense>
      <GetCertificateTgContent />
    </Suspense>
  )
}
