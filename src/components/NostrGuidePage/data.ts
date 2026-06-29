const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2023/07/African-Bitcoiners-Nostr-setup-guide-banner-1.png`,
}

export const LINKS = {
  relays: 'https://nostr.watch/relays/find',
  moreClients: 'https://nostr.com/clients',
  nostrProfile: 'https://primal.net/africanbitcoiners',
  millionSatChallenge: '/save-bitcoin/million-sat-challenge',
}

export const PUBLIC_KEY = 'npub1q7qtx2k5qevch38nk7wq02gqvwkxldscu6fp293gav4vl7f5k52s4eq5kj'

export type TermEntry = {
  title: string
  description: string
  link?: { label: string; href: string }
}

export type ClientLink = { name: string; href: string }

export const INTRO = [
  'Social media has become a dominant channel for global information flow but suffers from flaws, including exploiting attention for ad sales, deceptive addiction techniques, secretive content algorithms that you can\'t inspect or change, controlling participation and censorship, and being plagued by spam and bots.',
  'Nostr is a special kind of social media that is decentralized, meaning it doesn\'t rely on a single central server to work. Instead, it uses a system called relays, allowing people to send and receive messages without relying on a central authority. The name "Nostr" stands for "Notes and Other Stuff Transmitted by Relay."',
  'The main goal of Nostr is to create a platform where communication and the sharing of content are open and resistant to censorship. This means that posts and messages on Nostr cannot easily be blocked or taken down by a central authority.',
  'In this guide, we\'ll show you how to set up Nostr on three different platforms: the web, Android devices, and iOS devices. But before we get started, let\'s learn some important terms related to Nostr.',
]

export const TERMS: TermEntry[] = [
  {
    title: 'Relay',
    description:
      'Relay is a key part of Nostr protocol, enabling clients to send, receive, and store text messages. With Nostr, users can connect to multiple relays, ensuring that even if some go offline, their posts remain retrievable.',
    link: { label: 'Here is a list of relays you can connect to', href: LINKS.relays },
  },
  {
    title: 'Client',
    description:
      'A client in Nostr refers to the application or software that provides users with the interface to create profiles, send messages, and engage with the Nostr community. Clients can be web-based, mobile (Android and iOS), or desktop applications.',
  },
  {
    title: 'Openness',
    description:
      'Nostr is built on open and decentralized protocols, allowing anyone to join and freely build apps using the protocol. It promotes and empowers freedom of speech, ensuring content remains free from centralized control.',
  },
  {
    title: 'Censorship Resistance',
    description:
      'Nostr aims to create a censorship-resistant social network, meaning it is designed to prevent or minimize the ability of any individual or entity to censor or control the content shared on the platform.',
  },
  {
    title: 'Cryptographic Validation',
    description:
      "Nostr uses cryptographic techniques to validate message authenticity and integrity. Messages are signed with the sender's private key, enabling recipients to verify sender's identity and message integrity.",
  },
  {
    title: 'Interoperability',
    description:
      'Nostr promotes interoperability, enabling seamless user migration between Nostr-based apps. Users switch from one Nostr app to another without losing identity, network, connections and content.',
  },
  {
    title: 'Bitcoin Lightning Payments (zaps)',
    description:
      'Nostr supports Bitcoin lightning payments, which enable fast and global transactions using the Bitcoin network. Users can make lightning payments, referred to as "zaps," within the Nostr ecosystem.',
  },
  {
    title: 'Global Permissionless Payments',
    description:
      'Nostr supports Bitcoin lightning payments, enabling fast and global transactions without relying on traditional financial intermediaries, ensuring a seamless and efficient global payment experience.',
  },
]

export const WEB_CLIENTS: ClientLink[] = [
  { name: 'Iris', href: 'https://iris.to/' },
  { name: 'Snort', href: 'https://snort.social/login' },
  { name: 'Coracle', href: 'https://coracle.social/login' },
  { name: 'Nostrgram', href: 'https://nostrgram.co/' },
]

export const ANDROID_CLIENTS: ClientLink[] = [
  { name: 'Plebstr', href: 'https://play.google.com/store/apps/details?id=com.plebstr.client' },
  { name: 'Nostros', href: 'https://github.com/KoalaSat/nostros/releases' },
  { name: 'Amethyst', href: 'https://play.google.com/store/apps/details?id=com.vitorpamplona.amethyst' },
]

export const IOS_CLIENTS: ClientLink[] = [
  { name: 'Damus', href: 'https://apps.apple.com/app/damus/id1628663131' },
  { name: 'Nos', href: 'https://nos.social/' },
  { name: 'Nostur', href: 'https://nostur.com/' },
  { name: 'Primal', href: 'https://primal.net/downloads' },
]

export const SETUP_STEPS = [
  'Choose a client above or from the recommended ones on the Nostr website.',
  'Create an account by signing up on the client of your choice.',
  'Copy and safeguard your private key, mnemonic phrase for some clients, and public key.',
  'Customize your profile settings, such as adding a profile picture or bio, to personalize your Nostr experience.',
  "Start exploring the app's features, follow other Nostr users, and begin sending messages and zaps (bitcoin lightning payments) to engage with the Nostr community.",
]

export const REWARD_STEPS = [
  'Join the Million Sat Challenge.',
  'Follow us on Nostr.',
  'Gain your first 21 followers and make sure your African country flag is on your profile.',
  'Post your thoughts on the most important reasons why Africa will benefit from Bitcoin and tag @AfricanBitcoiners. If your post is good, we will repost it to help you get followers.',
  'Post about the Million Sat Challenge and encourage Africans to sign up. Be sure to tag us in this post.',
  'We will review that you met all conditions and zap you!',
]

export const COPY = {
  heroTitle: 'Boost Your Bitcoin Journey with Nostr and Win Exciting Rewards!',
  heroSubtitle:
    "Welcome to our Bitcoin Beginners' Guide on setting up Nostr! We will be rewarding the first 100 people to use this guide to set up Nostr and has joined the Million Sats Challenge, with a gift of 1,000 Sats! Keep reading to know the requirements.",
  termsTitle: 'Nostr Terms Explained',
  setupTitle: 'Setting Up Nostr',
  setupIntro:
    'The most important part of setting up Nostr is understanding and managing the public and private key pairs associated with your Nostr account. These keys play a crucial role in ensuring the security and authenticity of your interactions within the Nostr platform.\n\nIn Nostr, each account is based on a public/private key pair:',
  pubkeyTitle: 'Public key (Pubkey)',
  pubkeyBody:
    'This serves as your identifier and is used by clients to find and display your published content, acting much like a username. It is generally presented as a string with the prefix npub1.',
  privateKeyTitle: 'Private key',
  privateKeyBody:
    'The Private key, which has a prefix of nsec1, is vital for signing events and ensuring their authenticity. Unlike a resettable password, once lost, the private key cannot be recovered. Hence, it is crucial to safeguard your private key diligently, as it grants control over your Nostr account and guarantees its security.',
  clientsTitle: 'Nostr Clients',
  clientsIntro:
    'Nostr is a protocol and platform with various clients—web-based, desktop, and mobile apps. You have the freedom to choose the client that suits your needs, just like a Bitcoin wallet.',
  setupStepsTitle: 'Setting Up Nostr',
  rewardIntro:
    "And viola, you are on Nostr!\n\nDon't forget we are rewarding the first 100 people to set up Nostr and gain 21 followers with a zap of 1000 Sats.\n\nIf you are finished setting up Nostr above, you just need to follow these steps to claim the reward:",
  mscFormTitle: 'Join The Million Sat Challenge Here',
}

export const SEO = {
  title: 'Setting Up Nostr: A Step-by-Step Guide for Bitcoin Beginners - African Bitcoiners',
  description:
    'Empower yourself with Nostr for Bitcoin as we guide you through the process of setting it up. Gain confidence in managing your Bitcoin transactions as you embark on your Bitcoin journey today!',
}
