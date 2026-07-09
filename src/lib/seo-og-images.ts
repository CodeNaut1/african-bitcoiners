import { CARDS as earnCards } from '@/components/EarnBitcoinPage/data'
import { CARDS as learnCards } from '@/components/LearnBitcoinPage/data'
import { CARDS as saveCards } from '@/components/SaveBitcoinPage/data'
import { CARDS as spendCards } from '@/components/SpendBitcoinPage/data'
import { CARDS as communityCards } from '@/components/CommunityPage/data'
import { CARDS as outreachCards } from '@/components/CommunityOutreachPage/data'
import { IMG as whyPrivateImg } from '@/components/WhyWeArePrivatePage/data'
import { TEAM } from '@/components/OurTeamPage/data'
import { IMG as nostrImg } from '@/components/NostrGuidePage/data'
import { IMG as herImg } from '@/components/HerPage/data'
import { IMG as buyPrivatelyImg } from '@/components/BuyBitcoinPrivatelyPage/data'
import { IMG as millionSatImg } from '@/components/MillionSatChallengePage/data'
import { IMG as coldStorageImg } from '@/components/ColdStoragePage/data'
import { IMG as recommendedWalletsImg } from '@/components/RecommendedWalletsPage/data'
import { IMG as communityBuildersImg } from '@/components/CommunityBuildersPage/data'
import { IMG as btrustImg } from '@/components/BtrustPartnersPage/data'
import { IMG as donationImg } from '@/components/DonationConfirmationPage/data'
import { IMG as quizPassedImg } from '@/components/FinalQuizPassedPage/data'
import { IMG as quizFailedImg } from '@/components/FinalQuizFailedPage/data'

export const R2_CDN = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const DEFAULT_OG_IMAGE = `${R2_CDN}/uploads/2024/10/African-Bitcoiners-official_logo-1024x1024.png`
export const COURSE_OG_IMAGE = `${R2_CDN}/uploads/2024/11/Learn-Bitcoin-Bitcoin-for-Beginners-Course.png`

function cardsToOgMap(cards: { href: string; image: string }[]): Record<string, string> {
  return Object.fromEntries(cards.map((card) => [card.href.replace(/^\//, ''), card.image]))
}

const CARD_OG_IMAGES: Record<string, string> = {
  ...cardsToOgMap(learnCards),
  ...cardsToOgMap(earnCards),
  ...cardsToOgMap(saveCards),
  ...cardsToOgMap(spendCards),
  ...Object.fromEntries(
    communityCards
      .filter((card): card is typeof card & { href: string } => Boolean(card.href))
      .map((card) => [card.href.replace(/^\//, ''), card.image]),
  ),
  ...cardsToOgMap(outreachCards),
}

const SLUG_OG_IMAGES: Record<string, string> = {
  'about-us/our-team': TEAM[0]!.image,
  'about-us/why-we-are-private': whyPrivateImg.heroBg,
  'step-by-step-guide-for-nostr': nostrImg.heroBg,
  her: herImg.heroBg,
  'where-to-buy-bitcoin-privately-in-africa': buyPrivatelyImg.hero,
  'save-bitcoin/million-sat-challenge': millionSatImg.heroBanner,
  'save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free': coldStorageImg.hero,
  'save-bitcoin/recommended-bitcoin-and-lightning-wallets': recommendedWalletsImg.hero,
  'african-bitcoiners-community-builders': communityBuildersImg.hero,
  'btrust-partners-with-africa-freee-routing': btrustImg.logo,
  'donation-confirmation': donationImg.celebrate,
  'final-quiz-passed': quizPassedImg.celebrate,
  'final-quiz-passed-tg': quizPassedImg.celebrate,
  'final-quiz-failed': quizFailedImg.unhappy,
  'final-quiz-failed-tg': quizFailedImg.unhappy,
  home: DEFAULT_OG_IMAGE,
  'learn-bitcoin': COURSE_OG_IMAGE,
  'earn-bitcoin': earnCards[0]!.image,
  'save-bitcoin': saveCards[0]!.image,
  'spend-bitcoin': spendCards[0]!.image,
  community: communityCards[0]!.image,
  'bitcoin-newsletter': `${R2_CDN}/uploads/2022/08/bitcoin-1-300x300.png`,
}

const QUIZ_SLUG_PREFIXES = ['final-quiz', 'get-certificate']

export function resolveOgImage(slug: string, explicit?: string | null): string {
  if (explicit) return explicit
  if (SLUG_OG_IMAGES[slug]) return SLUG_OG_IMAGES[slug]!
  if (CARD_OG_IMAGES[slug]) return CARD_OG_IMAGES[slug]!
  if (QUIZ_SLUG_PREFIXES.some((prefix) => slug === prefix || slug.startsWith(`${prefix}`))) {
    return COURSE_OG_IMAGE
  }
  return DEFAULT_OG_IMAGE
}
