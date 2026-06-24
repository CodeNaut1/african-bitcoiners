export type FinalQuestion = {
  question: string
  options: string[]
  correctIndex: number
}

export const finalQuizEN: FinalQuestion[] = [
  // Bitcoin Basics (1–10)
  { question: 'Who created Bitcoin?', options: ['Elon Musk', 'Satoshi Nakamoto', 'Vitalik Buterin', 'Nick Szabo'], correctIndex: 1 },
  { question: 'What is the maximum Bitcoin supply?', options: ['21 billion', '21 million', '100 million', 'Unlimited'], correctIndex: 1 },
  { question: 'Bitcoin was designed as a:', options: ['Stock', 'Peer-to-peer electronic cash system', 'Government currency', 'Bank'], correctIndex: 1 },
  { question: 'What does "decentralized" mean?', options: ['Controlled by one company', 'No single authority controls it', 'Only governments can use it', 'Slow to process'], correctIndex: 1 },
  { question: 'What does "blockchain" refer to?', options: ['A type of mining equipment', 'A public ledger of all Bitcoin transactions', 'A Bitcoin exchange', 'A wallet provider'], correctIndex: 1 },
  { question: 'Bitcoin solves the:', options: ['Interest rate problem', 'Double-spend problem', 'Mining problem', 'Wallet problem'], correctIndex: 1 },
  { question: 'What is a "satoshi"?', options: ['The creator of Bitcoin', 'The smallest unit of Bitcoin (0.00000001 BTC)', 'A type of wallet', 'A country that uses Bitcoin'], correctIndex: 1 },
  { question: 'When did the Bitcoin network launch?', options: ['2007', '2008', '2009', '2010'], correctIndex: 2 },
  { question: 'What is "fiat currency"?', options: ['A type of Bitcoin', 'Government-issued money not backed by a commodity', 'Digital gold', 'A Lightning payment'], correctIndex: 1 },
  { question: 'Bitcoin\'s supply schedule is:', options: ['Random', 'Fixed and predetermined in the code', 'Decided by miners annually', 'Controlled by a central bank'], correctIndex: 1 },
  // How Bitcoin Works (11–20)
  { question: 'How long does it take to mine one Bitcoin block?', options: ['1 minute', '~10 minutes', '1 hour', '1 day'], correctIndex: 1 },
  { question: 'What is Bitcoin mining?', options: ['Digging for physical coins', 'Validating transactions and adding them to the blockchain', 'Creating new Bitcoin wallets', 'Exchanging Bitcoin for cash'], correctIndex: 1 },
  { question: 'What is a "hash"?', options: ['A type of mining machine', 'A cryptographic fingerprint of data', 'A type of Bitcoin address', 'A transaction fee'], correctIndex: 1 },
  { question: 'What consensus mechanism does Bitcoin use?', options: ['Proof of Stake', 'Proof of Work', 'Proof of Authority', 'Delegated PoS'], correctIndex: 1 },
  { question: 'What happens every 210,000 blocks?', options: ['Mining stops', 'The block reward halves (halving)', 'Bitcoin supply doubles', 'A new coin is created'], correctIndex: 1 },
  { question: 'Who validates Bitcoin transactions?', options: ['Banks', 'Miners and full nodes', 'Governments', 'Only Satoshi'], correctIndex: 1 },
  { question: 'What is a Bitcoin "mempool"?', options: ['A type of mining pool', 'The waiting area for unconfirmed transactions', 'A Telegram group', 'A cold storage device'], correctIndex: 1 },
  { question: 'What is the Lightning Network?', options: ['A fast Bitcoin mining pool', 'A layer-2 payment protocol for fast, cheap Bitcoin transactions', 'A government Bitcoin system', 'A hardware wallet'], correctIndex: 1 },
  { question: 'What does "UTXO" stand for?', options: ['Unique Transaction eXchange Object', 'Unspent Transaction Output', 'Universal Token eXchange Operation', 'United Token eXtra Output'], correctIndex: 1 },
  { question: 'What is a "node" in Bitcoin?', options: ['A type of miner', 'A computer that maintains a full copy of the blockchain', 'A wallet device', 'A Bitcoin exchange'], correctIndex: 1 },
  // Keys & Wallets (21–30)
  { question: 'What is a private key?', options: ['Your exchange password', 'A secret number that controls your Bitcoin', 'The PIN on your phone', 'Your Bitcoin address'], correctIndex: 1 },
  { question: 'What is a seed phrase?', options: ['A password hint', '12 or 24 words that back up your wallet', 'A transaction ID', 'A mining term'], correctIndex: 1 },
  { question: '"Not your keys, not your coins" means:', options: ['You need a physical key', 'Without private keys, you don\'t truly own Bitcoin', 'Only miners have real Bitcoin', 'You need two keys'], correctIndex: 1 },
  { question: 'What is a "hot wallet"?', options: ['A wallet in a hot country', 'A wallet connected to the internet', 'A wallet with high fees', 'A wallet with many Bitcoin'], correctIndex: 1 },
  { question: 'What is a "cold wallet"?', options: ['A forgotten wallet', 'A wallet kept offline', 'A wallet with zero balance', 'A fiat wallet'], correctIndex: 1 },
  { question: 'What should you NEVER do with your seed phrase?', options: ['Write it on paper', 'Store it offline', 'Share it with anyone online', 'Keep multiple copies'], correctIndex: 2 },
  { question: 'How many words in a standard BIP39 seed phrase?', options: ['8', '10', '12 or 24', '32'], correctIndex: 2 },
  { question: 'What is a hardware wallet?', options: ['A mobile app', 'A physical device that stores keys offline', 'A Bitcoin ATM', 'A paper wallet'], correctIndex: 1 },
  { question: 'If you lose your seed phrase and device, what happens?', options: ['Support recovers it', 'Bitcoin is permanently lost', 'Miners return it', 'Government can restore it'], correctIndex: 1 },
  { question: 'A public key is used to:', options: ['Sign transactions', 'Derive Bitcoin addresses and receive funds', 'Access your wallet', 'Mine Bitcoin'], correctIndex: 1 },
  // Saving & Spending (31–40)
  { question: 'Bitcoin\'s fixed supply makes it:', options: ['Inflationary', 'Deflationary / sound money', 'Volatile only', 'Backed by gold'], correctIndex: 1 },
  { question: 'What is "dollar cost averaging" (DCA)?', options: ['Buying Bitcoin all at once', 'Regularly buying a fixed amount regardless of price', 'Trading Bitcoin daily', 'Selling Bitcoin in dollars'], correctIndex: 1 },
  { question: 'Which of these is the BEST long-term storage strategy?', options: ['Exchange cold wallet', 'Personal hardware wallet', 'Hot wallet app', 'Paper in your email'], correctIndex: 1 },
  { question: 'Lightning Network payments are:', options: ['Recorded on the main blockchain immediately', 'Fast and cheap, settled off-chain', 'Only available in rich countries', 'Slower than on-chain'], correctIndex: 1 },
  { question: 'A Lightning "invoice" is:', options: ['A bank receipt', 'A payment request with amount and expiry', 'A type of mining reward', 'A Bitcoin address'], correctIndex: 1 },
  { question: 'Why is Bitcoin useful for Africans?', options: ['It is backed by African governments', 'It enables financial access without banks and protects against inflation', 'It is only made in Africa', 'It is cheaper than mobile money'], correctIndex: 1 },
  { question: 'What is "self-custody"?', options: ['Holding your keys in a bank', 'Holding your own private keys without relying on a third party', 'A type of savings account', 'A Bitcoin ETF'], correctIndex: 1 },
  { question: 'The 2140 limit refers to:', options: ['The maximum block size', 'The year when the last Bitcoin will be mined', 'The halving year', 'The number of halvings'], correctIndex: 1 },
  { question: 'Bitcoin is "permissionless" which means:', options: ['Anyone needs government permission to use it', 'Anyone can use it without needing approval from anyone', 'Only approved users can send Bitcoin', 'Miners give permission'], correctIndex: 1 },
  { question: 'A Bitcoin ATM allows you to:', options: ['Only withdraw Bitcoin', 'Buy and/or sell Bitcoin with cash', 'Mine Bitcoin', 'Send Lightning payments'], correctIndex: 1 },
  // Africa & Course Knowledge (41–50)
  { question: 'African Bitcoiners operates a Lightning node called:', options: ['Bitcoin Africa Node', 'Africa Free Routing', 'Satoshi Africa', 'Lightning Lagos'], correctIndex: 1 },
  { question: 'The BFB Course unique code is used for:', options: ['Mining Bitcoin', 'Identifying your course progress and certificate', 'Paying transaction fees', 'Logging into exchanges'], correctIndex: 1 },
  { question: 'Which African country is often cited as having the highest Bitcoin P2P trading volume?', options: ['South Africa', 'Kenya', 'Nigeria', 'Egypt'], correctIndex: 2 },
  { question: 'What is Bitcoin\'s "halving"?', options: ['When transaction fees are halved', 'When the block reward is cut in half approximately every 4 years', 'When the price drops by 50%', 'When mining difficulty doubles'], correctIndex: 1 },
  { question: 'What is the role of "full nodes"?', options: ['To mine Bitcoin', 'To independently verify all transactions and enforce rules', 'To manage Lightning channels', 'To issue Bitcoin addresses'], correctIndex: 1 },
  { question: 'Bitcoin\'s code is:', options: ['Secret and proprietary', 'Open source', 'Controlled by US government', 'Only available to miners'], correctIndex: 1 },
  { question: 'What is "HODL"?', options: ['A Bitcoin protocol', 'A term for holding Bitcoin long term rather than selling', 'A type of wallet', 'A trading strategy'], correctIndex: 1 },
  { question: 'Layer 2 solutions like Lightning are built to:', options: ['Replace Bitcoin', 'Scale Bitcoin transactions without changing the base layer', 'Create new coins', 'Centralize Bitcoin'], correctIndex: 1 },
  { question: 'What is a "certificate of completion" in the BFB Course?', options: ['A government document', 'Proof that you completed the 20-day Bitcoin course', 'A mining license', 'A wallet backup'], correctIndex: 1 },
  { question: 'The African Bitcoiners community has approximately how many members?', options: ['100', '1,000', '10,000+', '1 million'], correctIndex: 2 },
]

export const finalQuizFR: FinalQuestion[] = finalQuizEN.map((q) => ({
  ...q,
  // For production: replace with proper French translations
  // These are placeholder copies — translate each question for the French final quiz
}))
