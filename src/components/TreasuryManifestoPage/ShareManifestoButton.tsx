'use client'

import React from 'react'

import { LINKS, SHARE } from '@/components/TreasuryManifestoPage/data'

export function ShareManifestoButton() {
  const handleShare = async () => {
    const shareContent = `${SHARE.title}\n\n${SHARE.description}\n\n${LINKS.page}`

    try {
      await navigator.clipboard.writeText(shareContent)

      if (navigator.share) {
        await navigator.share({
          title: SHARE.title,
          text: shareContent,
        })
      } else {
        window.alert('Sharing details and link copied to clipboard.')
      }
    } catch {
      // user cancelled share or clipboard denied
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-block w-full rounded-md border border-[#F45341] bg-white px-[50px] py-[18px] text-[15px] font-semibold tracking-[-0.4px] text-[#F45341] transition-colors hover:bg-[#37312C] hover:text-white sm:w-auto md:px-[110px] md:py-[23px]"
    >
      Share with a Colleague
    </button>
  )
}
