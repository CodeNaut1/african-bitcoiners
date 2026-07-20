type PostCategory = 'weekly-newsletter' | 'saturday-stacker' | 'announcement' | string | null | undefined

export function postPublicPath(category: PostCategory, slug: string): string {
  if (category === 'saturday-stacker') {
    return `/saturday-stacker/${slug}`
  }

  return `/bitcoin-newsletter/${slug}`
}
