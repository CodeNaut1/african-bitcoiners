'use client'

import { useEffect } from 'react'

export function HideGlobalHeader() {
  useEffect(() => {
    document.body.classList.add('academie-hide-global-header')
    return () => document.body.classList.remove('academie-hide-global-header')
  }, [])
  return null
}
