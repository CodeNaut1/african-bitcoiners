export type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
}

export type DayQuiz = {
  day: number
  lang: 'en' | 'fr'
  title: string
  questions: QuizQuestion[]
}

export const courseQuizzes: DayQuiz[] = [
  // ── Day 1 EN — What is Bitcoin? ─────────────────────────────────────────────
  {
    day: 1, lang: 'en', title: 'What is Bitcoin?',
    questions: [
      { question: 'Who created Bitcoin?', options: ['Elon Musk', 'Satoshi Nakamoto', 'Vitalik Buterin', 'Steve Jobs'], correctIndex: 1 },
      { question: 'When was the Bitcoin whitepaper published?', options: ['2005', '2007', '2008', '2011'], correctIndex: 2 },
      { question: 'What is the maximum number of Bitcoin that will ever exist?', options: ['100 million', '21 million', '1 billion', 'Unlimited'], correctIndex: 1 },
      { question: 'Bitcoin is primarily described as what?', options: ['A stock', 'A peer-to-peer electronic cash system', 'A bank', 'A government currency'], correctIndex: 1 },
      { question: 'Who controls the Bitcoin network?', options: ['The US Government', 'Satoshi Nakamoto', 'No single person or entity', 'The World Bank'], correctIndex: 2 },
      { question: 'What problem does Bitcoin solve that previous digital currencies could not?', options: ['Slow transactions', 'The double-spend problem', 'High fees', 'Inflation'], correctIndex: 1 },
      { question: 'Bitcoin is considered to be:', options: ['Centralized', 'Decentralized', 'Controlled by banks', 'A government project'], correctIndex: 1 },
      { question: 'What does Bitcoin NOT have?', options: ['A blockchain', 'Physical coins', 'A limited supply', 'A network'], correctIndex: 1 },
      { question: 'The Bitcoin whitepaper title is:', options: ['Digital Gold', 'Bitcoin: A Peer-to-Peer Electronic Cash System', 'The Blockchain Manifesto', 'Satoshi\'s Secret'], correctIndex: 1 },
      { question: 'How is new Bitcoin created?', options: ['Printed by banks', 'Through a process called mining', 'Purchased from governments', 'Created by developers'], correctIndex: 1 },
    ],
  },
  // ── Day 1 FR — Qu'est-ce que le Bitcoin ? ───────────────────────────────────
  {
    day: 1, lang: 'fr', title: 'Qu\'est-ce que le Bitcoin ?',
    questions: [
      { question: 'Qui a créé le Bitcoin ?', options: ['Elon Musk', 'Satoshi Nakamoto', 'Vitalik Buterin', 'Steve Jobs'], correctIndex: 1 },
      { question: 'Quand le livre blanc Bitcoin a-t-il été publié ?', options: ['2005', '2007', '2008', '2011'], correctIndex: 2 },
      { question: 'Quel est le nombre maximum de Bitcoins qui existera jamais ?', options: ['100 millions', '21 millions', '1 milliard', 'Illimité'], correctIndex: 1 },
      { question: 'Le Bitcoin est principalement décrit comme :', options: ['Une action', 'Un système de paiement électronique pair-à-pair', 'Une banque', 'Une monnaie gouvernementale'], correctIndex: 1 },
      { question: 'Qui contrôle le réseau Bitcoin ?', options: ['Le gouvernement américain', 'Satoshi Nakamoto', 'Personne en particulier', 'La Banque Mondiale'], correctIndex: 2 },
      { question: 'Quel problème le Bitcoin résout-il ?', options: ['Transactions lentes', 'Le problème de double dépense', 'Des frais élevés', "L'inflation"], correctIndex: 1 },
      { question: 'Le Bitcoin est considéré comme :', options: ['Centralisé', 'Décentralisé', 'Contrôlé par des banques', 'Un projet gouvernemental'], correctIndex: 1 },
      { question: "Qu'est-ce que le Bitcoin n'a PAS ?", options: ['Une blockchain', 'Des pièces physiques', 'Une offre limitée', 'Un réseau'], correctIndex: 1 },
      { question: 'Le titre du livre blanc Bitcoin est :', options: ['Or numérique', 'Bitcoin : Un système de paiement électronique pair-à-pair', 'Le Manifeste Blockchain', 'Le Secret de Satoshi'], correctIndex: 1 },
      { question: 'Comment les nouveaux Bitcoins sont-ils créés ?', options: ['Imprimés par des banques', 'Par un processus appelé minage', 'Achetés auprès des gouvernements', 'Créés par des développeurs'], correctIndex: 1 },
    ],
  },
  // ── Day 2 EN — How Bitcoin Works ────────────────────────────────────────────
  {
    day: 2, lang: 'en', title: 'How Bitcoin Works',
    questions: [
      { question: 'What is the blockchain?', options: ['A type of cryptocurrency', 'A public ledger of all Bitcoin transactions', 'A Bitcoin exchange', 'A type of wallet'], correctIndex: 1 },
      { question: 'How long does it take to mine a Bitcoin block on average?', options: ['1 minute', '10 minutes', '1 hour', '24 hours'], correctIndex: 1 },
      { question: 'What is Bitcoin mining?', options: ['Digging for physical Bitcoin', 'The process of validating transactions and adding them to the blockchain', 'Buying Bitcoin cheaply', 'Creating new types of Bitcoin'], correctIndex: 1 },
      { question: 'What is a Bitcoin block?', options: ['A unit of Bitcoin currency', 'A group of transactions bundled together and added to the blockchain', 'A type of hardware wallet', 'A Bitcoin address'], correctIndex: 1 },
      { question: 'What consensus mechanism does Bitcoin use?', options: ['Proof of Stake', 'Proof of Work', 'Delegated Proof of Stake', 'Proof of Authority'], correctIndex: 1 },
      { question: 'What is a transaction confirmation?', options: ['An email from your bank', 'When a transaction is included in a mined block', 'A password reset', 'A two-factor authentication code'], correctIndex: 1 },
      { question: 'What do Bitcoin miners receive as a reward?', options: ['Free electricity', 'Block subsidy plus transaction fees', 'Government grants', 'Bank transfers'], correctIndex: 1 },
      { question: 'What is a Bitcoin address?', options: ['A physical location', 'A string of characters used to receive Bitcoin', 'An IP address', 'A bank account number'], correctIndex: 1 },
      { question: 'What does "immutable" mean in the context of the blockchain?', options: ['Easy to change', 'Once recorded, transactions cannot be altered', 'Invisible to others', 'Temporary'], correctIndex: 1 },
      { question: 'What is the "mempool"?', options: ['A type of Bitcoin pool', 'The waiting area for unconfirmed Bitcoin transactions', 'A mining cooperative', 'A type of blockchain'], correctIndex: 1 },
    ],
  },
  // ── Day 2 FR — Comment fonctionne le Bitcoin ────────────────────────────────
  {
    day: 2, lang: 'fr', title: 'Comment fonctionne le Bitcoin',
    questions: [
      { question: "Qu'est-ce que la blockchain ?", options: ['Un type de cryptomonnaie', 'Un registre public de toutes les transactions Bitcoin', 'Un échange Bitcoin', 'Un type de portefeuille'], correctIndex: 1 },
      { question: 'Combien de temps faut-il pour miner un bloc Bitcoin en moyenne ?', options: ['1 minute', '10 minutes', '1 heure', '24 heures'], correctIndex: 1 },
      { question: "Qu'est-ce que le minage de Bitcoin ?", options: ['Creuser pour trouver des Bitcoins physiques', 'Le processus de validation des transactions et de leur ajout à la blockchain', 'Acheter des Bitcoins pas chers', 'Créer de nouveaux types de Bitcoin'], correctIndex: 1 },
      { question: "Qu'est-ce qu'un bloc Bitcoin ?", options: ['Une unité de devise Bitcoin', 'Un groupe de transactions regroupées et ajoutées à la blockchain', 'Un type de portefeuille matériel', 'Une adresse Bitcoin'], correctIndex: 1 },
      { question: 'Quel mécanisme de consensus Bitcoin utilise-t-il ?', options: ['Preuve d\'enjeu', 'Preuve de travail', 'Preuve d\'enjeu déléguée', 'Preuve d\'autorité'], correctIndex: 1 },
      { question: "Qu'est-ce qu'une confirmation de transaction ?", options: ['Un e-mail de votre banque', 'Quand une transaction est incluse dans un bloc miné', 'Une réinitialisation de mot de passe', 'Un code d\'authentification à deux facteurs'], correctIndex: 1 },
      { question: 'Que reçoivent les mineurs de Bitcoin comme récompense ?', options: ['De l\'électricité gratuite', 'La subvention de bloc plus les frais de transaction', 'Des subventions gouvernementales', 'Des virements bancaires'], correctIndex: 1 },
      { question: "Qu'est-ce qu'une adresse Bitcoin ?", options: ['Un lieu physique', 'Une chaîne de caractères utilisée pour recevoir des Bitcoins', 'Une adresse IP', 'Un numéro de compte bancaire'], correctIndex: 1 },
      { question: 'Que signifie "immuable" dans le contexte de la blockchain ?', options: ['Facile à changer', 'Une fois enregistrées, les transactions ne peuvent pas être modifiées', 'Invisible pour les autres', 'Temporaire'], correctIndex: 1 },
      { question: "Qu'est-ce que le «mempool» ?", options: ['Un type de pool Bitcoin', "La zone d'attente pour les transactions Bitcoin non confirmées", 'Une coopérative minière', 'Un type de blockchain'], correctIndex: 1 },
    ],
  },
  // ── Day 3 EN — Bitcoin Keys & Wallets ───────────────────────────────────────
  {
    day: 3, lang: 'en', title: 'Bitcoin Keys & Wallets',
    questions: [
      { question: 'What is a private key in Bitcoin?', options: ['Your password to a Bitcoin exchange', 'A secret number that proves ownership and controls your Bitcoin', 'The PIN on your hardware wallet', 'Your Bitcoin address'], correctIndex: 1 },
      { question: 'What is a seed phrase (mnemonic)?', options: ['A password hint', '12 or 24 words that back up your entire Bitcoin wallet', 'A type of Bitcoin transaction', 'A mining algorithm'], correctIndex: 1 },
      { question: 'What does "Not your keys, not your coins" mean?', options: ['You need a physical key to access Bitcoin', 'If you don\'t control private keys, you don\'t truly own your Bitcoin', 'Keys are not important for Bitcoin', 'Only miners own real Bitcoin'], correctIndex: 1 },
      { question: 'What is a hot wallet?', options: ['A wallet that generates heat', 'A wallet connected to the internet', 'A wallet that only holds popular coins', 'A hardware wallet'], correctIndex: 1 },
      { question: 'What is a cold wallet?', options: ['A wallet stored in the fridge', 'A wallet kept offline, not connected to the internet', 'A wallet with low Bitcoin balance', 'A forgotten wallet'], correctIndex: 1 },
      { question: 'What is a hardware wallet?', options: ['A physical device that stores private keys offline', 'A software app on your phone', 'A paper wallet', 'A Bitcoin exchange'], correctIndex: 0 },
      { question: 'What should you NEVER do with your seed phrase?', options: ['Write it on paper', 'Store it securely offline', 'Share it with anyone online', 'Keep multiple copies'], correctIndex: 2 },
      { question: 'If you lose your seed phrase and your wallet device breaks, what happens?', options: ['You can recover your Bitcoin from customer support', 'You lose access to your Bitcoin permanently', 'The Bitcoin gets donated to charity', 'Miners return your Bitcoin'], correctIndex: 1 },
      { question: 'Which is the MOST secure way to store large amounts of Bitcoin long term?', options: ['On a centralized exchange', 'In a hot wallet on your phone', 'In a hardware wallet stored offline', 'In a browser extension wallet'], correctIndex: 2 },
      { question: 'How many words are in a standard BIP39 seed phrase?', options: ['8', '10', '12 or 24', '32'], correctIndex: 2 },
    ],
  },
  // ── Day 3 FR — Clés et portefeuilles Bitcoin ────────────────────────────────
  {
    day: 3, lang: 'fr', title: 'Clés et portefeuilles Bitcoin',
    questions: [
      { question: "Qu'est-ce qu'une clé privée Bitcoin ?", options: ['Votre mot de passe pour un échange Bitcoin', 'Un nombre secret qui prouve la propriété et contrôle vos Bitcoins', 'Le PIN de votre portefeuille matériel', 'Votre adresse Bitcoin'], correctIndex: 1 },
      { question: "Qu'est-ce qu'une phrase de récupération (mnémonique) ?", options: ['Un indice de mot de passe', '12 ou 24 mots qui sauvegardent tout votre portefeuille Bitcoin', 'Un type de transaction Bitcoin', 'Un algorithme de minage'], correctIndex: 1 },
      { question: 'Que signifie «Pas vos clés, pas vos coins» ?', options: ['Vous avez besoin d\'une clé physique pour accéder au Bitcoin', 'Si vous ne contrôlez pas les clés privées, vous ne possédez pas vraiment votre Bitcoin', 'Les clés ne sont pas importantes pour le Bitcoin', 'Seuls les mineurs possèdent de vrais Bitcoins'], correctIndex: 1 },
      { question: "Qu'est-ce qu'un portefeuille chaud ?", options: ['Un portefeuille qui génère de la chaleur', 'Un portefeuille connecté à Internet', 'Un portefeuille qui contient uniquement des pièces populaires', 'Un portefeuille matériel'], correctIndex: 1 },
      { question: "Qu'est-ce qu'un portefeuille froid ?", options: ['Un portefeuille stocké dans le réfrigérateur', 'Un portefeuille hors ligne, non connecté à Internet', 'Un portefeuille avec un faible solde Bitcoin', 'Un portefeuille oublié'], correctIndex: 1 },
      { question: "Qu'est-ce qu'un portefeuille matériel ?", options: ['Un appareil physique qui stocke les clés privées hors ligne', 'Une application logicielle sur votre téléphone', 'Un portefeuille papier', 'Un échange Bitcoin'], correctIndex: 0 },
      { question: 'Que ne devez-vous JAMAIS faire avec votre phrase de récupération ?', options: ['L\'écrire sur papier', 'La stocker en toute sécurité hors ligne', 'La partager avec quelqu\'un en ligne', 'En conserver plusieurs copies'], correctIndex: 2 },
      { question: 'Si vous perdez votre phrase de récupération et que votre appareil tombe en panne, que se passe-t-il ?', options: ['Vous pouvez récupérer vos Bitcoins via le service client', 'Vous perdez définitivement l\'accès à vos Bitcoins', 'Les Bitcoins sont donnés à une association caritative', 'Les mineurs vous rendent vos Bitcoins'], correctIndex: 1 },
      { question: 'Quelle est la façon la plus sûre de stocker de grandes quantités de Bitcoin à long terme ?', options: ['Sur un échange centralisé', 'Dans un portefeuille chaud sur votre téléphone', 'Dans un portefeuille matériel stocké hors ligne', 'Dans un portefeuille d\'extension de navigateur'], correctIndex: 2 },
      { question: 'Combien de mots contient une phrase de récupération BIP39 standard ?', options: ['8', '10', '12 ou 24', '32'], correctIndex: 2 },
    ],
  },
  // Days 4–20: Add additional quiz sets here following the same structure.
  // Each day should cover: Spending Bitcoin, Saving in Bitcoin, Lightning Network,
  // Bitcoin Privacy, Bitcoin Mining, Bitcoin History, Bitcoin in Africa, etc.
]

export function getQuiz(day: number, lang: 'en' | 'fr'): DayQuiz | null {
  return courseQuizzes.find((q) => q.day === day && q.lang === lang) ?? null
}
