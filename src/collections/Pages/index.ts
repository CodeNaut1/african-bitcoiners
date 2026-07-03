import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOrEditor } from '../../access/adminOrEditor'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { guardSystemPages } from './hooks/guardSystemPages'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { HeroBlock } from '@/blocks/Hero/config'
import { CardGridBlock } from '@/blocks/CardGrid/config'
import { RichContentBlock } from '@/blocks/RichContent/config'
import { CTABlock } from '@/blocks/CTA/config'
import { StatsBarBlock } from '@/blocks/StatsBar/config'
import { PartnersCarouselBlock } from '@/blocks/PartnersCarousel/config'
import { TestimonialsCarouselBlock } from '@/blocks/TestimonialsCarousel/config'
import { ProductsGridBlock } from '@/blocks/ProductsGrid/config'
import { NewsletterSignupBlock } from '@/blocks/NewsletterSignup/config'
import { SupportSectionBlock } from '@/blocks/SupportSection/config'
import { FormEmbedBlock } from '@/blocks/FormEmbed/config'
import { PricingTiersBlock } from '@/blocks/PricingTiers/config'
import { ProcessStepsBlock } from '@/blocks/ProcessSteps/config'
import { PeopleShowcaseBlock } from '@/blocks/PeopleShowcase/config'
import { ReceiptWidgetBlock } from '@/blocks/ReceiptWidget/config'
import { MissionStatementsBlock } from '@/blocks/MissionStatements/config'
import { FlagsCarouselBlock } from '@/blocks/FlagsCarousel/config'
import { MiningDirectoryBlock } from '@/blocks/MiningDirectory/config'
import { FeedbackMatrixBlock } from '@/blocks/FeedbackMatrix/config'
import { CourseModalBlock } from '@/blocks/CourseModal/config'
import { InflationSimulatorBlock } from '@/blocks/InflationSimulator/config'

const isSystemPage = (data?: { template?: string | null }) => data?.template === 'system'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: authenticatedOrPublished,
    update: adminOrEditor,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'template', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug, collection: 'pages', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'pages', req }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'systemPageNotice',
      type: 'ui',
      admin: {
        condition: (data) => data?.template === 'system',
        components: {
          Field: '@/components/admin/SystemPageNotice#default',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        HeroBlock,
        CardGridBlock,
        RichContentBlock,
        CTABlock,
        StatsBarBlock,
        PartnersCarouselBlock,
        TestimonialsCarouselBlock,
        ProductsGridBlock,
        NewsletterSignupBlock,
        SupportSectionBlock,
        FormEmbedBlock,
        // STEP 9
        PricingTiersBlock,
        ProcessStepsBlock,
        PeopleShowcaseBlock,
        ReceiptWidgetBlock,
        MissionStatementsBlock,
        FlagsCarouselBlock,
        MiningDirectoryBlock,
        FeedbackMatrixBlock,
        CourseModalBlock,
        InflationSimulatorBlock,
      ],
      admin: {
        initCollapsed: true,
        description: 'Page builder blocks — add, reorder, and configure sections here.',
        condition: (data) => !isSystemPage(data),
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      admin: {
        condition: (data) => !isSystemPage(data),
      },
      fields: [
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({ hasGenerateFn: true }),
        MetaDescriptionField({}),
        MetaImageField({ relationTo: 'media' }),
        PreviewField({
          hasGenerateFn: true,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
        condition: (data) => !isSystemPage(data),
      },
    },
    {
      name: 'template',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Section Landing', value: 'section-landing' },
        { label: 'Course', value: 'course' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Bounty', value: 'bounty' },
        { label: 'Mining', value: 'mining' },
        { label: 'MIAB', value: 'miab' },
        { label: 'Proof of Work', value: 'proof-of-work' },
        { label: 'System', value: 'system' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'System pages are rendered by application code and cannot be edited in the CMS.',
      },
    },
    slugField({
      // Allow forward slashes so multi-segment paths like "learn-bitcoin/free-bitcoin-course"
      // are stored verbatim as the slug (not stripped to "learn-bitcoinfree-bitcoin-course").
      slugify: ({ valueToSlugify }: { data: any; req: any; valueToSlugify?: any }) =>
        ((valueToSlugify as string) ?? '')
          .trim()
          .replace(/ /g, '-')
          .replace(/[^\w/-]+/g, '')
          .toLowerCase(),
    }),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt, guardSystemPages],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
