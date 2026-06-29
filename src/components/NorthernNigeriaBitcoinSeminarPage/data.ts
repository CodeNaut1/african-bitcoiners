const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2025/02/Northern-Nigeria-awareness-1.png`,
  whyParticipate: `${R2}/uploads/2025/02/Why-Participate-in-Northern-Nigerian-Bitcoin-Seminar.png`,
  whoShouldAttend: `${R2}/uploads/2025/02/Who-should-attend-the-Northern-Nigerian-Bitcoin-Seminar.png`,
  btrust: `${R2}/uploads/2025/04/Btrust@3x-white-1024x434-1.webp`,
  ipaybtc: `${R2}/uploads/2025/04/iPayBTC_Logo_Blue-1024x278.png`,
  africaFreeRouting: `${R2}/uploads/2025/04/Africa_Free_Routing_image-removebg-preview.png`,
}

export const LINKS = {
  btrust: 'https://www.btrust.tech/',
  ipaybtc: 'https://ipaybtc.app/',
  africaFreeRouting: 'https://freerouting.africa/',
  bootcamp: 'https://freerouting.africa/kaduna-bootcamp/',
}

export const META_ITEMS = [
  { label: '10th May 2025', icon: 'calendar' as const },
  { label: '9:30 AM - 2:00 PM', icon: 'clock' as const },
  { label: 'Almara Hub, No. 22b Kanta Road, Kaduna', icon: 'pin' as const },
]

export const WHY_PARTICIPATE = [
  {
    title: 'Deepen Your Understanding:',
    text: 'Engage in educational sessions tailored for beginners to experts, covering Bitcoin fundamentals and its transformative potential in Nigeria.',
  },
  {
    title: 'Hands-On Experience:',
    text: 'The 4-day Bootcamp offers intensive workshops, coding sessions, and real-world scenarios to master Bitcoin and Lightning technology.',
  },
  {
    title: 'Build Community:',
    text: 'Connect with peers, mentors, and Bitcoin enthusiasts to foster a supportive network that will drive Bitcoin adoption in educational institutions.',
  },
  {
    title: 'Empowerment:',
    text: 'Equip yourself with the skills to become a Bitcoin advocate, influencing your campus and community towards financial empowerment.',
  },
]

export const AUDIENCE = [
  {
    title: 'Students',
    description: 'Those eager to learn about decentralized finance and how it can impact their future.',
    icon: 'briefcase' as const,
  },
  {
    title: 'Professionals',
    description:
      'Looking to integrate or understand Bitcoin in their field, particularly in finance, tech, or economics.',
    icon: 'briefcase' as const,
  },
  {
    title: 'Tech Enthusiasts',
    description:
      "Interested in blockchain technology, especially those fascinated by the Lightning Network's potential.",
    icon: 'code' as const,
  },
  {
    title: 'Educators',
    description: 'Those eager to learn about decentralized finance and how it can impact their future.',
    icon: 'book' as const,
  },
]

export const HIGHLIGHT_ROWS: { label: string; align: 'left' | 'center' | 'right' }[][] = [
  [
    { label: 'Panel Discussions', align: 'right' },
    { label: 'Bitcoin Fundamentals', align: 'center' },
    { label: 'Raffle and Giveaways', align: 'left' },
  ],
  [
    { label: 'Refreshments & Bitcoin Merchandise', align: 'right' },
    { label: 'Bitcoin Fundamentals', align: 'right' },
    { label: 'Fireside Chats', align: 'center' },
  ],
]

export const SEO = {
  title: 'Northern Nigeria Bitcoin Seminar - African Bitcoiners',
  description:
    'A comprehensive immersion into Bitcoin technologies, featuring a community meetup and hands-on lightning network development bootcamp in Kaduna.',
}
