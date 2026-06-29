const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  trezorLogo: `${R2}/uploads/2024/10/Trezor_Academy_Logo_Black.svg`,
}

export const LINKS = {
  trezor: 'https://academy.trezor.io/',
}

export const INTRO = "Meet Africa’s trailblazers shaping the continent’s financial future! Our 2024 Most Impactful African Bitcoiners list celebrates leaders, educators, and innovators whose Proof of Work for 2024 has driven Bitcoin’s promise of freedom and economic empowerment. Nominated by communities across Africa, with six council votes and in-depth research, these pioneers are breaking financial barriers and leading Africa toward a decentralized future."
export const TREZOR_NOTE = "<strong>Each winner will receive a <a href=\"https://trezor.io/\" target=\"_blank\" rel=\"noopener\">Trezor</a> wallet from <a href=\"https://academy.trezor.io/\" target=\"_blank\" rel=\"noopener\">Trezor Academy</a>, to be distributed at the African Bitcoin Conference 2024 or mailed to them.</strong>"
export const COMMUNITY_NOTE = "Want to stay updated on impactful Bitcoin stories and initiatives? <strong><a href=\"https://bitcoiners.africa/about-us/#signup\" rel=\"noopener\">Join our community here</a></strong>."

export const OTHER_YEARS = [
  { label: 'The Most Impactful African Bitcoiners of 2025', href: '/the-most-impactful-african-bitcoiners-of-2025/' },
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
  rankBadgeImage?: string
  role?: string
  socials: { platform: string; url: string }[]
}

