import React from 'react'

import { LINKS } from '@/components/Top21AfricanBitcoinCountriesPage/data'
import type { CountryDetail } from '@/components/Top21AfricanBitcoinCountriesPage/data'

const HEADING = '#384958'
const BODY = '#384958'
const CARD_BG = '#FEF6EB'

function GlobeLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none" aria-hidden>
      <circle cx="21" cy="21" r="21" fill="#FFB061" fillOpacity="0.3" />
      <path
        d="M21.0002 10.7227C15.36 10.7227 10.772 15.3114 10.772 20.9507C10.772 26.5904 15.3602 31.1787 21.0002 31.1787C26.64 31.1787 31.228 26.5902 31.228 20.9507C31.2282 15.3114 26.64 10.7227 21.0002 10.7227ZM28.951 25.8422H26.0995C26.499 24.5177 26.7377 23.0104 26.775 21.3954H30.3272C30.2539 22.9705 29.7802 24.501 28.951 25.8422ZM11.6727 21.3954H15.2252C15.2625 23.0104 15.5015 24.5177 15.9007 25.8422H13.0492C12.22 24.5009 11.7463 22.9705 11.6727 21.3954ZM13.0492 16.0589H15.9007C15.5015 17.3834 15.2625 18.8907 15.2252 20.5057H11.6727C11.7463 18.9305 12.22 17.4001 13.0492 16.0589ZM21.4447 15.1694V11.6537C22.7877 11.8974 23.9922 13.2294 24.8082 15.1694H21.4447ZM25.141 16.0589C25.5747 17.3719 25.8437 18.8924 25.8857 20.5057H21.4447V16.0589H25.141ZM20.5552 11.6539V15.1694H17.1922C18.008 13.2299 19.2125 11.8979 20.5552 11.6539ZM20.5552 16.0589V20.5057H16.1147C16.1567 18.8924 16.4255 17.3719 16.8595 16.0589H20.5552ZM16.1147 21.3954H20.5552V25.8422H16.8595C16.4255 24.5292 16.1565 23.0087 16.1147 21.3954ZM20.5552 26.7319V30.2469C19.2125 30.0029 18.008 28.6714 17.1922 26.7319H20.5552ZM21.4447 30.2469V26.7319H24.8082C23.9922 28.6714 22.7875 30.0034 21.4447 30.2469ZM21.4447 25.8422V21.3954H25.886C25.844 23.0087 25.575 24.5292 25.1412 25.8422H21.4447ZM26.775 20.5057C26.7377 18.8907 26.499 17.3834 26.0995 16.0589H28.951C29.7804 17.4 30.2542 18.9305 30.3275 20.5057H26.775ZM28.326 15.1694H25.797C25.3135 13.9014 24.6717 12.8462 23.9182 12.0812C25.675 12.6604 27.202 13.7479 28.326 15.1694ZM18.0825 12.0812C17.329 12.8462 16.687 13.9012 16.2035 15.1694H13.6742C14.7982 13.7479 16.3255 12.6604 18.0825 12.0812ZM13.6742 26.7319H16.2035C16.6867 27.9997 17.3285 29.0547 18.0817 29.8197C16.3423 29.2434 14.81 28.1699 13.6742 26.7319ZM23.9187 29.8194C24.672 29.0544 25.3137 27.9997 25.797 26.7317H28.326C27.1905 28.1697 25.6582 29.2433 23.9187 29.8194Z"
        fill="black"
      />
    </svg>
  )
}

type Props = {
  country: CountryDetail
}

export function CountryCard({ country }: Props) {
  return (
    <article className="flex h-full flex-col px-5 py-6 md:px-6 md:py-7" style={{ backgroundColor: CARD_BG }}>
      <h2 className="font-heading text-lg font-bold tracking-[-0.4px] md:text-xl" style={{ color: HEADING }}>
        {country.cardTitle}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed tracking-[-0.2px] md:text-base" style={{ color: BODY }}>
        {country.description}
      </p>
      <div className="mt-4">
        <a
          href={LINKS.directory}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Explore Bitcoin in ${country.cardTitle}`}
          className="inline-block transition-opacity hover:opacity-80"
        >
          <GlobeLinkIcon />
        </a>
      </div>
    </article>
  )
}
