'use client'

import React, { useState } from 'react'

import { FAQ_ITEMS } from '@/components/FaqsPage/data'
import { cn } from '@/utilities/ui'

function AccordionIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none" aria-hidden>
        <path
          d="M8 14H16M22 14C22 19.5228 17.5228 24 12 24C6.47715 24 2 19.5228 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14Z"
          stroke="#98A2B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none" aria-hidden>
      <path
        d="M12 10V18M8 14H16M22 14C22 19.5228 17.5228 24 12 24C6.47715 24 2 19.5228 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14Z"
        stroke="#98A2B3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="flex flex-col">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`

        return (
          <div
            key={item.question}
            className="mb-5 overflow-hidden rounded-[15px] border border-black/[0.15] bg-white last:mb-0"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
            >
              <span className="font-sans text-base font-bold leading-[22px] text-[#101828] md:text-lg">
                {item.question}
              </span>
              <span className="shrink-0">
                <AccordionIcon open={isOpen} />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn('px-5 pb-5 md:px-6 md:pb-6', !isOpen && 'hidden')}
            >
              <div
                className="faq-answer font-sans text-[15px] leading-5 text-[#475467] md:text-base md:leading-[22px] [&_a]:font-semibold [&_a]:text-brand-primary [&_a]:no-underline hover:[&_a]:underline [&_li]:mb-2 [&_li]:leading-[1.5] [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-[#101828] [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: item.answerHtml }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
