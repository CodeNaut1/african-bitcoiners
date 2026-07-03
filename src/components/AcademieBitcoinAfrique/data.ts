export const INFO = [
  { label: 'Durée', value: '3 semaines' },
  { label: 'Rythme', value: '2 sessions / sem' },
  { label: 'Sessions live', value: '60–75 min' },
  { label: 'Devoir', value: '20–40 min' },
  { label: 'Langue', value: 'Français' },
  { label: 'Plateforme', value: 'Jitsi' },
  { label: 'Communauté', value: 'WhatsApp / Discord' },
  { label: 'Contenu', value: 'Bitcoin uniquement' },
]

export const LEARN = [
  {
    n: '01',
    title: "L'argent au quotidien",
    body: "Fonctions et propriétés d'une monnaie, avant de parler technique.",
  },
  {
    n: '02',
    title: 'Bitcoin comme système',
    body: "Transactions, blocs, minage, décentralisation — vue d'ensemble.",
  },
  {
    n: '03',
    title: 'Auto-souveraineté',
    body: 'Portefeuilles, seed phrase, sauvegarde, premiers pas pratiques encadrés.',
  },
  {
    n: '04',
    title: 'Lightning',
    body: 'Factures, paiements rapides, bonnes pratiques.',
  },
  {
    n: '05',
    title: 'Bitcoin en Afrique',
    body: 'Épargne, transferts, communautés — sans promesses irréalistes.',
  },
  {
    n: '06',
    title: 'Clôture en panel',
    body: 'Histoires terrain et questions ouvertes.',
  },
]

export const FAQS = [
  { q: "C'est seulement du Bitcoin ?", a: "Oui. Pas d'altcoins, pas de trading." },
  {
    q: 'Je dois déjà avoir un portefeuille ?',
    a: 'Non au début. La pratique portefeuille arrive après les fondations.',
  },
  {
    q: 'Où ont lieu les sessions ?',
    a: 'En ligne sur Jitsi ; le lien est communiqué aux inscrits.',
  },
]

export const FOR_INCLUDE = [
  'Débutants et curieux cherchant un cadre Bitcoin-only en français',
  'Personnes qui veulent des gestes concrets (portefeuille, Lightning) après les fondations',
  'Bâtisseurs de communautés qui veulent des repères sûrs pour enseigner sans hype',
]

export const FOR_EXCLUDE = [
  'Recherche de signaux de trading ou « gains rapides »',
  'Projets hors Bitcoin (altcoins, ICO, etc.)',
]

export type ProgramSession = {
  day: string
  title: string
  kicker: string
  summary: string
  speaker: string
  org: string
  project?: string
}

export type ProgramWeek = {
  week: string
  theme: string
  color: string
  sessions: ProgramSession[]
}

export const PROGRAM: ProgramWeek[] = [
  {
    week: 'Semaine 1',
    theme: 'De la monnaie aux blocs',
    color: '#f5ead8',
    sessions: [
      {
        day: 'Jeudi',
        title: "De l'argent à Bitcoin",
        kicker: 'Concepts',
        summary:
          "Approfondir ce qu'est la monnaie, puis comprendre pourquoi Bitcoin est discuté — sans portefeuille ni envoi/réception pendant cette session.",
        speaker: 'Nourou',
        org: 'Bitcoin Sénégal',
      },
      {
        day: 'Vendredi',
        title: 'Bases de Bitcoin',
        kicker: 'Vue système',
        summary:
          "Comprendre le réseau Bitcoin ; démonstration en lecture seule sur un explorateur de blocs (pas d'opérations portefeuille).",
        speaker: 'Faris Zafir Sawadogo',
        org: 'Bitcoin Burkina Faso',
      },
    ],
  },
  {
    week: 'Semaine 2',
    theme: 'Pratique et sécurité',
    color: '#f0e4d4',
    sessions: [
      {
        day: 'Jeudi',
        title: 'Portefeuilles et sécurité',
        kicker: 'Auto-souveraineté',
        summary:
          'Types de portefeuilles, seed phrase, sauvegarde, menaces courantes ; pratique encadrée quand la base est posée.',
        speaker: 'Patricia Zamwana',
        org: 'MwasinaBitcoin',
      },
      {
        day: 'Vendredi',
        title: 'Lightning Network',
        kicker: 'Paiements',
        summary:
          'Paiements rapides, factures (invoices), bonnes pratiques et erreurs fréquentes.',
        speaker: 'Olaniran Laurent',
        org: 'BitDevs Cotonou',
      },
    ],
  },
  {
    week: 'Semaine 3',
    theme: 'Terrain et clôture',
    color: '#ede0cf',
    sessions: [
      {
        day: 'Jeudi',
        title: 'Bitcoin en Afrique',
        kicker: "Cas d'usage",
        summary:
          'Épargne, transferts, communautés, éthique de communication ; projet final court pour ancrer ton plan personnel.',
        speaker: 'Loïc Kassa',
        org: 'Bitcoin Mastermind',
        project: 'Projet final : « Mon plan Bitcoin sur 30 jours »',
      },
      {
        day: 'Vendredi',
        title: 'Panel de clôture',
        kicker: 'Terrain',
        summary:
          'Échanges avec des acteurs de terrain, questions ouvertes, rappels sécurité, et suite possible après la cohorte.',
        speaker: 'Barakana Guy Eudes + Chef Lopez',
        org: 'Free Tech Institute · Bitcoin Togo',
      },
    ],
  },
]

export const HEAR_ABOUT_OPTIONS = [
  'Réseaux sociaux',
  'Bouche à oreille',
  'Newsletter African Bitcoiners',
  'Événement ou meetup',
  'Autre',
]
