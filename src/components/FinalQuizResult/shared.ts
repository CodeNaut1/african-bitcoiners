const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bitcoiners.africa'
const shareUrl = `${siteUrl}/learn-bitcoin/free-bitcoin-course`

export const COURSE_SHARE_URL = shareUrl

export function getCourseShareUrl(): string {
  return shareUrl
}

export function buildShareLinks() {
  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      'Looking for a fantastic and easy way to learn about Bitcoin? Then check out African Bitcoiners Bitcoin for Beginners course delivered conveniently to you daily via email: ' +
        shareUrl,
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
      'I just passed the @afribitcoiners Bitcoin for Beginners course delivered via email. Click on the link to check it out:',
    )}&hashtags=${encodeURIComponent('Bitcoin,course')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(
      'Bitcoin for Beginners Course — African Bitcoiners',
    )}&summary=${encodeURIComponent(
      'Looking for a fantastic way to learn about Bitcoin? Check out @afribitcoiners Bitcoin for Beginners course delivered via email.',
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
      'Check out the Bitcoin for Beginners course from African Bitcoiners:',
    )}`,
  }
}

export function buildSharePlatforms() {
  const links = buildShareLinks()
  return [
    { id: 'twitter', label: 'Share on X', href: links.twitter, bg: '#000000' },
    { id: 'linkedin', label: 'Share on LinkedIn', href: links.linkedin, bg: '#0A66C2' },
    { id: 'facebook', label: 'Share on Facebook', href: links.facebook, bg: '#1877F2' },
    { id: 'whatsapp', label: 'Share on WhatsApp', href: links.whatsapp, bg: '#25D366' },
    { id: 'telegram', label: 'Share on Telegram', href: links.telegram, bg: '#0088CC' },
  ] as const
}

export function certificateHref(email?: string, uniqueId?: string): string {
  const params = new URLSearchParams()
  if (email) params.set('email', email)
  if (uniqueId) params.set('uniqueId', uniqueId)
  const query = params.toString()
  return query ? `/get-certificate?${query}` : '/get-certificate'
}
