const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const LINKS = {
  wallets: '/save-bitcoin/recommended-bitcoin-and-lightning-wallets',
  sparrow: 'https://sparrowwallet.com/',
  bitAddress:
    'https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html',
  bitcoinPaperWallet: 'https://bitcoinpaperwallet.com/#main',
  bip39: 'https://iancoleman.io/bip39',
  paperWalletVideo:
    'https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html',
  seedPhraseVideo: 'https://www.youtube.com/watch?v=A16G29d0dQ0',
  freeCourse: '/learn-bitcoin/free-bitcoin-course',
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}

export const IMG = {
  hero: `${R2}/uploads/2024/06/Setting-up-a-Bitcoin-Cold-Storage.png`,
  privateKey: `${R2}/uploads/2024/06/Bitcoin-Private-Key2.png`,
  paperWallet: `${R2}/uploads/2024/06/Bitcoin-Paper-Wallet.png`,
  mnemonic: `${R2}/uploads/2024/06/Mnemonic-Seed-Phrase.png`,
  keysSafe: `${R2}/uploads/2024/06/Keeping-Your-Keys-Safe.png`,
}

export const PAPER_WALLET_GENERATORS = [
  {
    title: 'BitAddress',
    text: 'BitAddress is a popular and reputable paper wallet generator that allows you to generate a paper wallet offline. You can simply visit their website on your desktop or phone and create your wallet in a few simple steps. You can also add a passphrase to encrypt the paper wallet for additional protection by ticking the BIP38 encryption box.',
    href: LINKS.bitAddress,
  },
  {
    title: 'BitcoinPaperWallet',
    text: "BitcoinPaperWallet is based on a well established and trustworthy open-source engine for generating addresses using your own browser's JavaScript engine. It is a user-friendly paper wallet generator that allows you to create a paper wallet in just a few clicks. It also provides step-by-step instructions on how to generate and use your paper wallet.",
    href: LINKS.bitcoinPaperWallet,
  },
] as const

export const PAPER_WALLET_STEPS = [
  'Go to the wallet website: Once you have chosen a paper wallet, open the webpage on your phone or computer and then go offline.',
  'Disconnect from the internet: For added security, disconnect your computer or phone from the internet before generating your paper wallet. This will prevent any potential hackers or malware from accessing your private keys.',
  'Generate your paper wallet: Follow the instructions provided by the paper wallet generator to create your wallet. This will usually involve randomly generating a private key and a corresponding public address.',
  'Write down your private key: Avoid printing as it exposes you to internet or computer attacks. Simply write your keys down on a piece of paper.',
  "Store your paper wallet securely: Once you've written down your paper wallet, store it in a secure and safe place. Consider using a fireproof and waterproof safe or a safety deposit box at a bank.",
]

export const MNEMONIC_STEPS = [
  { text: 'Click here to go to the BIP39 tool website.', href: LINKS.bip39 },
  'Click on the box "Show entropy details"',
  'Disconnect your computer from the internet.',
  'In the "Entropy" field, enter your Bitcoin private key (in hexadecimal format).',
  'In the "Mnemonic length" field, select "24 words" or whatever mnemonic length you are comfortable with.',
  'Your 12 or 24-word mnemonic phrase will appear in the "Mnemonic" field.',
  'Write down your mnemonic phrase on a piece of paper and store it in a secure place.',
]

export const KEY_SAFETY_TIPS = [
  'Memorizing your 12 or 24 word seed phrase is a useful way to keep it safe. It can be done by weaving it into a poem or song, which can be used to carry your money in your head in risky situations. Using this method is still not enough as it is human to forget but it does mean you can carry your money in your head',
  "Back up your keys: Even if you memorize your private key and seed phrase or keep it in a safe location, it's still a good idea to have a backup copy.",
  "Don't share your keys: This one might seem obvious, but it's worth repeating. Never share your private key or seed phrase with anyone, no matter how trustworthy they seem. Your private key or seed phrase is like the key to your house – you wouldn't give it to a stranger, so don't give your private key to anyone you don't trust completely.",
  'Engrave your seed phrase on a steel backup plate: Because paper and ink are not durable and can be destroyed by water or fade away with time, steel backup plates are better offline tools to store your seed phrase. Some of these steel backup plates have letters that you put in, holes that you puncture on the plate, or they include a pen that you can use to write on the steel.',
  'Use a hardware device like a hardware wallet to store your seed phrase: Hardware wallets store your seed phrase on an isolated device that is not connected to the internet, this makes them harder for hackers to access.',
]

export const BAD_PRACTICES = [
  'Avoid taking pictures or screenshots of your seed phrase or in anyway storing it in the cloud.',
  'Avoid going to a Business Centre(Cyber Cafe) to print or laminate your seed phrase. Not only have you exposed your seed phrase to a stranger doing this, you have also exposed your seed phrase to a hackable device.',
  'Do not store your seed phrase in a password manager.',
  'Do not say your seed phrase out loud.',
  'Do not store your seed phrase as text on your Phone or Laptop.',
  'Avoid sharing your seed phrase with a third party.',
  'Avoid backing up your seed phrase together with your passphrase as it beats the whole idea of two security measures for your wallet.',
]

export const EXTRA_SECURITY_TIPS = [
  'Use a strong password for your wallet, avoid using simple passwords like "password" or "123456" and use a mix of upper and lower case letters, numbers, and symbols. Keep your software up to date and use two-factor authentication (2FA) to increase security.',
  'We advise you to have a "duress" passphrase which shows a different wallet in which you can put a little bit of Bitcoin and not your life savings. How does this work? Well did you know that as long as you get your backup seed phrase right, every different passphrase you enter leads to a totally new wallet? The joys of Bitcoin! So simply have a passphrase saved or memorized where you have little Bitcoin. So when under duress you lead the thief to your "duress\' wallet.',
]
