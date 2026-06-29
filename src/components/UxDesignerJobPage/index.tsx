import React from 'react'

import { StaleJobPostingPage } from '@/components/StaleJobPostingPage'
import { PAGE_DATA } from '@/components/UxDesignerJobPage/data'

export function UxDesignerJobPage() {
  return <StaleJobPostingPage data={PAGE_DATA} />
}
