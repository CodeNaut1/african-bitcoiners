const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2024/06/African-Bitcoiners_Contact-Us-2.png`,
  nostr: `${R2}/uploads/2025/02/nostr-logo-purple-trasparent.svg`,
} as const

export const COPY = {
  heroTitle: 'Connect With Us',
  heroBody:
    'Whether you have a suggestion for us, a partnership idea or to report a problem, we want to hear from you. Please fill the form to reach out to us through email or send us a message on these social media channels.',
  cardTitle: 'Get In Touch',
} as const

export const SOCIAL = [
  { label: 'X', href: 'https://twitter.com/afribitcoiners', icon: 'x' as const },
  { label: 'Instagram', href: 'https://www.instagram.com/africanbitcoiners/', icon: 'instagram' as const },
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/profile.php?id=100083919610982',
    icon: 'facebook' as const,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/african-bitcoiners-3453a4246/',
    icon: 'linkedin' as const,
  },
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/LeBd3vy2Ypb72dpM9eHUv8', icon: 'whatsapp' as const },
  { label: 'Discord', href: 'https://discord.com/invite/wcsfGRs3mt', icon: 'discord' as const },
  { label: 'Telegram', href: 'https://t.me/+78udoEKLAw0wMzM0', icon: 'telegram' as const },
  { label: 'Nostr', href: 'https://primal.net/africanbitcoiners', icon: 'nostr' as const },
] as const
