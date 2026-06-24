import type { Block } from 'payload'

export const CourseModalBlock: Block = {
  slug: 'courseModal',
  interfaceName: 'CourseModalBlock',
  labels: { singular: 'Course Modal / CTA', plural: 'Course Modal / CTAs' },
  fields: [
    { name: 'triggerLabel', type: 'text', defaultValue: 'Start learning for free ↓' },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary-orange',
      options: [
        { label: 'Primary Orange', value: 'primary-orange' },
        { label: 'White Outline', value: 'white-outline' },
        { label: 'Dark Blue', value: 'dark-blue' },
      ],
    },
    { name: 'emailSignupUrl', type: 'text', admin: { description: 'English email signup URL' } },
    { name: 'emailSignupUrlFr', type: 'text', admin: { description: 'French email signup URL' } },
    { name: 'telegramUrl', type: 'text', admin: { description: 'Telegram group/channel URL' } },
    { name: 'telegramUrlFr', type: 'text', admin: { description: 'French Telegram URL' } },
    { name: 'websiteUrl', type: 'text', defaultValue: 'https://course.bitcoiners.africa' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'inline',
      options: [
        { label: 'Inline (expands below button)', value: 'inline' },
        { label: 'Modal overlay', value: 'modal' },
      ],
    },
  ],
}
