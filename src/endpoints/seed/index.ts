import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

const collections: CollectionSlug[] = ['media', 'pages', 'posts', 'search']

const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info('— Clearing collections and globals...')

  await Promise.all(
    globals.map((global) =>
      (payload.updateGlobal as any)({
        slug: global,
        data: {},
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection]?.config?.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info('— Seeding admin user...')

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'seed@africanbitcoiners.com' } },
  })

  payload.logger.info('— Seeding home page...')

  await payload.create({
    collection: 'pages',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      content: [],
    },
  })

  payload.logger.info('— Seeding sample post...')

  await (payload.create as any)({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Welcome to African Bitcoiners',
      slug: 'welcome-to-african-bitcoiners',
      _status: 'published',
      excerpt: 'African Bitcoiners is a platform dedicated to Bitcoin education across Africa.',
      category: 'announcement',
    },
  })

  payload.logger.info('— Seeding globals...')

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { label: 'Posts', type: 'link', url: '/posts' },
          { label: 'Admin', type: 'link', url: '/admin' },
        ],
      },
    }),
    (payload.updateGlobal as any)({
      slug: 'footer',
      data: {
        description: 'African Bitcoiners',
        quickLinks: [{ label: 'Posts', url: '/posts' }],
        utilityLinks: [{ label: 'Admin', url: '/admin' }],
        copyrightText: '© 2025 African Bitcoiners',
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}
