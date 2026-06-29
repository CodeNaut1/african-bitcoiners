import React from 'react'

import { PAGE_DATA } from '@/components/JuniorCopywriterJobPage/data'
import { StaleJobPostingPage } from '@/components/StaleJobPostingPage'

export function JuniorCopywriterJobPage() {
  return <StaleJobPostingPage data={PAGE_DATA} />
}
