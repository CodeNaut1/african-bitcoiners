import React, { Fragment } from 'react'

// STEP 8 — Core blocks
import { HeroBlockComponent } from './Hero/Component'
import { CardGridBlockComponent } from './CardGrid/Component'
import { RichContentBlockComponent } from './RichContent/Component'
import { CTABannerBlockComponent } from './CTA/Component'
import { StatsBarBlockComponent } from './StatsBar/Component'
import { PartnersCarouselBlockComponent } from './PartnersCarousel/Component'
import { TestimonialsCarouselBlockComponent } from './TestimonialsCarousel/Component'
import { ProductsGridBlockComponent } from './ProductsGrid/Component'
import { NewsletterSignupBlockComponent } from './NewsletterSignup/Component'
import { SupportSectionBlockComponent } from './SupportSection/Component'
import { FormEmbedBlockComponent } from './FormEmbed/Component'

// STEP 9 — Advanced blocks
import { PricingTiersBlockComponent } from './PricingTiers/Component'
import { ProcessStepsBlockComponent } from './ProcessSteps/Component'
import { PeopleShowcaseBlockComponent } from './PeopleShowcase/Component'
import { ReceiptWidgetBlockComponent } from './ReceiptWidget/Component'
import { MissionStatementsBlockComponent } from './MissionStatements/Component'
import { FlagsCarouselBlockComponent } from './FlagsCarousel/Component'
import { MiningDirectoryBlockComponent } from './MiningDirectory/Component'
import { FeedbackMatrixBlockComponent } from './FeedbackMatrix/Component'
import { CourseModalBlockComponent } from './CourseModal/Component'
import { InflationSimulatorBlockComponent } from './InflationSimulator/Component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  // STEP 8
  hero: HeroBlockComponent,
  cardGrid: CardGridBlockComponent,
  richContent: RichContentBlockComponent,
  ctaBanner: CTABannerBlockComponent,
  statsBar: StatsBarBlockComponent,
  partnersCarousel: PartnersCarouselBlockComponent,
  testimonialsCarousel: TestimonialsCarouselBlockComponent,
  productsGrid: ProductsGridBlockComponent,
  newsletterSignup: NewsletterSignupBlockComponent,
  supportSection: SupportSectionBlockComponent,
  formEmbed: FormEmbedBlockComponent,
  // STEP 9
  pricingTiers: PricingTiersBlockComponent,
  processSteps: ProcessStepsBlockComponent,
  peopleShowcase: PeopleShowcaseBlockComponent,
  receiptWidget: ReceiptWidgetBlockComponent,
  missionStatements: MissionStatementsBlockComponent,
  flagsCarousel: FlagsCarouselBlockComponent,
  miningDirectory: MiningDirectoryBlockComponent,
  feedbackMatrix: FeedbackMatrixBlockComponent,
  courseModal: CourseModalBlockComponent,
  inflationSimulator: InflationSimulatorBlockComponent,
}

export const RenderBlocks: React.FC<{ blocks: any[] }> = ({ blocks }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        const Block = blockComponents[blockType]
        if (!Block) return null
        return (
          <div key={index}>
            <Block {...block} />
          </div>
        )
      })}
    </Fragment>
  )
}