export const PEOPLE: MIABPerson[] = [
  {
    "rank": 1,
    "name": "Lorraine Marcel",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "Lorraine Marcel, a Kenyan entrepreneur and Bitcoin advocate, empowers African women through financial education and Bitcoin adoption. She founded <a href=\"https://btcdada.com/\" target=\"_blank\" rel=\"noopener\">Bitcoin Dada</a>—&#8217;Dada&#8217; meaning &#8216;sister&#8217; in Swahili—a virtual program offering live, interactive classes on financial literacy and Bitcoin basics, creating a safe, supportive space for women across the continent. Under her leadership, Bitcoin Dada has grown into a thriving community, with graduates securing roles in Bitcoin-related ventures.",
      "Lorraine also established the <a href=\"https://x.com/DadaDevs\" target=\"_blank\" rel=\"noopener\">Dada Developers Club (Dada Devs)</a> to empower African women in Bitcoin development. The initiative addresses resource gaps and gender biases by offering specialized education, hands-on training, and a strong support network.",
      "Her work has inspired leaders like Sabina Gitau, Co-founder of Tando, and Angella Jude, co-host of Bitcoin in Africa. Through Bitcoin Dada and Dada Devs, Lorraine drives financial inclusion and empowers women across Africa, fostering a new generation of Bitcoin advocates."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/12/Most-Impactful-Bitcoiner-2024-1-Lorraine-Marcel.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-First-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/DadaDevs"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/marcelorraine"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/lorraine-marcel-53649586/"
      }
    ],
    "role": "Founder of Bitcoin DADA."
  },
  {
    "rank": 2,
    "name": "Hermann Buhr Vivier",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Hermann Buhr Vivier is a South African entrepreneur and Bitcoin advocate focused on community development and financial inclusion. He founded <a href=\"https://www.thesurferkids.com/\" target=\"_blank\" rel=\"noopener\">Bitcoin Ekasi</a>, inspired by El Salvador&#8217;s Bitcoin Beach, to build a Bitcoin-based economy in Mossel Bay&#8217;s township, educating locals and promoting daily Bitcoin use to foster financial independence.",
      "Beyond Bitcoin Ekasi, Hermann led funding rounds for Bitcoin Circular Economy Projects across Africa, supporting similar initiatives and expanding Bitcoin&#8217;s impact continent-wide. He also co-founded <a href=\"https://www.thesurferkids.com/\" target=\"_blank\" rel=\"noopener\">The Surfer Kids</a>, a non-profit empowering underprivileged youth through surfing, and launched UnravelSurf to blend surfing with education and life skills for marginalized children.",
      "Hermann’s work unites Bitcoin, community projects, and sport to drive economic empowerment and positive change, showcasing the transformative potential of education, technology, and passion."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/12/Most-Impactful-Bitcoiner-2024-2-Hermann-Buhr-Vivier.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Second-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/vryfokkenou"
      }
    ],
    "role": "Founder of Bitcoin Ekasi and Co-founder of The Surfer Kids."
  },
  {
    "rank": 3,
    "name": "Heritage Falodun",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Heritage Falodun is a Nigerian computer scientist, software engineer, and Bitcoin advocate making significant strides in Bitcoin education and adoption in Africa. As the CEO of <a href=\"https://digioats.io/\" target=\"_blank\" rel=\"noopener\">DigiOats</a>, he focuses on educating clients about digital asset adoption, trading, and secure storage. He is also a contributing writer for <a href=\"https://bitcoinmagazine.com/\" target=\"_blank\" rel=\"noopener\">Bitcoin Magazine</a>, addressing topics like Bitcoin mining in Nigeria and regulatory challenges.",
      "Heritage co-hosts the &#8220;<a href=\"https://www.instagram.com/bitcoininnigeriamedia?igsh=MXR5a3U5dTJjOGs4dQ%3D%3D&amp;utm_source=qr\" target=\"_blank\" rel=\"noopener\">Bitcoin In Nigeria</a>&#8221; podcast, focusing on Bitcoin education and adoption within Africa.",
      "His work highlights Bitcoin&#8217;s transformative potential for financial inclusion and empowerment, with a strong focus on Nigeria. Through DigiOats, Heritage advances Bitcoin literacy by organizing meetups and hosting educational classes, empowering individuals and communities to embrace decentralized financial principles across Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/12/Most-Impactful-Bitcoiner-2024-3-Heritage-Falodun.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Third-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/herrytheeagle"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/heritagefalodun?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACMrn-UBiYsVe6c0Jr5niMtTZorG1tNYJos&#038;lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B7D8tt77ATNew7UU4vbJRig%3D%3D"
      }
    ],
    "role": "Co-founder and CEO of DigiOats."
  },
  {
    "rank": 4,
    "name": "Abubakar Nur Khalil",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Abubakar Nur Khalil is a Nigerian Bitcoin developer and entrepreneur known for his impactful contributions to Africa’s Bitcoin ecosystem. A self-taught programmer, he began coding for Bitcoin Core in 2017 and has since become a leading advocate for Bitcoin development on the continent.",
      "At just 22, Abubakar was appointed to the board of <a href=\"https://www.btrust.tech/\" target=\"_blank\" rel=\"noopener\">₿trust</a>, a non-profit funded by Jack Dorsey and Jay-Z, where he oversees initiatives funding Bitcoin education and development in Africa and India. As CEO of <a href=\"https://rcrsv.xyz/\" target=\"_blank\" rel=\"noopener\">Recursive Capital</a>, he invests in early-stage startups building infrastructure to advance Bitcoin adoption and innovation in Africa.",
      "Abubakar is also developing <a href=\"https://x.com/voltbtc\" target=\"_blank\" rel=\"noopener\">Volt</a>, a Bitcoin wallet tailored to Africa, designed to address regional challenges and enhance accessibility, promoting financial inclusion through decentralized finance. His work continues to shape the future of Bitcoin development and adoption across Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/12/Most-Impactful-Bitcoiner-2024-4-Abubakar-Nur-Khalil.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Fourth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/voltbtc"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/ihate1999"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/abubakar-nur-khalil-29923b1a0?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC8FVtUBZc1SNFpFWEXfF7pPut_Dxp-QegY&#038;lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BBB00wlc7QKmTV4ysgyVoFA%3D%3D"
      }
    ],
    "role": "CEO Btrust Builders, Founder Recursive Capital & Volt Bitcoin Core Contributor"
  },
  {
    "rank": 5,
    "name": "Janet Maingi",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "Janet Maingi is a Kenyan entrepreneur and technology executive driving innovation at the intersection of renewable energy and Bitcoin mining in Africa. As co-founder and COO of <a href=\"https://gridlesscompute.com/\" target=\"_blank\" rel=\"noopener\">Gridless</a>, she spearheads efforts to monetize excess energy from small-scale renewable energy producers, promoting energy access and financial inclusion in rural Africa.",
      "With a Master of Business Administration from Kingston University and a Bachelor of Commerce in Banking and Finance from Kenyatta University, Janet combines her academic expertise with extensive leadership experience to advance technology-driven solutions.",
      "Under her leadership, <a href=\"https://thisisafrica.me/politics-and-society/bitcoin-gridless-acquires-2m-for-east-african-expansion/#:~:text=Gridless%2C%20an%20environmentally%20minded%20bitcoin,led%20by%20Factor%5Be%5D.\" target=\"_blank\" rel=\"noopener\">Gridless secured a $2 million seed investment in December 2022</a>, backed by Jack Dorsey&#8217;s Block and Stillmark, to expand operations and bring affordable electricity to rural East African communities. Janet’s work exemplifies sustainable development and positions her as a key figure in leveraging Bitcoin mining for economic empowerment in Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/12/Most-Impactful-Bitcoiner-2024-5-Janet-Maingi.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Fifth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/nduku_jay"
      }
    ],
    "role": "Co-Founder and Chief Operating Officer of Gridless."
  },
  {
    "rank": 6,
    "name": "Kal Kassa",
    "country": "Ethiopia",
    "flag": "🇪🇹",
    "paragraphs": [
      "Kal Kassa is an Ethiopian entrepreneur and prominent Bitcoin advocate dedicated to advancing financial inclusion and technological innovation in Africa. Kal has been instrumental in <a href=\"https://africanbitcoinmining.com/\" target=\"_blank\" rel=\"noopener\">Ethiopia&#8217;s foray into Bitcoin mining</a>, aligning with the government&#8217;s $250 million data mining initiative aimed at economic growth through technology and energy resource utilization.",
      "Beyond his executive role, Kassa founded <a href=\"https://github.com/BitcoinBirr\" target=\"_blank\" rel=\"noopener\">BitcoinBirr</a>, an open-source initiative focused on educating Ethiopians about Bitcoin. This project has translated key Bitcoin literature into local languages, enhancing accessibility and understanding.",
      "Kassa&#8217;s efforts have garnered international attention, highlighting Ethiopia&#8217;s potential as a significant player in the global Bitcoin mining industry. His work emphasizes the transformative power of Bitcoin in fostering economic development and financial empowerment across Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/12/Most-Impactful-Bitcoiner-2024-6-Kal-Kassa.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Sixth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/KalKassa"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/kalkassa/"
      }
    ],
    "role": "Founder of BitcoinBirr"
  },
  {
    "rank": 7,
    "name": "Carel van Wyk",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Carel van Wyk is a South African software engineer and entrepreneur renowned for his significant contributions to the Bitcoin ecosystem in Africa. He co-founded <a href=\"https://www.snapscan.co.za/\" target=\"_blank\" rel=\"noopener\">SnapScan</a>, a mobile payment solution that has become widely adopted in South Africa, and <a href=\"https://www.luno.com/\" target=\"_blank\" rel=\"noopener\">Luno</a>, one of the continent&#8217;s largest cryptocurrency exchanges. In 2020, he founded <a href=\"https://www.moneybadger.co.za/\" target=\"_blank\" rel=\"noopener\">MoneyBadger</a> (formerly CryptoConvert), a company dedicated to simplifying and securing Bitcoin payments. Through MoneyBadger, Carel played a pivotal role in integrating Bitcoin Lightning payments into Pick n Pay, one of Africa&#8217;s largest retail chains, facilitating seamless Bitcoin transactions for customers.",
      "His efforts have been instrumental in bridging the gap between traditional retail and Bitcoin payments, promoting broader Bitcoin adoption in the region."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/12/Most-Impactful-Bitcoiner-2024-7-Carel-Van-Wyk.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Seventh-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/carelvwyk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/carelvwyk/"
      }
    ],
    "role": "Founder of MoneyBadger."
  },
  {
    "rank": 8,
    "name": "Nikolai Tjongarero",
    "country": "Namibia",
    "flag": "🇳🇦",
    "paragraphs": [
      "Nikolai &#8220;OKIN&#8221; Tjongarero, a Namibian Bitcoin advocate, entrepreneur, and educator, is dedicated to empowering people through Bitcoin and transforming communities. As a prominent voice in Africa’s Bitcoin space, he focuses on creating practical tools and initiatives for everyday users.",
      "OKIN&#8217;s standout contribution is the <a href=\"https://sovereignkey.carrd.co/\" target=\"_blank\" rel=\"noopener\">Sovereign Key</a>, an open-source toolkit that simplifies Bitcoin management and digital privacy, combining a Bitcoin node, Sparrow Wallet, and other tools to give users control over their finances and data.",
      "Through <a href=\"https://twitter.com/EasySats_\" target=\"_blank\" rel=\"noopener\">EasySats</a>, OKIN helps Namibians easily buy and save Bitcoin, while his work with <a href=\"https://linktr.ee/btcnamibia\" target=\"_blank\" rel=\"noopener\">Bitcoin Mining Namibia</a> explores leveraging local resources and renewable energy for mining.",
      "As an educator, OKIN organizes workshops and meetups, sharing knowledge through initiatives like <strong>#FromTheJump</strong> and <strong>TPOK</strong>, which aim to break down barriers and show how Bitcoin can transform lives.",
      "At his core, OKIN believes in Bitcoin’s power to bring financial freedom to Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-8-Nikolai-Tjongarero.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Eighth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/EasySats_"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/OKIN_17"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/okin/"
      }
    ],
    "role": "Founder of Bitcoin Mining Namibia and Easy Sats"
  },
  {
    "rank": 9,
    "name": "Brindon Mwiine",
    "country": "Uganda",
    "flag": "🇺🇬",
    "paragraphs": [
      "Brindon Mwiine is a Ugandan Bitcoin advocate and entrepreneur dedicated to promoting Bitcoin adoption and education in Africa. He is the founder of <a href=\"https://gorilla-sats.com/\" target=\"_blank\" rel=\"noopener\">Gorilla Sats</a>, an initiative focused on building a Bitcoin circular economy in Uganda, and <a href=\"https://twitter.com/btchubafrica\" target=\"_blank\" rel=\"noopener\">Bitcoin Kampala</a>, a platform that spearheads Bitcoin advocacy across the country. Through these initiatives, Brindon organizes educational events, workshops, and community engagements to raise awareness about Bitcoin&#8217;s potential for financial inclusion and economic empowerment.",
      "Since discovering Bitcoin in 2016, his dedication has grown into empowering communities with decentralized financial tools. As co-host of the <a href=\"https://www.bitcoininafricashow.com/\" target=\"_blank\" rel=\"noopener\"><em>Bitcoin In Africa Show</em></a>, he amplifies the voices of innovators shaping Africa’s Bitcoin ecosystem.",
      "Brindon has also used Bitcoin to fund an orphanage, showcasing its impact in addressing social challenges. His work continues to advance Bitcoin adoption and education across Uganda and Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-12-Brindon-Mwiine.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Ninth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/btchubafrica"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/BrindonMwiine"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/brindon-mwiine/"
      }
    ],
    "role": "Founder of Gorilla Sats and Bitcoin Kampala community."
  },
  {
    "rank": 10,
    "name": "Craig Raw",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Craig Raw, a South African software developer and entrepreneur, is the creator and sole developer of <a href=\"https://sparrowwallet.com/\" target=\"_blank\" rel=\"noopener\">Sparrow Wallet</a>, a Bitcoin-only desktop application focused on security, privacy, and usability. Launched in 2020, Sparrow Wallet supports multisignature setups, CoinJoin integration for privacy, and compatibility with hardware wallets, empowering users with full control over their Bitcoin transactions.",
      "Raw&#8217;s work addresses gaps in existing wallets, offering tools for enhanced privacy and distributed self-custody. Notably, Sparrow Wallet enables free multisignature wallet setups for users without hardware wallets, promoting secure Bitcoin management.",
      "A strong advocate for Bitcoin privacy and self-custody, Raw shares his expertise at events like Adopting Bitcoin Cape Town 2024, further cementing his reputation as a leading voice in the Bitcoin community."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-10-Craig-Raw.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Tenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/craigraw"
      }
    ],
    "role": "Creator of Sparrow Wallet"
  },
  {
    "rank": 11,
    "name": "Gloire Wanzavalere",
    "country": "DR Congo",
    "flag": "🇨🇩",
    "paragraphs": [
      "Gloire Wanzavalere is a Congolese entrepreneur and Bitcoin advocate driving Bitcoin adoption and education in Africa. He co-founded <a href=\"https://kiveclair.com/en/\" target=\"_blank\" rel=\"noopener\">Kiveclair</a>, inspired by El Salvador&#8217;s Bitcoin Beach, to create a Bitcoin-based circular economy in Goma, DRC. Kiveclair educates the local community through meetups, training sessions for activists and journalists, and supports refugees while planning its first local Bitcoin conference.",
      "Gloire also co-founded the <a href=\"https://afrobitcoin.org/\" target=\"_blank\" rel=\"noopener\">Africa Bitcoin Conference</a>, an annual event that brings together Bitcoin stakeholders from across Africa and beyond. The conference serves as a platform for thought leaders, innovators, policymakers, human rights activists, and developers to explore the latest developments and opportunities in the Bitcoin Space within the African continent.",
      "Through these initiatives, Gloire empowers African communities with the knowledge and tools to harness Bitcoin, advancing financial inclusion and economic growth."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-11-Gloire-Wanzavalere.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Eleventh-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/GloireKW"
      }
    ],
    "role": "Co-Founder of Kiveclair & Africa Bitcoin Conference"
  },
  {
    "rank": 12,
    "name": "Sabina Gitau",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "Sabina Gitau is a Kenyan entrepreneur and Bitcoin advocate who has significantly contributed to the Bitcoin landscape in Africa. As the Growth Lead and Content Creator at <a href=\"https://btcdada.com/\" target=\"_blank\" rel=\"noopener\">Bitcoin Dada</a>, she has played a pivotal role in educating and empowering women in Kenya about Bitcoin and financial literacy. Her efforts have fostered a supportive community that encourages women to explore and engage with Bitcoin, promoting financial inclusion and economic empowerment.",
      "Building on her experience and passion for Bitcoin, Sabina Co-founded <a href=\"https://tando.me/\" target=\"_blank\" rel=\"noopener\">Tando</a>, an application designed to facilitate seamless Bitcoin spending in Kenya. Tando aims to bridge the gap between Bitcoin users and merchants, making it easier for individuals to use Bitcoin for everyday transactions. This initiative reflects her commitment to integrating Bitcoin into the daily lives of Kenyans, enhancing accessibility and usability.",
      "Through Bitcoin Dada and Tando, Sabina drives Bitcoin adoption and innovation in Africa, empowering women and fostering a more inclusive financial future."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-12-Sabina-Gitau.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Twelfth-Bitcoiner.png",
    "socials": [
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/sabina-gitau-6497b725a/"
      }
    ],
    "role": "Co-Founder of Tando"
  },
  {
    "rank": 13,
    "name": "James Otudor",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "James Otudor is a Nigerian politician and dedicated Bitcoin advocate, passionate about promoting financial freedom and Bitcoin adoption in Nigeria. Starting his Bitcoin journey after high school through a fascination with ICT, he quickly became a vocal supporter of decentralized finance.",
      "As a politician, Otudor champions Bitcoin&#8217;s potential for financial inclusion and systemic change in Nigeria. In August 2024, <a href=\"https://cointelegraph.com/news/nigerian-activist-sues-government-protect-crypto-rights\" target=\"_blank\" rel=\"noopener\">James sued the Nigerian government to defend citizens&#8217; rights to trade and own Bitcoin</a>, challenging restrictive actions like blocking access to exchange platforms. This bold legal move brought national attention to issues of human rights and regulatory overreach.",
      "James is the founder of <a href=\"https://x.com/BitcoinCalabar\" target=\"_blank\" rel=\"noopener\">Calabar Bitcoin Club</a>, which fosters a Bitcoin-powered local economy through education, merchant adoption, and community empowerment. By hosting workshops, meetups, and partnering with businesses, the club advances Bitcoin adoption and financial inclusion in Cross River State. He is also a contributor to <a href=\"https://ipaybtc.app/\" target=\"_blank\" rel=\"noopener\">IPayBTC</a>, a platform aimed at facilitating Bitcoin transactions and expanding its usability in everyday life.",
      "Through his work in politics, education, and advocacy, James Otudor plays a pivotal role in shaping Bitcoin&#8217;s future in Nigeria."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-13-James-Otudor-2.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Thirteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/BitcoinCalabar"
      },
      {
        "platform": "X",
        "url": "https://x.com/dgr8otudor"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/dgr8otudor100/"
      }
    ],
    "role": "Founder of Calabar Bitcoin Club."
  },
  {
    "rank": 14,
    "name": "Felix Mukungu",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "Felix Mukungu is a Kenyan Bitcoin educator and advocate, recognized for his significant contributions to Bitcoin education and adoption in Africa. He is the founder of <a href=\"https://twitter.com/thecore21m\" target=\"_blank\" rel=\"noopener\">The Core</a>, a Nairobi-based platform dedicated to promoting Bitcoin awareness through free education, content creation, and community engagement. The Core offers comprehensive Bitcoin education via the Bitcoin Diploma course, aiming to empower individuals with the knowledge to harness Bitcoin for personal growth.",
      "In addition to his educational initiatives, Felix launched the #100biz_ke challenge, aiming to onboard 100 Kenyan businesses to accept Bitcoin as a payment method by the end of 2024. This initiative seeks to foster a Bitcoin circular economy in Kenya, encouraging merchants to integrate Bitcoin into their payment systems.",
      "Felix&#8217;s dedication to Bitcoin education and adoption has positioned him as a key figure in Kenya&#8217;s Bitcoin landscape, advocating for financial inclusion and technological empowerment through Bitcoin."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-14-Felix-Mukungu-2.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Fourteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/thecore21m"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/MukunguFelix"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/felix-divoar-573a2a250/"
      }
    ],
    "role": "Founder of The Core"
  },
  {
    "rank": 15,
    "name": "Loic Kassamoto",
    "country": "Benin",
    "flag": "🇧🇯",
    "paragraphs": [
      "Loïc Kassamoto, a prominent Bitcoin advocate and entrepreneur from Benin, is committed to driving Bitcoin adoption and education across West Africa. As the Convener of <a href=\"https://btcmastermind.xyz/\" target=\"_blank\" rel=\"noopener\">Bitcoin Mastermind</a> and <a href=\"https://twitter.com/BitcoinBenin\" target=\"_blank\" rel=\"noopener\">Bitcoin Benin</a> he organizes conferences, host meetups, training sessions, and events to educate individuals and businesses on Bitcoin&#8217;s potential for financial inclusion, fostering a thriving community of enthusiasts and entrepreneurs.",
      "Loïc is also working on  <a href=\"https://bitcoinflash.xyz/\" target=\"_blank\" rel=\"noopener\">Bitcoin Flash</a>, with a team of other Bitcoiners, designed to facilitate fast and reliable Bitcoin transactions, particularly aimed at enhancing payment solutions across African markets. This project highlights his ongoing dedication to developing accessible tools that meet the unique needs of Bitcoin users in Africa.",
      "Loïc also contributes to the Bitcoin ecosystem through content creation on his YouTube channel, <a href=\"https://www.youtube.com/@LOICBTC\" target=\"_blank\" rel=\"noopener\">LOIC BTC</a>, where he demystifies Bitcoin and promotes its adoption. Notably, he played a key role in establishing one of Benin&#8217;s first Bitcoin nodes, strengthening the country’s participation in the global Bitcoin network."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-15-Loic-Kassamoto-1.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners-MIAB-Fifteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/BitcoinBenin"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/Loicbtc"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/loickassa/"
      }
    ],
    "role": "Convener of Bitcoin Mastermind & Bitcoin Benin"
  },
  {
    "rank": 16,
    "name": "Mawufemor Kofi Folivi",
    "country": "Ghana",
    "flag": "🇬🇭",
    "paragraphs": [
      "Mawufemor Kofi Folivi is a Ghanaian Bitcoin advocate and educator, dedicated to promoting Bitcoin adoption and financial inclusion in Africa. He is the founder of <a href=\"https://www.bitcoindua.org/\" target=\"_blank\" rel=\"noopener\">Bitcoin Dua</a>, an initiative focused on educating communities about Bitcoin and its potential to empower individuals economically. Through workshops, seminars, and community engagements, Bitcoin Dua aims to demystify Bitcoin and encourage its adoption across diverse demographics in Ghana.",
      "Folivi&#8217;s efforts with Bitcoin Dua also include educational programs that prepare the next generation for a digital future. By integrating Bitcoin and robotics programs, he aims to equip young individuals with the skills necessary to thrive in a rapidly evolving technological landscape.",
      "Through his initiatives, Mawufemor Kofi Folivi continues to play a pivotal role in advancing Bitcoin education and adoption in Ghana, promoting financial inclusion and economic empowerment across the continent."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-16-Mawufemor-Kofi-Folivi.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Sixteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/MawufemorFoli"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/mawufemor-kofi-folivi-256b578a/"
      }
    ],
    "role": "Founder of Bitcoin Dua"
  },
  {
    "rank": 17,
    "name": "Alphonse Mehounme",
    "country": "Benin",
    "flag": "🇧🇯",
    "paragraphs": [
      "Alphonse Mehounme, a Benin entrepreneur and Bitcoin advocate, is committed to advancing Bitcoin adoption and education in Africa. He co-founded <a href=\"https://btcmastermind.xyz/\" target=\"_blank\" rel=\"noopener\">Bitcoin Mastermind</a>, which hosts conferences and meetups to educate individuals and businesses on Bitcoin&#8217;s potential for financial inclusion and economic empowerment. These events foster a community of Bitcoin enthusiasts and entrepreneurs.",
      "Alphonse is also developing <a href=\"https://bitcoinflash.xyz/\" target=\"_blank\" rel=\"noopener\">Bitcoin Flash</a>, a platform designed for fast and reliable Bitcoin transactions, enhancing payment solutions across African markets. Additionally, he shares Bitcoin insights and experiences on his YouTube channel, &#8220;<a href=\"https://www.youtube.com/@alphonsemehounme8537\" target=\"_blank\" rel=\"noopener\">Alphonse MEHOUNME</a>,&#8221; aiming to demystify Bitcoin and drive adoption in West Africa.",
      "Through his initiatives, Alphonse continues to champion Bitcoin education and adoption in Cameroon and the broader West African region."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-17-Alphonse-Mehounme.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Seventeenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/mehounme"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/alphonsemehounme/"
      }
    ],
    "role": "Co-Founder of Bitcoin Mastermind"
  },
  {
    "rank": 18,
    "name": "Luthando Ndabambi",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Luthando Ndabambi is a South African Community leader and Bitcoin advocate, serving as the Project Community Lead for <a href=\"https://www.thesurferkids.com/\" target=\"_blank\" rel=\"noopener\">The Surfer Kids</a> and <a href=\"https://bitcoinekasi.com/\" target=\"_blank\" rel=\"noopener\">Bitcoin Ekasi</a>. Starting in May 2019 as a surf coach with The Surfer Kids, a non-profit empowering underprivileged youth through surfing, he expanded his focus in August 2021 to include Bitcoin education and adoption in his township, onboarding local shops to accept Bitcoin and fostering a circular economy.",
      "His work has been pivotal to Bitcoin Ekasi, inspired by El Salvador&#8217;s Bitcoin Beach, to establish a Bitcoin-based economy in South Africa. Luthando educates his community about Bitcoin, facilitates transactions, and promotes financial inclusion, witnessing its transformative impact firsthand.",
      "Through his dedication, Luthando continues to inspire others, showcasing Bitcoin&#8217;s potential as a tool for empowerment in underserved communities."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoin-2024-18-Luthando-Ndabambi.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Eighteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/LuthandoSABTC"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/luthando-ndabambi-463992206/"
      }
    ],
    "role": "Project Community Leader, The Surfer Kids & BitcoinEkasi"
  },
  {
    "rank": 19,
    "name": "Glenn Jooste",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Glenn Jooste is a South African entrepreneur and Bitcoin advocate focused on driving Bitcoin adoption and financial education within local communities. As the founder of <a href=\"https://bitcoinubuntu.org/\" target=\"_blank\" rel=\"noopener\">Bitcoin Ubuntu</a> in Swellendam, Western Cape, he works to build a Bitcoin-based economy and educate residents on Bitcoin’s benefits through workshops, seminars, and community outreach.",
      "Alongside Bitcoin Ubuntu, Glenn co-hosts <a href=\"https://x.com/orangesunspaces\" target=\"_blank\" rel=\"noopener\">Orange Sun</a> and Bitcoin in Africa spaces, forums dedicated to discussing Bitcoin in the African context and sharing insights to strengthen adoption across the continent.<br /><br />Volunteering as a Bitcoin educator at <a href=\"https://x.com/thecore21m\">The Core</a>, Glenn’s dedication to Bitcoin education speaks volumes about his passion for empowering communities in Africa.",
      "Collaborating with initiatives like Bitcoin Ekasi in Mossel Bay and Bitcoin Witsand, Glenn has been key in fostering local Bitcoin economies, promoting financial independence and resilience in South Africa and beyond. Through his ongoing initiatives, he plays a vital role in advancing financial education and empowerment."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoiner-2024-19-Glenn-Jooste.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Nineteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/orangesunspaces"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/BitcoinUbuntu"
      }
    ],
    "role": "Founder of Bitcoin Ubuntu"
  },
  {
    "rank": 20,
    "name": "Collin Rukundo",
    "country": "Uganda",
    "flag": "🇺🇬",
    "paragraphs": [
      "Collin Rukundo is a Ugandan software developer and Bitcoin advocate dedicated to enhancing Bitcoin accessibility and usability, particularly in Africa. He is the creator of <a href=\"https://ettawallet.app/\" target=\"_blank\" rel=\"noopener\">EttaWallet</a>, an open-source, non-custodial Bitcoin and Lightning wallet designed with a strong emphasis on usability, accessibility, and user experience. EttaWallet aims to provide users with a seamless experience in managing Bitcoin transactions, focusing on the unique needs of African users.",
      "In addition to his work on EttaWallet, Collin has contributed to the Bitcoin ecosystem through various open-source projects. He co-founded <a href=\"https://www.splice.africa/\" target=\"_blank\" rel=\"noopener\">Splice Africa</a>, a company focused on revolutionizing payment infrastructure across the continent. He also serves as an engineering fellow with <a href=\"https://blog.qala.dev/\" target=\"_blank\" rel=\"noopener\">Btrust Builders</a>.",
      "Through his innovative projects and contributions to the Bitcoin community, Collin Rukundo continues to play a pivotal role in advancing Bitcoin adoption and education in Africa, promoting financial inclusion and technological empowerment."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoin-2024-20-Collin-Rukundo.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Twentieth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/rukundo__"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/crukundo/"
      }
    ],
    "role": "Bitcoin Open-Source Developer, Etta Wallet"
  },
  {
    "rank": 21,
    "name": "Theophilus Isah",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Theophilus Isah is a Nigerian entrepreneur and passionate advocate for Bitcoin who is making a meaningful impact through his work. As the Co founder and CEO of <a href=\"https://app.mavapay.money/\" target=\"_blank\" rel=\"noopener\">MavaPay</a>, he has created a platform that makes Bitcoin-to-Naira transactions incredibly simple and accessible.",
      "One of Theophilus Isah&#8217;s key achievements is integrating the Lightning Network into MavaPay, enabling fast, low-cost transactions in a region often challenged by high fees and delays. With real-time access to funds, MavaPay users experience the speed and efficiency that traditional systems lack, highlighting Bitcoin&#8217;s transformative potential in Africa.",
      "Theo is involved in promoting bitcoin education globally and in Africa as a facilitator in the btrust builders program. He is also involved in building educational tools (such as <a href=\"https://chat.bitcoinsearch.xyz/\" target=\"_blank\" rel=\"noopener\">chatbtc</a>, <a href=\"https://bitcoinsearch.xyz/\" target=\"_blank\" rel=\"noopener\">bitcoinsearch</a>, <a href=\"https://learn.bitcoindevs.xyz/good-first-issues\" target=\"_blank\" rel=\"noopener\">good first issues</a>), that foster bitcoin adoption."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Most-Impactful-Bitcoin-2024-21-Theophilus-Isah-2.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Twenty-First-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://x.com/Extheo"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/theophilus-isah/"
      },
      {
        "platform": "X",
        "url": "https://twitter.com/afribitcoiners"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/african-bitcoiners-3453a4246/"
      }
    ],
    "role": "Co founder and CEO of MavaPay"
  }
]