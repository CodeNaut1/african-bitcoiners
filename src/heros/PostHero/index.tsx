// Placeholder — will be replaced with the AB newsletter post hero in Step 13
import React from 'react'
import type { Post } from '@/payload-types'

export const PostHero: React.FC<{ post: Post }> = ({ post }) => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold">{post.title}</h1>
  </div>
)
