const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2025/11/image-scaled.png`,
  heroMobile: `${R2}/uploads/2025/11/Frame-1000008239.png`,
  trezorLogo: `${R2}/uploads/2024/10/Trezor_Academy_Logo_Black.svg`,
  overlayGroup2916: `${R2}/uploads/2025/11/Group-2916.png`,
  overlayGroup31: `${R2}/uploads/2025/11/Group-31.png`,
  overlayFrame: `${R2}/uploads/2025/11/Frame-1000008231.png`,
}

export const LINKS = {
  trezor: 'https://academy.trezor.io/',
  miab2024: '/the-most-impactful-african-bitcoiners-of-2024/',
  miab2023: '/the-most-impactful-african-bitcoiners-of-2023/',
  miab2022: '/the-most-impactful-african-bitcoiners-of-2022/',
}

export const OTHER_YEARS = [
  { label: 'The Most Impactful African Bitcoiners of 2024', href: '/the-most-impactful-african-bitcoiners-of-2024/' },
  { label: 'The Most Impactful African Bitcoiners of 2023', href: '/the-most-impactful-african-bitcoiners-of-2023/' },
  { label: 'The Most Impactful African Bitcoiners of 2022', href: '/the-most-impactful-african-bitcoiners-of-2022/' },
]

export type MIABPerson = {
  rank: number
  name: string
  country: string
  flag: string
  paragraphs: string[]
  photo: string
  contentBg: string
  photoBg: string
  photoOnLeft: boolean
  photoPosition: string
  photoSize: string
  photoOverlay: string
  overlayWidth: string
  overlayAlign: "start" | "center" | "end"
  overlayPadTop: string
  overlayWidthPx: number
  overlayHeightPx: number
  socials: { platform: string; url: string }[]
}

export const PEOPLE: MIABPerson[] = [
  {
    "rank": 1,
    "name": "Abubakar Nur Khalil",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Who is Abubakar Nur Khalil?</strong>",
      "In 2025, Abubakar Nur Khalil was appointed full-time CEO of <a href=\"https://x.com/btrust_builders?s=20\">Btrust</a>, accelerating open-source empowerment across the continent. He simultaneously led critical Bitcoin Core developments, focusing on fee estimation, Cluster Mempool, and v30.0 reviews.",
      "Through Btrust Builders, Abubakar launched advanced tracks like “Mastering Bitcoin” and “Rust for Bitcoiners,” equipping a new wave of developers for protocol-level contributions. He distributed Q3 grants to African innovators and secured funding for the Bitcoin Dev Kit (BDK) to enhance wallet interoperability. As both a core contributor and ecosystem leader, Abubakar is architecting the technical foundation of Africa’s Bitcoin future."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/12/abubakar-kalil-e1764943505492.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "-32px 0px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/abubakar-nur-khalil-29923b1a0/"
      },
      {
        "platform": "X",
        "url": "https://x.com/ihate1999?s=20"
      }
    ]
  },
  {
    "rank": 2,
    "name": "Carel van Wyk",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "<strong>Who is Carel van Wyk?</strong>",
      "In 2025, Carel van Wyk redefined retail utility in South Africa through <a href=\"https://x.com/MoneyBadgerPay\">MoneyBadger</a>. He expanded the network to cover half the nation’s Bitcoin payments infrastructure, integrating 1,600+ retail points for instant Lightning acceptance.",
      "His merchant API processed R7.7 million in H1 alone, marking a 46% surge. Most notably, Carel launched the Universal Translator via Scan to Pay, unlocking Bitcoin spending at over 650,000 stores. By partnering with Peach Payments and shifting users from hoarding to spending, Carel has positioned South Africa as the continent’s innovation hub for practical Bitcoin adoption."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/12/Carel-van-Wyk-e1764932098210.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "0px -47px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-31.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "250px",
    "overlayWidthPx": 607,
    "overlayHeightPx": 569,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/carelvwyk/"
      },
      {
        "platform": "X",
        "url": "https://x.com/carelvwyk?s=20"
      }
    ]
  },
  {
    "rank": 3,
    "name": "Hermann Vivier",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "<strong>Who is Hermann Vivier?</strong>",
      "In 2025, Hermann Vivier redefined community economics in South Africa. As the visionary behind <a href=\"https://x.com/BitcoinEkasi?s=20\">Bitcoin Ekasi</a>, he onboarded 30+ merchants in Mossel Bay, enabling Lightning payments for daily essentials like groceries. This shift boosted local spending and fostered genuine fiat independence.",
      "Beyond transactions, Hermann generated 20 tech jobs for youth, embedding Bitcoin skills into daily life and circulating sats for economic stability. His model inspired replications in Zambia and Kenya, driving Mossel Bay’s evolution from a pilot to a scalable operation. Hermann’s leadership has positioned South Africa as a global hub for inclusive, community-led Bitcoin growth."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/12/hermann-vivier.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "0px 9px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Frame-1000008231.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 690,
    "overlayHeightPx": 144,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/hermannvivier/"
      },
      {
        "platform": "X",
        "url": "https://x.com/vryfokkenou?s=20"
      }
    ]
  },
  {
    "rank": 4,
    "name": "Bernard Parah",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Who is Bernard Parah?</strong>",
      "In 2025, Bernard Parah solidified his legacy as CEO of <a href=\"https://x.com/Bitnob_official\">Bitnob</a>, bridging Africa to the global economy. He scaled the Strike partnership, enabling instant low-fee remittances to mobile money in Ghana and Kenya, while Bitnob’s API facilitated payouts in 5+ African currencies.",
      "Beyond infrastructure, Bernard championed talent, training many developers through initiatives like the massive Kampala Bootcamp, and Dadadevs bootcamp. By engaging regulators and advocating for compliant innovation, he is building the technical and legal rails for a sovereign African financial future."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/12/bernard.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "0px -47px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "250px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/bernard-parah-22437386/"
      },
      {
        "platform": "X",
        "url": "https://x.com/bernard_parah?s=20"
      }
    ]
  },
  {
    "rank": 5,
    "name": "Janet Maingi",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>Who is Janet Maingi?</strong>",
      "In 2025, Janet Maingi redefined the intersection of energy and Bitcoin as Co-Founder and COO of <a href=\"https://x.com/GridlessCompute\">Gridless</a>. She spearheaded operations to monetize stranded renewable energy, constructing data centers that anchor off-grid mining and rural electrification across the continent.",
      "Under her leadership, Gridless expanded beyond Kenya into Malawi and Zambia, proving that Bitcoin mining is a catalyst for energy abundance. Featured in the BBC and Bitcoin Magazine, Janet’s work has positioned Africa at the forefront of the global sustainable mining conversation, turning wasted power into economic opportunity for remote communities."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/12/Janet-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "-57px 9px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-31.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 607,
    "overlayHeightPx": 569,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/janet-maingi/"
      },
      {
        "platform": "X",
        "url": "https://x.com/nduku_jay?s=20"
      }
    ]
  },
  {
    "rank": 6,
    "name": "Femi Longe",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Who is Femi Longe?</strong>",
      "In 2025, Femi Longe drove global adoption strategy as the Global Bitcoin Lead at the <a href=\"https://x.com/HRF?s=20\">Human Rights Foundation</a>. He oversaw the Bitcoin Development Fund, distributing billions of satoshis to privacy and censorship-resistant projects across the Global South.",
      "Femi co-led the Bitcoin Humanitarian Alliance, funding critical initiatives. His efforts positioned Africa as a hub for sustainable Bitcoin innovation, with BDF grants enabling 20+ African projects to address local challenges, fostering agency and open-source building across the continent. By supporting Btrust Builders to train several senior engineers, he has cemented Africa as a hub for freedom tech. His leadership ensures Bitcoin remains a tool for human rights, not just speculation."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/12/Femi-Longe-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "0px -15px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "250px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/femi-longe/"
      },
      {
        "platform": "X",
        "url": "https://x.com/femilonge?s=20"
      }
    ]
  },
  {
    "rank": 7,
    "name": "Ronnie Mdawida",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>Who is Ronnie Mdawida?</strong>",
      "In 2025, Ronnie Mdawida redefined grassroots adoption as co-founder of <a href=\"https://www.afribit.africa/\" target=\"_blank\" rel=\"noopener\">Afribit</a>. He transformed Nairobi’s Kibera slum into a thriving Bitcoin circular economy, onboarding over 200 merchants to accept sats for essentials like food, water, and even washrooms.",
      "Ronnie’s initiatives, including a P2P marketplace, circulated sats locally, slashing transaction fees and reducing poverty for 5,000 residents. Ronnie proved that permissionless money is a practical tool for financial inclusion and poverty alleviation in East Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/12/Ronnie-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "0px -15px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Frame-1000008231.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 690,
    "overlayHeightPx": 144,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/ronnie-mdawida-326826325/"
      },
      {
        "platform": "X",
        "url": "https://x.com/AfribitKibera?s=20"
      }
    ]
  },
  {
    "rank": 8,
    "name": "Sabina Gitau",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>Who is Sabina Gitau?</strong>",
      "In 2025, Sabina Gitau cemented her status as a Bitcoin innovator as Co-Founder of <a href=\"https://tando.me/\" target=\"_blank\" rel=\"noopener\">Tando</a>. She has focused entirely on scaling Tando into a vital bridge for the region.",
      "Tando allows anyone from Africa to the diaspora to spend Bitcoin anywhere M-PESA is accepted. By enabling instant BTC-to-KES conversion, Tando solved the “restocking problem” for circular economy merchants and streamlined cross-border remittances. Under her co-leadership, Tando processed several million Lightning transactions, proving Bitcoin is everyday money within and across Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Sabina-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "0px -15px",
    "photoSize": "100% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-31.png",
    "overlayWidth": "85%",
    "overlayAlign": "start",
    "overlayPadTop": "100px",
    "overlayWidthPx": 607,
    "overlayHeightPx": 569,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/sabina-gitau-6497b725a/"
      },
      {
        "platform": "X",
        "url": "https://x.com/waithiraah?s=20"
      }
    ]
  },
  {
    "rank": 9,
    "name": "Heritage Falodun",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Who is Heritage Falodun?</strong>",
      "In 2025, Heritage Falodun cemented his status as a leading builder in Africa’s Bitcoin ecosystem. He launched <a href=\"https://www.spendin.co/\" target=\"_blank\" rel=\"noopener\">Spendin</a>, a B2C remittance infrastructure built on Tether and Lightning, which processed over 12,000 transactions and onboarded 1,700 users in just 13 weeks across Nigeria, Kenya, and South Africa.",
      "Beyond payments, Heritage drove education and sustainability. He championed “Greening the Hash” for renewable mining, hosted the Bitcoin in Nigeria media program, and empowered users on self-custody through <a href=\"https://digioats.io/\" target=\"_blank\" rel=\"noopener\">DigiOats</a> and Trezor Academy. His work successfully bridges the gap between traditional finance and decentralized economic resilience."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Heritage-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "0px -30px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Frame-1000008231.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "280px",
    "overlayWidthPx": 690,
    "overlayHeightPx": 144,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/heritagefalodun"
      },
      {
        "platform": "X",
        "url": "https://x.com/herrytheeagle"
      }
    ]
  },
  {
    "rank": 10,
    "name": "Nourou Kouta",
    "country": "Senegal",
    "flag": "🇸🇳",
    "paragraphs": [
      "<strong>Who is Nourou Mauhamadou Kouta?</strong>",
      "In 2025, Nourou cemented his role as a West African Bitcoin leader. As founder of <a href=\"https://x.com/bitcoin_sen\" target=\"_blank\" rel=\"noopener\">Bitcoin Sénégal</a>, he organized the third <a href=\"https://dakarbitcoindays.com/\" target=\"_blank\" rel=\"noopener\">Dakar Bitcoin Days</a>, uniting over m participants physically and virtually, with about 21 open source projects submitted, alongside a major Btrust-sponsored hackathon.",
      "Bridging the gap between Bitcoin and daily life, Nourou launched Banxaas, an app enabling seamless swaps between Bitcoin and mobile money. In just five months, it processed almost 7 million CFA francs in volume via Lightning. By producing content in Wolof and French, Nourou is dismantling language barriers and building a practical, circular Bitcoin economy in Senegal and Côte d’Ivoire."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Nourou-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "0px -15px",
    "photoSize": "100% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "250px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/nourou4them"
      }
    ]
  },
  {
    "rank": 11,
    "name": "Alphonse Mehounme",
    "country": "Cotonou",
    "flag": "🇧🇯",
    "paragraphs": [
      "<strong>Who is Alphonse Mehounme?</strong>",
      "In 2025, Alphonse Mehounme solidified his position as a pivotal architect of the Francophone Bitcoin ecosystem. As Co-Founder of <a href=\"https://btcmastermind.xyz/\" target=\"_blank\" rel=\"noopener\">Bitcoin Mastermind</a> and Lead Organizer of <a href=\"https://x.com/BitdevsCotonou\" target=\"_blank\" rel=\"noopener\">BitDevs Cotonou</a>, he is dismantling language barriers to democratize technical education in West Africa.",
      "Alphonse expanded Bitcoin Benin’s reach to over 1,000 learners through localized workshops and the Bitcoin School initiative. A fierce advocate for translation, he bridged the gap between global Bitcoin resources and French-speaking communities. Through his contributions to Flash and the PlanB Network, Alphonse is actively connecting grassroots users to financial sovereignty, positioning Benin as a critical hub in the continental movement."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Alphonse-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "0px 15px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-31.png",
    "overlayWidth": "85%",
    "overlayAlign": "start",
    "overlayPadTop": "100px",
    "overlayWidthPx": 607,
    "overlayHeightPx": 569,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/alphonsemehounme/"
      },
      {
        "platform": "X",
        "url": "https://x.com/mehounme?s=20"
      }
    ]
  },
  {
    "rank": 12,
    "name": "Brindon Mwiine",
    "country": "Uganda",
    "flag": "🇺🇬",
    "paragraphs": [
      "<strong>Who is Brindon Mwiine?</strong>",
      "In 2025, Brindon Mwiine solidified his role as a vital grassroots builder in Uganda. Through <a href=\"https://gorilla-sats.com/\" target=\"_blank\" rel=\"noopener\">Gorilla Sats</a> and <a href=\"https://x.com/BitcoinKampala\" target=\"_blank\" rel=\"noopener\">Bitcoin Kampala</a>, he empowered over 200 locals with practical self-custody and Lightning skills.",
      "Brindon pioneered Uganda’s first renewable-powered community miner and educated 115 rural schoolchildren on financial sovereignty. Blending technology with care, his initiatives enabled a local orphanage to raise 40 million sats and process 70% of its payments in Bitcoin. As a leader for the Circular Bitcoin Africa Fund, Mwiine proves that African adoption thrives through dedicated, community-focused action."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Brindon-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "0px -27px",
    "photoSize": "100% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "230px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/brindon-mwiine/"
      },
      {
        "platform": "X",
        "url": "https://x.com/BrindonMwiine?s=20"
      }
    ]
  },
  {
    "rank": 13,
    "name": "Prince Ogbonna",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Who is Prince Ogbonna?</strong>",
      "In 2025, Prince Ogbonna emerged as a leading Bitcoin entrepreneur in Nigeria, focused on driving practical Lightning adoption through his platform, <a href=\"https://ipaybtc.app/\" target=\"_blank\" rel=\"noopener\">iPayBTC</a>.",
      "Launched in 2023, iPayBTC is a critical, non-custodial Lightning wallet that allows users to make instant, low-fee payments for essentials like airtime, data, and bills. Prince strategically positioned iPayBTC as Bitcoin-as-cash, focusing on accessibility for non-technical users. He scaled the platform through merchant integrations and student networks like Bitcoin On Campus, onboarding users for daily transactions and cross-border payments. This effort is critical to the push to Bitcoinize Africa, proving Lightning Network’s utility far beyond simple speculation."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Prince_MIAB-removebg-preview-e1763728448271.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "0px -22px",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "200px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/princeogbonna/"
      },
      {
        "platform": "X",
        "url": "https://x.com/princejoj0?s=20"
      }
    ]
  },
  {
    "rank": 14,
    "name": "Mukungu Felix",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>Who is Mukungu Felix?</strong>",
      "Mukungu Felix founded <a href=\"https://www.thecore.africa/\" target=\"_blank\" rel=\"noopener\">The Core</a>, a Nairobi-based Bitcoin hub focused on youth builder education and Lightning Network adoption across Africa.",
      "In 2025, The Core became a central training ground, successfully onboarding over 500+ youth to practical Bitcoin tools and mentoring 300+ builders. The organization amplified community engagement by hosting 7+ meetups and two major Bitcoin Unconferences.",
      "The Core also distributed over 300,000+ sats in rewards and facilitated 20+ freelance work opportunities, helping reduce cross-border remittance costs in local pilots by up to 30%."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Felix-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "0px 15px",
    "photoSize": "100% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Frame-1000008231.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "280px",
    "overlayWidthPx": 690,
    "overlayHeightPx": 144,
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/MukunguFelix?s=20"
      }
    ]
  },
  {
    "rank": 15,
    "name": "Theophilus Isah",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Who is Theophilus Isah?</strong>",
      "In 2025, Theophilus Isah, CEO of <a href=\"https://mavapay.money/\" target=\"_blank\" rel=\"noopener\">Mavapay</a>, revolutionized Bitcoin adoption in West Africa through payment innovation and developer education. With Mavapay, he provided essential fiat-to-Lightning on-ramps and empowered circular economies. His collaboration with BTCPayServer yielded an open-source fiat bridge, further simplifying Bitcoin acceptance.",
      "A champion for open-source, Theophilus co-created the Lightning observability tool Nodegaze and mentors over 500 engineers as a Faculty Coordinator for btrust Builders. He actively facilitates developer bootcamps across Nigeria and Ghana. His infrastructure has processed over $600,000 in cross-border Lightning payments across the region."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Theophilus-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "top center",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-31.png",
    "overlayWidth": "85%",
    "overlayAlign": "start",
    "overlayPadTop": "100px",
    "overlayWidthPx": 607,
    "overlayHeightPx": 569,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/theophilus-isah/"
      },
      {
        "platform": "X",
        "url": "https://x.com/Extheo?s=20"
      }
    ]
  },
  {
    "rank": 16,
    "name": "Mawufemor Kofi Folivi",
    "country": "Ghana",
    "flag": "🇬🇭",
    "paragraphs": [
      "<strong>Who is Mawufemor Kofi Folivi?</strong>",
      "In 2025, Mawufemor Kofi Folivi, founder of <a href=\"https://www.bitcoindua.org/\" target=\"_blank\" rel=\"noopener\">Bitcoin Dua</a> and Managing Director of <a href=\"https://tahuf.com/\" target=\"_blank\" rel=\"noopener\">Talent Tahuf Foundation</a>, drove significant Bitcoin adoption in Ghana. He spearheaded the integration of Bitcoin and STEM education into schools, empowering youth with technical and economic skills.",
      "His work emphasizes local empowerment in Agbozume, building a circular economy that combines community development with practical, everyday Bitcoin usage, not just financial theory. Mawufemor’s leadership is making Bitcoin accessible in regions often away from mainstream discourse, fostering skills, inclusion, and building a foundation for a resilient, locally-driven Bitcoin ecosystem in Ghana."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Mawufemor-Kofi-Folivi-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "0px 15px",
    "photoSize": "100% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "250px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/mawufemor-kofi-folivi-256b578a/"
      },
      {
        "platform": "X",
        "url": "https://x.com/MawufemorFoli?s=20"
      }
    ]
  },
  {
    "rank": 17,
    "name": "Glenn Jooste",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "<strong>Who is Glenn Jooste?</strong>",
      "In 2025, Glenn Jooste organized several meetups & workshops via <a href=\"https://bitcoinubuntu.org/\" target=\"_blank\" rel=\"noopener\">Bitcoin Ubuntu</a> and contributed to dozens of online classes, empowering over 1,000 students in Swellendam and across the continent.",
      "His hands-on training in Bitcoin fundamentals, self-custody, and Lightning has enabled participants to run nodes, build circular economies, onboard merchants, and send low-cost remittances, and is currently providing technical support to over 34 circular economy projects across Africa.",
      "A major contributor to over half a dozen independent African education projects such as: The Core, Bitcoin Africa Story, Bitcoin Boma, Bitsavers Eduhub, Citrusrate, and School of Satoshi. Glenn’s work with multiple communities was featured in the Q3 2025 Africa Bitcoin Ecosystem Infographic."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Gleen-Jooste-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "top center",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Frame-1000008231.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "280px",
    "overlayWidthPx": 690,
    "overlayHeightPx": 144,
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/BitcoinUbuntu"
      }
    ]
  },
  {
    "rank": 18,
    "name": "Gloire Wanzavalere",
    "country": "DR Congo",
    "flag": "🇨🇩",
    "paragraphs": [
      "<strong>Who is Gloire Kambale Wanzavalere?</strong>",
      "He is a leading Bitcoin advocate in Goma, DRC, founder of <a href=\"https://bridgesats.com/\" target=\"_blank\" rel=\"noopener\">Bridgesats</a>, and co-founder of <a href=\"https://bebop.kiveclair.com/\" target=\"_blank\" rel=\"noopener\">Kiveclair</a> & the <a href=\"https://afrobitcoin.org/\" target=\"_blank\" rel=\"noopener\">Africa Bitcoin Conference</a>.",
      "In 2025, his impact was profound. He partnered with the University of Goma to launch a Blockchain/AI center backed by Tether Africa, an initiative that included a 500 Bitcoin donation and the “École Bitcoin” training program, he also contributes to be-BOP.io, an open-source, self-hosted sales platform with Bitcoin and Nostr integration enabling unbanked merchants to stack sats without middlemen.",
      "Through Kiveclair, he runs vital meetups on self-custody and Lightning. As co-founder of the Africa Bitcoin Conference, he is helping organize the 2025 Mauritius event, making Goma a symbol of Bitcoin resilience."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Gloire-MIAB.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "0px 15px",
    "photoSize": "100% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/gloire-wanzavalere-8465a2177/"
      },
      {
        "platform": "X",
        "url": "https://x.com/GloireKW"
      }
    ]
  },
  {
    "rank": 19,
    "name": "Nzonda Fotsing",
    "country": "Cameroon",
    "flag": "",
    "paragraphs": [
      "<strong>Who is Nzonda Fotsing Sr.?</strong>",
      "In 2025, Nzonda Fotsing Sr. (@BitcoinSophist) emerged as one of Francophone Africa’s leading Bitcoin educators. Based in Cameroon, he focuses on expanding Bitcoin education across French-speaking Africa.",
      "As convener of <a href=\"https://www.afriquebitcoin.org/en\" target=\"_blank\" rel=\"noopener\">Conférence Bitcoin Afrique</a>, he organized the first major Bitcoin-only gathering for the region. Nzonda also authored “<a href=\"https://www.amazon.com/Bitcoin-Kids-Financial-Literacy/dp/B0D8PXLG3Q\" target=\"_blank\" rel=\"noopener\">Bitcoin Kids</a>,” a comic book teaching financial literacy to children and families. With French translations, he is making Bitcoin accessible in communities with low banking access, particularly in rural Cameroon."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Nzonda-image.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "top center",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-31.png",
    "overlayWidth": "85%",
    "overlayAlign": "start",
    "overlayPadTop": "100px",
    "overlayWidthPx": 607,
    "overlayHeightPx": 569,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/nzondafotsing"
      },
      {
        "platform": "X",
        "url": "https://x.com/BitcoinSophist?s=20"
      }
    ]
  },
  {
    "rank": 20,
    "name": "₿elyï No₿el ⚡",
    "country": "Burundi",
    "flag": "🇧🇮",
    "paragraphs": [
      "<strong>Who is Belyï Nobel?</strong>",
      "Belyï Nobel Kubwayo, founder of <a href=\"https://btcshule.com/\" target=\"_blank\" rel=\"noopener\">BTC Shule</a>, is a prominent Burundian Bitcoin advocate focusing on self-custody and financial inclusion for unbanked rural areas. ​",
      "In 2025, Belyï and BTC Shule established Burundi’s first circular Bitcoin economy in Winteko Village.",
      "Key initiatives included graduating 40+ youth from MyFirstBitcoin programs, hosting the nation’s first Bitcoin hackathon, translating the Bitcoin White Paper into Kirundi, and raising 1M sats for Starlink + solar infrastructure to connect 300 residents. ​Alongside co-founders and global partners, Belyï has made Bitcoin everyday money for essential purchases, boosting entrepreneurship and resilience in remote Burundian villages."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Belyi_MIAB-image-2-e1762945471730.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "-95px -115px",
    "photoSize": "180% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Group-2916.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "280px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://bi.linkedin.com/in/bely%C3%AF-nobel-kubwayo-c%E2%82%BFp-50874a198"
      },
      {
        "platform": "X",
        "url": "https://x.com/belyi_nobel"
      }
    ]
  },
  {
    "rank": 21,
    "name": "Grant Gombwa",
    "country": "Malawi",
    "flag": "🇲🇼",
    "paragraphs": [
      "Grant Gombwa is a leading Malawian Bitcoin advocate and educator, and the Co-Executive Director of <a href=\"https://bitcoinboma.org/\" target=\"_blank\" rel=\"noopener\">Bitcoin Boma Coalition</a>.",
      "​Starting as a student organizer, he has become one of Malawi’s most influential voices for Bitcoin, focusing on promoting self-custody, financial empowerment, and economic resilience.<br />​In 2025, Grant and Bitcoin Boma significantly advanced the use of Bitcoin in Malawi by building a circular economy through various initiatives. These included training 100+ learners via the Bitcoin Diploma Program, hosting education workshops at universities, and supporting merchant onboarding and live Lightning payments in Mulanje.",
      "​Grant, along with his co-founders, Nick Twyman and Ian Foster, has successfully helped integrate Bitcoin from a concept into a daily reality across communities in Malawi."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Grant-Gombwa-MIAB-image.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "-140px -45px",
    "photoSize": "180% auto",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/11/Frame-1000008231.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "350px",
    "overlayWidthPx": 690,
    "overlayHeightPx": 144,
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://mw.linkedin.com/in/grant-gombwa-a032a423a"
      },
      {
        "platform": "X",
        "url": "https://x.com/GrantGombwa3"
      }
    ]
  }
]