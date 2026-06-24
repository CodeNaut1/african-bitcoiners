import type { Block } from 'payload'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const TestimonialsCarouselBlock: Block = {
  slug: 'testimonialsCarousel',
  interfaceName: 'TestimonialsCarouselBlock',
  labels: { singular: 'Testimonials Carousel', plural: 'Testimonials Carousels' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'useGlobalTestimonials',
      type: 'checkbox',
      defaultValue: true,
      label: 'Use all Testimonials from Testimonials collection',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Inline Testimonials (when not using global)',
      admin: {
        condition: (_, siblingData) => !siblingData?.useGlobalTestimonials,
      },
      fields: [
        {
          name: 'text',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Quote / Testimonial Text',
          required: true,
        },
        { name: 'name', type: 'text', required: true, label: 'Person Name' },
        { name: 'role', type: 'text', label: 'Role / Title' },
        { name: 'avatarColor', type: 'text', label: 'Avatar Background Color (hex)', defaultValue: '#FD5A47' },
        { name: 'initial', type: 'text', label: 'Avatar Initial', admin: { description: '1-2 characters' } },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'White', value: 'white' },
        { label: 'Dark Blue', value: 'dark' },
      ],
    },
  ],
}
