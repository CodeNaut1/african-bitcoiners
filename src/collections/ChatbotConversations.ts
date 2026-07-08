import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

export const ChatbotConversations: CollectionConfig = {
  slug: 'chatbot-conversations',
  access: {
    create: () => false,
    read: adminOnly,
    update: () => false,
    delete: adminOnly,
  },
  admin: {
    defaultColumns: ['conversationId', 'messageCount', 'startedAt', 'lastMessageAt'],
    useAsTitle: 'conversationId',
    description: 'AI chatbot conversation logs (created via the public chat API).',
  },
  fields: [
    {
      name: 'conversationId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'messages',
      type: 'array',
      fields: [
        {
          name: 'role',
          type: 'select',
          required: true,
          options: [
            { label: 'User', value: 'user' },
            { label: 'Assistant', value: 'assistant' },
          ],
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'userIp',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'startedAt',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'lastMessageAt',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'messageCount',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'topicTags',
      type: 'array',
      label: 'Topic Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
