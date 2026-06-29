import React from 'react'

import { PAGE_DATA } from '@/components/JuniorPhpCoderJobPage/data'
import { StaleJobPostingPage } from '@/components/StaleJobPostingPage'

export function JuniorPhpCoderJobPage() {
  return <StaleJobPostingPage data={PAGE_DATA} />
}
