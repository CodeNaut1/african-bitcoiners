import type { Block } from 'payload'

export const ProductsGridBlock: Block = {
  slug: 'productsGrid',
  interfaceName: 'ProductsGridBlock',
  labels: { singular: 'Products Grid', plural: 'Products Grids' },
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
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'products',
      type: 'array',
      required: true,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'tagline', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'mockupImage', type: 'upload', relationTo: 'media' },
        { name: 'badge', type: 'text', admin: { description: 'e.g. "Free", "New", "Coming Soon"' } },
        { name: 'primaryButtonLabel', type: 'text' },
        { name: 'primaryButtonUrl', type: 'text' },
        { name: 'secondaryButtonLabel', type: 'text' },
        { name: 'secondaryButtonUrl', type: 'text' },
        {
          name: 'features',
          type: 'array',
          label: 'Feature Bullet Points',
          fields: [
            { name: 'feature', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
