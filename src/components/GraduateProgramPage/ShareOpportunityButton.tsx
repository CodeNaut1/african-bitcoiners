'use client'

import React, { useState } from 'react'

export function ShareOpportunityButton() {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href
    const title = 'African Bitcoiners Graduate Program'

    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // user cancelled share sheet
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-block rounded-[5px] border px-[55px] py-[25px] text-[18px] font-bold tracking-[-0.4px] transition-colors hover:bg-[#F27202] hover:text-white max-md:px-[50px] max-md:py-[25px] max-md:text-base"
      style={{ borderColor: '#F27202', color: '#384958' }}
    >
      {copied ? 'Link copied!' : 'Share this opportunity'}
    </button>
  )
}
