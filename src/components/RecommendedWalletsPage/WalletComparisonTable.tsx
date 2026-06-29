import Image from 'next/image'
import React from 'react'

import { IMG } from '@/components/RecommendedWalletsPage/data'

export function BoolIcon({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-[15px] font-semibold text-[#584538]">{value}</span>
  }
  return (
    <Image
      src={value ? IMG.checkmark : IMG.cancel}
      alt={value ? 'Yes' : 'No'}
      width={value ? 30 : 22}
      height={value ? 30 : 22}
      className="mx-auto"
    />
  )
}

export function InfoTip({ title }: { title: string }) {
  return (
    <abbr title={title} className="ml-1 inline-flex cursor-help no-underline">
      <Image src={IMG.info} alt="" width={17} height={17} aria-hidden />
    </abbr>
  )
}

type Column = { key: string; label: string; tooltip: string }

export function WalletComparisonTable<T extends Record<string, boolean | string>>({
  wallets,
  columns,
  getDescription,
  getLogo,
  getHref,
  preferredWalletHref,
  preferredBadge,
}: {
  wallets: T[]
  columns: Column[]
  getDescription: (wallet: T) => string
  getLogo: (wallet: T) => { src: string; alt: string }
  getHref: (wallet: T) => string
  preferredWalletHref?: string
  preferredBadge?: string
}) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-visible rounded-[10px] border border-black/10 bg-[#FFFDFA] pt-6 lg:block">
        <table className="w-full min-w-[900px] border-collapse text-center">
          <thead>
            <tr>
              <th className="border border-black/10 bg-[#FFFDFA] px-3 py-3 text-sm font-bold text-[#E1640C]">
                Wallet
              </th>
              <th className="border border-black/10 bg-[#FFFDFA] px-3 py-3 text-sm font-bold text-[#E1640C]">
                Why We Recommend
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="border border-black/10 bg-[#FFFDFA] px-2 py-3 text-sm font-bold text-[#E1640C]"
                >
                  {col.label}
                  <InfoTip title={col.tooltip} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => {
              const logo = getLogo(wallet)
              const href = getHref(wallet)
              const isPreferred = preferredBadge && preferredWalletHref === href
              return (
                <tr key={href} className="text-[#384958]">
                  <td className="relative overflow-visible border border-black/10 px-3 py-4 align-middle">
                    {isPreferred && (
                      <div className="pointer-events-none absolute -left-1 -top-10 z-10">
                        <Image
                          src={preferredBadge}
                          alt=""
                          width={158}
                          height={89}
                          className="h-auto w-[130px] md:w-[158px]"
                          aria-hidden
                        />
                      </div>
                    )}
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={200}
                        height={100}
                        className="mx-auto h-auto max-h-[80px] w-auto max-w-[200px]"
                      />
                    </a>
                  </td>
                  <td
                    id="walletsdesc-text"
                    className="border border-black/10 px-4 py-4 text-left text-[15px] font-normal leading-relaxed"
                  >
                    {getDescription(wallet)}
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="border border-black/10 px-2 py-4 align-middle">
                      <BoolIcon value={wallet[col.key] as boolean | string} />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-6 lg:hidden">
        {wallets.map((wallet) => {
          const logo = getLogo(wallet)
          const href = getHref(wallet)
          const isPreferred = preferredBadge && preferredWalletHref === href
          return (
            <div
              key={href}
              className="overflow-hidden rounded-[10px] border border-black/10 bg-[#FFFDFA]"
            >
              <div className="relative border-b border-black/10 px-4 py-5 text-center">
                {isPreferred && (
                  <div className="pointer-events-none absolute -left-1 -top-2 z-10">
                    <Image
                      src={preferredBadge}
                      alt=""
                      width={158}
                      height={89}
                      className="h-auto w-[120px]"
                      aria-hidden
                    />
                  </div>
                )}
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={170}
                    height={85}
                    className="mx-auto h-auto max-h-[70px] w-auto"
                  />
                </a>
              </div>
              <div className="border-b border-black/10 px-4 py-4 text-[15px] leading-relaxed text-[#384958]">
                {getDescription(wallet)}
              </div>
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="grid grid-cols-2 border-b border-black/10 last:border-b-0"
                >
                  <div className="border-r border-black/10 px-4 py-3 text-sm font-semibold text-[#384958]">
                    <abbr title={col.tooltip} className="no-underline">
                      {col.label}
                    </abbr>
                  </div>
                  <div className="flex items-center justify-center px-4 py-3">
                    <BoolIcon value={wallet[col.key] as boolean | string} />
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}
