const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  note: `${R2}/uploads/2024/11/How_to_Keep_Bitcoin_in_your_head_note-section-removebg-preview.png`,
  practice: `${R2}/uploads/2024/11/Practice-memorizing-your-seed-phrase-min-1024x1024.png`,
  song: `${R2}/uploads/2024/11/Creating_a_Song_from_your_Seed_Phrase_Word_Groups-min-removebg-preview.png`,
  arrow12: `${R2}/uploads/2024/09/one-to-two-arrow.png`,
  arrow34: `${R2}/uploads/2024/09/three-to-four-arrow.png`,
  borderWallet: `${R2}/uploads/2024/11/Border-wallet-2-min-1024x1024.png`,
  passphrase: `${R2}/uploads/2024/11/Passphrase-1024x1024.png`,
}

export const LINKS = {
  wallets: '/save-bitcoin/recommended-bitcoin-and-lightning-wallets/',
  generateSeed: '/save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free/',
  security: '/save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free/',
  borderGuide: 'https://www.borderwallets.com/',
  sparrow: 'https://sparrowwallet.com/',
  borderVideo: 'https://www.youtube.com/watch?v=wHQrvCGVkTw',
}

export const MEMORIZE_CARDS = [
  {
    icon: 'wallet' as const,
    title: 'Use a reputable wallet',
    description:
      'The first step in generating a secure seed phrase is to use a reputable wallet. You can find reputable wallets on our wallet recommendation page. A wallet is a software program that stores your Bitcoin and generates seed phrases. You should only use wallets that have been thoroughly vetted and are known for their security.',
    button: { label: 'Our Wallet Recommendation Page', href: LINKS.wallets },
  },
  {
    icon: 'seed' as const,
    title: 'Generate a unique seed phrase',
    description:
      "Once you've selected a wallet your prefer, the next step is to generate a unique seed phrase. A seed phrase is a series of words that are used to generate your private key, which is used to access your Bitcoin. A good seed phrase should be unique, and easy to remember.",
    button: { label: 'How to Generate Your Seed Phrase', href: LINKS.generateSeed },
  },
  {
    icon: 'breakdown' as const,
    title: 'Break Down Your Seed Phrase',
    description:
      'To effectively memorize your seed phrase, break it into smaller groups of 3-4 words. For instance, if your seed phrase is "orange banana dog apple monkey sky plain water pizza elephant beautiful invoke," divide it into groups like "orange banana dog," "apple monkey sky," "plain water pizza," and "elephant beautiful invoke." This technique makes it easier to remember and reduces the risk of forgetting.',
  },
  {
    icon: 'story' as const,
    title: 'Create a Story with Your Word Group',
    description:
      'To increase the memorability of your seed phrase, it\'s useful to break it down into smaller groups and create memorable stories or images for each group. Let\'s take the example seed phrase "orange banana dog apple monkey sky plain water pizza elephant beautiful invoke" and break it down into three-word groups: "orange banana dog," "apple monkey sky," "plain water pizza," and "elephant beautiful invoke."',
  },
]

export const SONG_STEPS = [
  {
    num: 1,
    title: 'Break It into Groups',
    body: `Start by dividing your seed phrase into manageable word groups.\nFor example:\nPhrase: "orange banana dog apple monkey sky plain water pizza elephant beautiful invoke"\nGroups:\n"orange banana dog"\n"apple monkey sky"\n"plain water pizza"\n"elephant beautiful invoke"`,
  },
  {
    num: 2,
    title: 'Create a Melody for Each Group',
    body: `Make each group memorable by setting it to a melody:\nGroup 1: "My orange and banana have been eaten by your dog."\nGroup 2: "Apples will rejoice when that monkey stops looking at the sky in this fog."\nGroup 3: "But why on earth did the waiter serve me plain water instead of soda with my pizza?"\nGroup 4: "Elephant, oh beautiful elephants, you invoke awe in me and Liza."`,
  },
  {
    num: 3,
    title: 'Practice and Repeat',
    body: 'Sing each group repeatedly to ingrain the song in your memory. Practice whenever you have downtime or need a quick mental break.',
  },
  {
    num: 4,
    title: 'Share (Optional Backup)',
    body: 'Teach your song to a trusted friend or family member as a backup. This way, your seed phrase is safeguarded even if you forget part of the melody.',
  },
]

export const BORDER_STEPS = [
  'Download and set up your Sparrow Wallet on your desktop.',
  'Once your Sparrow Wallet is set up and online, click on File and choose "New or Imported Software Wallet."',
  'Choose mnemonic words and click on the options bar to select Border Wallets Grid.',
  'Click on "Generate Grid" to create the 12-word seed phrase required to generate the grid where you can draw your pattern.',
  'Save the PDF copy of your grid.',
  'Randomize the positions of the words as you draw a pattern on the grid that you can easily remember. (We advise that you create a 24-word pattern instead of 12).',
  'Once you are satisfied with the pattern created, click "Ok". You will be prompted to pick the 12th or 24th word for your seed phrase to be complete.',
  'Create a passphrase for your wallet that you can easily remember for additional security and click on "Create Keystore."',
  'Click on "Import Key Store." you will be prompted to re-enter your passphrase.',
  'Click on "Apply" to create your wallet. You will be prompted to set an optional password for your wallet. Taking advantage of every security measure for your wallet is important, so we advise you to create a password for your wallet.',
  'Once your wallet password is set, you can go ahead and start sending and receiving Bitcoin!',
]
