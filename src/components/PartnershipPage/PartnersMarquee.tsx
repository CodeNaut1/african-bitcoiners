import React from 'react'

import { PartnersCarouselBlockComponent } from '@/blocks/PartnersCarousel/Component'

// Reuses the shared, CMS-driven Partners Carousel so this page matches the
// homepage treatment (boxed logos, continuous scroll) exactly.
export async function PartnersMarquee() {
  return (
    <PartnersCarouselBlockComponent heading="Our Partners" useGlobalPartners speed="normal" />
  )
}
