import Image from 'next/image'
import React from 'react'

import { IMG, RECEIPT_METRICS } from '@/components/ProofOfWorkPage/data'

const BARCODE_RECTS = [
  [0, 1], [3.3, 1], [6.6, 2], [9.9, 1], [13.2, 2], [16.5, 2], [19.8, 1], [23.1, 3], [26.4, 1],
  [29.7, 2], [33, 1], [36.3, 1], [39.6, 2], [42.9, 2], [46.2, 1], [49.5, 3], [52.8, 1], [56.1, 1],
  [59.4, 3], [62.7, 1], [66, 2], [69.3, 3], [72.6, 3], [75.9, 1], [79.2, 1], [82.5, 2], [85.8, 1],
  [89.1, 3], [92.4, 2], [95.7, 3], [99, 3], [102.3, 3], [105.6, 2], [108.9, 1], [112.2, 3],
  [115.5, 2], [118.8, 2], [122.1, 2], [125.4, 1], [128.7, 1], [132, 2], [135.3, 2], [138.6, 1],
  [141.9, 1], [145.2, 3], [148.5, 2], [151.8, 2], [155.1, 3], [158.4, 2], [161.7, 3], [165, 2],
  [168.3, 3], [171.6, 2], [174.9, 1], [178.2, 1], [181.5, 3], [184.8, 2], [188.1, 3], [191.4, 2],
  [194.7, 2],
]

export function ReceiptHero() {
  return (
    <div className="relative mx-auto w-full max-w-[1000px] px-5 py-[60px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-95">
        <Image
          src={IMG.metricsBg}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 1000px"
          priority
        />
      </div>

      <div
        className="relative z-[2] mx-auto max-w-[400px] rounded-xl px-[30px] py-5 font-mono shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: '#F5F1E8' }}
      >
        <div className="text-center">
          <h2 className="m-0 mb-1 text-xl font-bold tracking-[2px] text-black">AFRICAN BITCOINERS</h2>
          <p className="m-0 mb-2.5 text-center text-xs tracking-[1px] text-[#666]">EST. 2022 - AFRICA</p>
        </div>

        <div className="my-2.5 border-b-2 border-dashed border-[#CCC]" />

        <h3
          className="my-[5px] text-center text-[22px] font-bold tracking-[2px] md:text-[22px]"
          style={{ color: '#FF6600' }}
        >
          PROOF OF WORK
        </h3>

        <div className="my-2.5 border-b-2 border-dashed border-[#CCC]" />

        <div className="my-0.5">
          {RECEIPT_METRICS.map((m) => (
            <div key={m.label} className="flex items-center justify-between text-sm md:text-sm">
              <span className="font-normal text-[#333]">{m.label}</span>
              <span className="text-right font-bold text-black">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="my-2.5 border-b-2 border-dashed border-[#CCC]" />

        <div className="my-[5px] flex items-center justify-between">
          <span className="text-sm font-bold tracking-[1px] text-[#333]">TOTAL IMPACT</span>
          <span className="text-base font-bold" style={{ color: '#FF6600' }}>
            IMMEASURABLE
          </span>
        </div>

        <div className="my-2.5 border-b border-[#CCC]" />

        <div className="py-1 text-center">
          <svg viewBox="0 0 200 30" className="mx-auto mb-2 h-[30px] w-full max-w-[200px]" aria-hidden>
            {BARCODE_RECTS.map(([x, w], i) => (
              <rect key={i} x={x} y={0} width={w} height={30} fill="#333" />
            ))}
          </svg>
          <p className="m-0 text-xs tracking-[1px]" style={{ color: '#FF6600' }}>
            ⚡ VERIFIED ON-CHAIN ⚡
          </p>
        </div>

        <div className="pt-2 text-center">
          <div className="text-xs text-[#999]">✂ -------------------------- ✂</div>
          <p className="m-0 mt-1 text-xs tracking-[1px] text-[#666]">bitcoiners.africa</p>
        </div>
      </div>
    </div>
  )
}
