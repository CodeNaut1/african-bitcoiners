export type StaleJobPostingData = {
  heroImage: string
  heroImageWidth: number
  heroImageHeight: number
  job: {
    title: string
    type: string
    location: string
    roleSlug: string
  }
  requirements: readonly string[]
  copy: {
    heroTitle: string
    heroSubtitle: string
    applyIntro: string
    applyHeading: string
  }
  seo: {
    title: string
    description: string
  }
}
