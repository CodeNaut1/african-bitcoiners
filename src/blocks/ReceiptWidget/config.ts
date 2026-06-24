import type { Block } from 'payload'

export const ReceiptWidgetBlock: Block = {
  slug: 'receiptWidget',
  interfaceName: 'ReceiptWidgetBlock',
  labels: { singular: 'Receipt Widget', plural: 'Receipt Widgets' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Proof of Work' },
    {
      name: 'metrics',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'totalLabel', type: 'text', defaultValue: 'TOTAL IMPACT' },
    { name: 'totalValue', type: 'text', defaultValue: '∞ Sats' },
    {
      name: 'footerText',
      type: 'text',
      defaultValue: 'Thank you for being part of the movement.',
    },
  ],
}
