import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access/adminOnly'
import { anyone } from '../access/anyone'
import { buildAdminTitle } from './QuizQuestions/hooks/buildAdminTitle'
import {
  revalidateQuizQuestions,
  revalidateQuizQuestionsDelete,
} from './QuizQuestions/hooks/revalidateQuizQuestions'

const questionFields = [
  {
    name: 'questionText',
    type: 'textarea' as const,
    required: true,
    label: 'Question / Label',
  },
  {
    name: 'fieldType',
    type: 'select' as const,
    label: 'Field type',
    defaultValue: 'multiple-choice',
    options: [
      { label: 'Multiple choice', value: 'multiple-choice' },
      { label: 'Rating (0–10)', value: 'rating' },
      { label: 'Textarea', value: 'textarea' },
      { label: 'Text input', value: 'text' },
    ],
    admin: {
      description: 'How this field renders on feedback forms. Quizzes use multiple choice.',
    },
  },
  {
    name: 'fieldKey',
    type: 'text' as const,
    label: 'Field key',
    admin: {
      description: 'API field name for feedback submissions (e.g. understandingRating).',
      condition: (_: unknown, siblingData: { fieldType?: string }) =>
        siblingData?.fieldType !== 'multiple-choice' || Boolean(siblingData),
    },
  },
  {
    name: 'options',
    type: 'array' as const,
    label: 'Answer options',
    minRows: 0,
    maxRows: 4,
    admin: {
      condition: (_: unknown, siblingData: { fieldType?: string }) =>
        !siblingData?.fieldType || siblingData.fieldType === 'multiple-choice',
    },
    fields: [
      {
        name: 'label',
        type: 'text' as const,
        required: true,
      },
      {
        name: 'value',
        type: 'text' as const,
        required: true,
        admin: {
          description: "Option key, e.g. 'a', 'b', 'c', 'd'",
        },
      },
      {
        name: 'correct',
        type: 'checkbox' as const,
        label: 'Correct answer',
        defaultValue: false,
      },
    ],
  },
  {
    name: 'explanation',
    type: 'textarea' as const,
    label: 'Explanation',
    admin: {
      description: 'Shown when the user answers incorrectly (quizzes only).',
      condition: (_: unknown, siblingData: { fieldType?: string }) =>
        !siblingData?.fieldType || siblingData.fieldType === 'multiple-choice',
    },
  },
  {
    name: 'sortOrder',
    type: 'number' as const,
    label: 'Sort order',
  },
  {
    name: 'required',
    type: 'checkbox' as const,
    label: 'Required',
    defaultValue: true,
    admin: {
      condition: (_: unknown, siblingData: { fieldType?: string }) =>
        Boolean(siblingData?.fieldType && siblingData.fieldType !== 'multiple-choice'),
    },
  },
  {
    name: 'enabled',
    type: 'checkbox' as const,
    label: 'Enabled',
    defaultValue: true,
  },
]

export const QuizQuestions: CollectionConfig = {
  slug: 'quiz-questions',
  labels: {
    singular: 'Quiz Question Set',
    plural: 'Quiz Questions',
  },
  access: {
    create: adminOnly,
    read: anyone,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    group: 'Course',
    useAsTitle: 'adminTitle',
    defaultColumns: ['quizType', 'day', 'language', 'questionCount'],
    description:
      'Daily and final quiz questions plus feedback form fields. Edits appear on quiz pages within 1 hour (ISR), or immediately after save.',
    listSearchableFields: ['adminTitle', 'quizType', 'language'],
  },
  hooks: {
    beforeChange: [buildAdminTitle],
    afterChange: [revalidateQuizQuestions],
    afterDelete: [revalidateQuizQuestionsDelete],
  },
  fields: [
    {
      name: 'adminTitle',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'questionCount',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'quizType',
      type: 'select',
      required: true,
      options: [
        { label: 'Daily Quiz', value: 'daily' },
        { label: 'Final Quiz', value: 'final' },
        { label: 'Daily Quiz Feedback', value: 'daily-feedback' },
        { label: 'Final Course Feedback', value: 'final-feedback' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'day',
      type: 'number',
      min: 1,
      max: 20,
      admin: {
        position: 'sidebar',
        description: 'Required for daily quizzes (1–20). Leave empty for final quiz and feedback.',
        condition: (_, siblingData) =>
          siblingData?.quizType === 'daily' || siblingData?.quizType === 'daily-feedback',
      },
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enabled',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      admin: {
        initCollapsed: false,
      },
      fields: questionFields,
    },
  ],
}
