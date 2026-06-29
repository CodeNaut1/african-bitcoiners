const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  overlay: `${R2}/uploads/2023/11/MIAB-images-overlayy.png`,
  firstBitcoiner: `${R2}/uploads/2024/03/African-Bitcoiners_MIAB-First-Bitcoiner.png`,
  twentyFirstBitcoiner: `${R2}/uploads/2024/03/African-Bitcoiners_MIAB-Twenty-First-Bitcoiner.png`,
}

export const INTRO = "These fine folk have been an inspiration to ourselves and our community. They are passionate not only about Bitcoin, but more importantly, about using this wonderful tool to bring freedom to the people of Africa. We are grateful for all they do in committing their time and influence to this hugely impactful work. Thank you 🙏🏼"

export const OTHER_YEARS = [
  { label: 'The Most Impactful African Bitcoiners of 2025', href: '/the-most-impactful-african-bitcoiners-of-2025/' },
  { label: 'The Most Impactful African Bitcoiners of 2024', href: '/the-most-impactful-african-bitcoiners-of-2024/' },
  { label: 'The Most Impactful African Bitcoiners of 2023', href: '/the-most-impactful-african-bitcoiners-of-2023/' },
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
    "name": "Farida Bemba Nabourema",
    "country": "Togo",
    "flag": "🇹🇬",
    "paragraphs": [
      "Farida Bemba Nabourema is the convener of the <a href=\"https://www.afrobitcoin.org/\">African Bitcoin Conference</a> held in Ghana. She is a Togolese human rights activist, writer, and firm believer that bitcoin is vital for human rights and freedom. Farida has risen to become one of the most influential faces in the efforts for democracy in Togo and the West African region."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022_Farida-Bemba-Nabourema.jpeg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-First-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/Farida_N"
      }
    ],
    "role": "Convener: African Bitcoin Conference"
  },
  {
    "rank": 2,
    "name": "Kgothatso Ngako",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "For the longest time, Bitcoin adoption in Africa had a big challenge: Internet access. Kgothatso Ngako together with his team built the incredible <a href=\"https://8333.mobi/\" target=\"_blank\" rel=\"noopener\">Machankura</a> that allows anyone to buy and send Bitcoin without an internet connection."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Kgothatso-Ngako-Machankura.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/440UrPp"
      }
    ],
    "role": "Founder: Machankura"
  },
  {
    "rank": 3,
    "name": "Ray Youseff",
    "country": "Egypt",
    "flag": "🇪🇬",
    "paragraphs": [
      "Ray is the co-founder and CEO of <a href=\"https://paxful.com/\" target=\"_blank\" rel=\"noopener\">Paxful</a> and Built with Bitcoin Foundation, born in Egypt and raised in New York, Even though he grew up in NY, Ray Youssef has contributed to bitcoin adoption in Africa with his peer-to-peer platform with over ten million users Paxful."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Ray-Youseff.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/raypaxful"
      }
    ],
    "role": "Co-founder: Paxful"
  },
  {
    "rank": 4,
    "name": "Hermann Vivier",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Hermann Vivier is the founder of <a href=\"https://www.thesurferkids.com/\">The Surfer Kids</a> and <a href=\"https://bitcoinekasi.com/\" target=\"_blank\" rel=\"noopener\">Bitcoin Ekasi</a>. Bitcoin Ekasi was founded with the idea to use Bitcoin as a means of fostering financial and personal empowerment. Bitcoin Ekasi aims to use a well-established community platform (The Surfer Kids NPO) to create a Bitcoin economy in the township already serviced by that non-profit organization."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Hermann-Vivier.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/vryfokkenou"
      }
    ],
    "role": "Founder: Bitcoin Ekasi"
  },
  {
    "rank": 5,
    "name": "Anita Posch",
    "country": "Austria",
    "flag": "🇦🇹",
    "paragraphs": [
      "Anita Posch may not be  African but her impact in Africa can not be overlooked, She is a Bitcoin advocate, educator, podcaster, author, and the founder of <a href=\"https://mobile.twitter.com/BFFbtc\">Bitcoin for Fairness</a>. Anita’s goal is to bring Bitcoin to billions through her educational work. She has developed a Bitcoin podcast, a YouTube channel and wrote the book (L)earn Bitcoin."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Anita-Posch.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/AnitaPosch"
      }
    ],
    "role": "Founder: Bitcoin for Fairness"
  },
  {
    "rank": 6,
    "name": "Alakanani Itireleng",
    "country": "Botswana",
    "flag": "🇧🇼",
    "paragraphs": [
      "Our 6th Most Impactful African Bitcoiner is Alakanani Itireleng. <a href=\"https://twitter.com/bitcoinlady\">@bitcoinlady</a> created Satoshi Centre in Botswana for the purpose of educating the local people about Bitcoin. Alakanani started singlehandedly and self-funded by educating and building the Bitcoin community in Botswana in her home town of Gaborone. Her success is an inspiration to us!"
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Alakanani-Itireleng.jpeg",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/bitcoinlady"
      }
    ],
    "role": "Founder: Satoshi Centre"
  },
  {
    "rank": 7,
    "name": "Bernard Parah",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Bernard Parah is the CEO of <a href=\"https://bitnob.com/\" target=\"_blank\" rel=\"noopener\">Bitnob</a>. He is a Nigerian Entrepreneur and Software Engineer. Bernard leads his company’s efforts in building financial services for Africans. He is focused on making sure every African gets the opportunities that comes with Bitcoin."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Bernard-Parah-Bitnob.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/bernard_parah"
      }
    ],
    "role": "Founder: Bitnob"
  },
  {
    "rank": 8,
    "name": "Craig Raw",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Craig Raw is a South African founder and developer of <a href=\"https://sparrowwallet.com/\">Sparrow Wallet, </a>a Bitcoin desktop wallet focused on multi-signatures for distributed self-custody and privacy. His Sparrow wallet has become one of the most loved self-custodial wallets for Africans to store Bitcoin safely."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Craig-Raw.webp",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/craigraw"
      }
    ],
    "role": "Founder: Sparrow Wallet"
  },
  {
    "rank": 9,
    "name": "Carel van Wyk",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Carel van Wyk is a Bitcoin pioneer and ex-co-founder of Luno from South Africa. He has contributed to Bitcoin adoption in Africa. His recent outstanding work is <a href=\"https://cryptoconvert.co.za/\" target=\"_blank\" rel=\"noopener\">Cryptoconvert.</a>"
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Carel-van-Wyk.jpeg",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/carelvwyk"
      }
    ],
    "role": "Ex Co-founder: Luno"
  },
  {
    "rank": 10,
    "name": "Abubakar Nur Khalil",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Abubakar Nur Khalil is a Nigerian programmer, Bitcoin Core contributor, CEO and CTO of Recursive Capital, co-founder at Qala and also serves as a board member of ₿trust, where he focuses on growing the Bitcoin development ecosystem in Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Abubakar-Nur-Khalil.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/ihate1999"
      }
    ],
    "role": "Co-founder: Qala"
  },
  {
    "rank": 11,
    "name": "Guantai Kathurima",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "Guantai Kathurima is a Kenyan who believes in Bitcoin education. He is the founder of <a href=\"https://bitcoinmtaani.com/\" target=\"_blank\" rel=\"noopener\">BitcoinMtaani</a>, a Bitcoin Education Platform which aims to provide a viable solution to the language barrier most Africans face in learning about Bitcoin. Guantai is also the Director at Machankura."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB_Guantai-Kathurima.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/MasterGuantai"
      }
    ],
    "role": "Founder: BitcoinMtaani"
  },
  {
    "rank": 12,
    "name": "Mary Imasuen",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Mary Imasuen is the Content/Creative Media Associate at <a href=\"https://bitnob.com/\">Bitnob</a>. She’s the host of The Nobcast, a bitcoin podcast by Bitnob, and The FintechX Podcast, a podcast where she gives her take on fintech, personal finance, and bitcoin. Mary is one of the most passionate and influential voices in Africa’s Bitcoin space."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Mary-Imasuen.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/mary_imasuen"
      }
    ],
    "role": "Host: Nobcast"
  },
  {
    "rank": 13,
    "name": "Carla Kirk-Kohen",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Carla Kirk-Kohen is a South African who is doing so much for the Bitcoin space in Africa, She is one of the board members of ₿trust and the Co-founder of <a href=\"https://qala.dev/\" target=\"_blank\" rel=\"noopener\">Qala</a>, an organization that is training the next generation of African Bitcoin and Lightning developers."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Carla-Kirk-Kohen-Qala.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/actuallyCarlaKC"
      }
    ],
    "role": "Co-founder: Qala"
  },
  {
    "rank": 14,
    "name": "Ricki Allardice",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "Ricki Allardice is the co-founder of Bitvice a Cape Town based Bitcoin self custody solutions provider. He turned away from the legacy industry to foster Bitcoin adoption and self-custody in South Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022_Ricki-Allardice.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/ricki_allardice"
      }
    ],
    "role": "Co-founder: Bitvice"
  },
  {
    "rank": 15,
    "name": "Kal Kassa",
    "country": "Ethiopia",
    "flag": "🇪🇹",
    "paragraphs": [
      "Kal Kassa is one of the top Bitcoin advocators in Ethiopia, and a strong believer in the African Renaissance. Kal Kassa is the founder of Bitcoin Birr. He sees Bitcoin as foundational for empowering the people of Ethiopia."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB_Kal-Kassa.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/KalKassa"
      }
    ],
    "role": "Founder: Bitcoin Birr"
  },
  {
    "rank": 16,
    "name": "Alexandria the Great",
    "country": "Zimbabwe",
    "flag": "🇿🇼",
    "paragraphs": [
      "Alexandria is a contributor to the Money on-chain protocol, Bitcoin Magazine &amp; Global Bitcoin fest. He is the founder of Proof of Resilience a community that is educating African youths by hosting on-campus university events, Bitcoin meetups &amp; the first series of Bitcoin Bootcamp though-out Southern Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Alexandria-the-Great.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/alesander97"
      }
    ],
    "role": "Founder: Proof of Resilience"
  },
  {
    "rank": 17,
    "name": "Oluwasegun Kosemani",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Oluwasegun has contributed to Bitcoin adoption in Africa. He’s currently the Founder/CEO of <a href=\"https://www.botmecash.com/\" target=\"_blank\" rel=\"noopener\">Botmecash</a>, a Bitcoin-only exchange in Nigeria, Co-Founder and COO of Satoshi’s Journal and works on other Bitcoin projects like the Bitcoin Village, Bitcoin Hotspot, &amp; the Blockchain Bootcamp for kids."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB_Oluwasegun-Kosemani.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/MrlamilamiKosch"
      }
    ],
    "role": "Founder: Botmecash"
  },
  {
    "rank": 18,
    "name": "Paco de la India",
    "country": "India",
    "flag": "🇮🇳",
    "paragraphs": [
      "Paco de la India is the founder of the <a href=\"https://runwithbitcoin.com/\" target=\"_blank\" rel=\"noopener\">Run with Bitcoin tour</a>. Paco set out to travel to 40 countries in 400 days spending only Bitcoin (contributing to places that accept Bitcoin payments for food, accommodation, transport, &amp; gear). Since Paco’s journey, he has united Bitcoiners within cities, in countries, and across borders."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-paco-de-la-india.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/RunwithBitcoin"
      }
    ],
    "role": "Founder: Run with Bitcoin"
  },
  {
    "rank": 19,
    "name": "Charlene Fadirepo",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Charlene is the Founder of <a href=\"https://www.guidefi.com/\" target=\"_blank\" rel=\"noopener\">Guidefi</a>, a fintech company that connects women with financial advisors &amp; Bitcoin investing education. She is also the CEO of Mango Digital Strategies, the author of the Bitcoin children’s book Sade’s Satoshis, and a co-author of “Bitcoin and the American Dream”."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Charlene_Fadirepo.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/CharFadirepo"
      }
    ],
    "role": "Founder: Guidefi"
  },
  {
    "rank": 20,
    "name": "Obi Nwosu",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "Obi Nwosu is the CEO of <a href=\"https://fedimint.org/\" target=\"_blank\" rel=\"noopener\">Fedi</a> and a big supporter of initiatives that advance the Bitcoin ecosystem. He is also a board member of ₿trust, an organisation that funds Bitcoin developers in the global south, starting with Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022-Obi-Nwosu-Fedimint.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/obi"
      }
    ],
    "role": "Founder: Fedimint"
  },
  {
    "rank": 21,
    "name": "Lorraine Marceline",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "Lorraine Marceline is the founder of <a href=\"https://btcdada.com/\" target=\"_blank\" rel=\"noopener\">Bitcoin Dada</a> a safe space where women connect and learn about Bitcoin. She is passionate about shrinking the gender gap in the Bitcoin ecosystem especially in Kenya and Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2022_Lorraine-Marcel.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": true,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/MIAB-images-overlayy.png",
    "overlayWidth": "70%",
    "overlayAlign": "end",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Twenty-First-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/marcelorraine"
      }
    ],
    "role": "Founder: Bitcoin Dada"
  }
]