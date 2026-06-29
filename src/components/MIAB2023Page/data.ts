const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {}

export const INTRO = "These inspiring heroes are reshaping Africa’s financial landscape! Nominated by Africans from all corners of the continent for their tireless efforts in driving Bitcoin education and adoption. Meet our leading visionaries, educators, and pioneers spearheading Bitcoin’s freedom revolution across Africa."

export const OTHER_YEARS = [
  { label: 'The Most Impactful African Bitcoiners of 2025', href: '/the-most-impactful-african-bitcoiners-of-2025/' },
  { label: 'The Most Impactful African Bitcoiners of 2024', href: '/the-most-impactful-african-bitcoiners-of-2024/' },
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
    "name": "Kgothatso Ngako",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "<strong>Machankura Founder:</strong> Established Machankura, a pioneering Bitcoin transfer solution merging Lightning with a USSD network.",
      "<strong>Exonumia Creator:</strong> Founded Exonumia, a platform translating Bitcoin content into various indigenous African languages, enhancing accessibility and understanding.",
      "<strong>Adopting BTC Capetown Organizer:</strong> Actively involved in organizing the inaugural Bitcoin conference in South Africa \"Adopting BTC Capetown\".",
      "Kagthatso Ngako is a catalyst working to accelerate the rate of Bitcoin adoption across the African continent. He’s shown an immense visible contribution to the service of spreading Bitcoin education across Africa through technology. Thank you KG."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-2023-Kgothatso-Ngako.svg",
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
        "url": "https://twitter.com/440UrPp"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/kgothatso-ngako/?originalSubdomain=za"
      }
    ],
    "role": "Founder of Machankura and Exonumia."
  },
  {
    "rank": 2,
    "name": "Lorraine Marcel Atieno",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>Founder of Bitcoin DADA:</strong> Established a women-centric organization focusing on educating African women about Bitcoin and Blockchain Technology.",
      "<strong>Education Outreaches:</strong> Led numerous Bitcoin education campaigns, primarily targeting universities to empower young African women with financial knowledge encompassing money and Bitcoin.",
      "Thank you Lorraine Marcel for your invaluable contribution to the African Bitcoin community, particularly in empowering women through comprehensive education on this transformative technology."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Lorraine-Marcel-Atieno-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Second-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/marcelorraine"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/lorraine-marcel-53649586/"
      }
    ],
    "role": "Founder of Bitcoin Dada."
  },
  {
    "rank": 3,
    "name": "Hermann Buhr Vivier",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "<strong> The Surfer Kids Co-founder:</strong> Established The Surfer Kids, a non profit educating local youth about drug addiction through surfing campaigns.",
      "<strong>Bitcoin Ekasi Founder:</strong> Founded Bitcoin Ekasi, a local Bitcoin community advocating Bitcoin within various South African communities.",
      "Acknowledged as the co-convener of the “Adoption Bitcoin” Conference in Cape Town, Vivier’s dedication to advancing Bitcoin adoption locally in South African communities has earned him recognition as one of the Most Important African Bitcoiners in 2023."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Hermann_Buhr_Vivier_MIAB_2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Third-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/vryfokkenou"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/hermannvivier/"
      }
    ],
    "role": "Founder of Bitcoin Ekasi and Co-founder of Surfer Kids."
  },
  {
    "rank": 4,
    "name": "Mary Imasuen",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Professional Role:</strong> Holds a pivotal role as the Global Marketing Manager at Fedi, a prominent Nigerian Tech and blockchain solutions firm.",
      "<strong>Podcast Hosting:</strong> Hosts \"BTC Gamer Chat,\" a podcast series focused on merging Bitcoin with gaming and digital entertainment.",
      "Mary Imasuen’s resolute advocacy for Bitcoin adoption in Africa, evident through her podcast and active engagement on social platforms, highlights her exceptional dedication and contribution to the Bitcoin community. Congratulations, Mary, on your impactful efforts to shine a light on Bitcoin adoption in Africa!"
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Mary-Imasuen-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Fourth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/mary_imasuen"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/maryimasuen/?originalSubdomain=ng"
      }
    ],
    "role": "Global Marketing Manager at Fedi."
  },
  {
    "rank": 5,
    "name": "Heritage Falodun",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Leadership Role:</strong> Co-founded DigiOats, a Bitcoin and Blockchain firm dedicated to training African blockchain developers.",
      "<strong>Developer Training Sessions:</strong> Organized extensive training sessions in Nigeria and across Africa to nurture African Bitcoin developers, aiming to bolster their contribution to the Bitcoin ecosystem and develop solutions for Africans.",
      "<strong>Technical Expertise:</strong> Heritage implements algorithms for startups and Bitcoin-focused firms, showcasing his expertise as a Bitcoin Consultant, Analyst, and Educator.",
      "Heritage Falodun’s multifaceted expertise, dedication to Bitcoin adoption in Africa, and invaluable contribution through education and technical guidance significantly elevate Bitcoin awareness and growth across the continent. Kudos, Heritage, for your remarkable efforts!"
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Heritage-Falodun-MIAB-2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Fifth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/herrytheeagle"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/heritagefalodun/?originalSubdomain=ng"
      }
    ],
    "role": "Co-Founder and CEO of DigiOats."
  },
  {
    "rank": 6,
    "name": "Guantai Kathurima",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>Founder of BitcoinMtaani:</strong> Guantai established BitcoinMtaani, a Kenyan community dedicated to Bitcoin education, fostering awareness and understanding about Bitcoin's significance across Africa.",
      "<strong>Founder of Bitcoin Matatu:</strong> Additionally, he founded Bitcoin Matatu, a travel agency facilitating tours to prominent Bitcoin projects across Africa, promoting firsthand experiences in the Bitcoin ecosystem.",
      "<strong>Relentless Education and Advocacy:</strong> Guantai is dedicated to advocating for Bitcoin through continuous education efforts, hosting comprehensive educational series, and relentlessly spreading Bitcoin's message.",
      "Guantai Kathurima’s multifaceted efforts within the Bitcoin space, from community building and education to facilitating firsthand experiences and promoting others, significantly contribute to African Bitcoin awareness and growth."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB_Guantai-Kathurima.jpg",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Sixth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/MasterGuantai"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/masterguantai/?originalSubdomain=ke"
      }
    ],
    "role": "Founder of BitcoinMtaani."
  },
  {
    "rank": 7,
    "name": "Anita Posch",
    "country": "Austria",
    "flag": "🇦🇹",
    "paragraphs": [
      "<strong>Leadership at Bitcoin For Fairness:</strong> Anita Posch's pivotal role within Bitcoin For Fairness has significantly contributed to African Bitcoin growth.",
      "<strong>Educational Initiatives:</strong> Her dedication to education is evident through various initiatives aimed at spreading Bitcoin awareness and understanding across the continent.",
      "<strong>Podcast Advocacy:</strong> Hosting a podcast amplifies her commitment, serving as a platform to advocate for Bitcoin and rights.",
      "Anita Posch’s relentless efforts as an educator and rights advocate within Bitcoin For Fairness have played a crucial role in advancing Bitcoin awareness and adoption across Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Anita-Posch-MIAB-2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Seventh-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/AnitaPosch"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/anitaposch/?originalSubdomain=at"
      }
    ],
    "role": "Founder, Bitcoin for Fairness."
  },
  {
    "rank": 8,
    "name": "Femi Longe",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Program Director at BTrust:</strong> Instrumental in training African Bitcoin and Lightning developers, fostering Bitcoin-related skill development across the continent.",
      "<strong>Advocacy for African Infrastructure and Projects:</strong> Strongly advocates for infrastructure and projects built by Africans, contributing significantly to the Bitcoin developer training landscape in Africa.",
      "Femi Longe’s role as the Program Director at BTrust demonstrates his dedication to shaping the future of Bitcoin in Africa by empowering local developers and advocating for indigenous infrastructure and projects."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-bitcoiners_Femi-Longe-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Eighth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/femilonge"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/femi-longe/?originalSubdomain=ie"
      }
    ],
    "role": "Program Director, Btrust Builders."
  },
  {
    "rank": 9,
    "name": "Erik Hersman",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>BRCK CEO:</strong> Leads a company developing robust wireless WiFi devices for emerging markets.",
      "<strong>Founder of iHub:</strong> Established Nairobi's tech innovation hub fostering technological advancements.",
      "<strong>Founder of Gridless:</strong> Initiatives supporting circular development in Kenya, offering electricity solutions.",
      "<strong>Co-founder of Ushahidi:</strong> Known for open-source software for crowdsourcing crisis information, aiding social impact.",
      "Erik Hersman’s multifaceted contributions in technology, innovation hubs, and crisis information systems have significantly impacted Africa. His work with BRCK, iHub, Gridless, and Ushahidi highlights his commitment to advancing technology and social impact across the continent."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners-Erik-Hersman-MIAB-2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Ninth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/whiteafrican"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/erikhersman/?originalSubdomain=ke"
      }
    ],
    "role": "Co-Founder of Gridless Compute and CEO of BRCK."
  },
  {
    "rank": 10,
    "name": "Nikolai Tjongarero",
    "country": "Namibia",
    "flag": "🇳🇦",
    "paragraphs": [
      "<strong>Founder of Bitcoin Initiatives:</strong> Nikolai established \"Bitcoin Mining Namibia\" and \"EasySats,\" an online platform encouraging Namibians and Africans to accumulate Sats.",
      "<strong>Multifaceted Bitcoin Engagement:</strong> He's a Bitcoin Maxi, Digital Entrepreneur, Published Poet, and Social Commentator, deeply involved in the Bitcoin space.",
      "<strong>Podcast Pioneer:</strong> Hosted the first African Bitcoin Podcast, \"From The Jump,\" listed and streamed via Podcasting 2.0.",
      "Nikolai’s impact on Bitcoin growth in Namibia is significant. He’s actively spread the Bitcoin message locally, introduced Bitcoin solutions, and fostered mining activities, contributing immensely to the country’s Bitcoin landscape."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Nikolai-Tjongarero-OKIN-MIAB-2023.jpeg",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Tenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/OKIN_17"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/okin/?originalSubdomain=na"
      }
    ],
    "role": "Founder of Bitcoin Mining Namibia and Easy Sats."
  },
  {
    "rank": 11,
    "name": "Alexandria Gowera",
    "country": "Zimbabwe",
    "flag": "🇿🇼",
    "paragraphs": [
      "<strong>Driving Force in Zimbabwe:</strong> Alexandria, known as Alexandria The Great, plays a pivotal role in Zimbabwe's Bitcoin community.",
      "<strong>Bitcoin Reach Initiative:</strong> Through Bitcoin Reach, they actively promote Bitcoin's potential in Southern Africa, specifically within Zimbabwe.",
      "<strong>Education and Empowerment:</strong> Hosting informative gatherings and online spaces, Alexandria fosters Bitcoin education, empowering individuals to comprehend its significance within Zimbabwe's economic landscape.",
      "Alexandria Gowera, widely recognized as Alexandria The Great, is a key figure in Zimbabwe’s Bitcoin community, tirelessly working towards widespread understanding and adoption of Bitcoin in Southern Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Alexandria-Gowera-MIAB-2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Eleventh-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/alesander97"
      }
    ],
    "role": "Founder of Bitcoin Reach."
  },
  {
    "rank": 12,
    "name": "Noelyne Sumba",
    "country": "Kenya",
    "flag": "🇰🇪",
    "paragraphs": [
      "<strong>Orange Pill Operations at Machankura:</strong> Overseeing operations enabling Bitcoin transfers using USSD codes, targeting individuals without internet access.",
      "<strong>Africa Correspondent of Bitcoin Layer:</strong> Amplifying Bitcoin advocacy through the Bitcoin Layer show.",
      "<strong>Social Media Advocacy:</strong> Engages with her social media audience through regular \"Bitcoin Tip\" videos, spreading awareness.",
      "Noelyne’s impactful presence in the African Bitcoin community, especially her dedication to Bitcoin advocacy through various channels, including conferences and online platforms, solidifies her role as a leading female voice promoting Bitcoin across Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Noelyne-Sumba-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Twelfth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/noelynesumba"
      },
      {
        "platform": "LinkedIn",
        "url": "http://linkedin.com/in/noelyne-sumba-0537a1b9"
      }
    ],
    "role": "Orange Pill Operations, Machankura."
  },
  {
    "rank": 13,
    "name": "Brindon Mwiine",
    "country": "Uganda",
    "flag": "🇺🇬",
    "paragraphs": [
      "<strong>Founder of Gorilla Sats:</strong> An initiative that is building a Circular Economy in Uganda.",
      "<strong>Founder Bitcoin Kampala:</strong> Spearheads Bitcoin advocacy across Uganda via these initiatives.",
      "<strong>Operates a Lightning Node:</strong> Contributes to the Lightning Network with his node.",
      "Brindon is an intelligent young fellow whose passion for Bitcoin in Africa cannot be overlooked. Keep the lights shinning Brindon."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Brindon-Mwiine-MIAB-2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Thirteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/BrindonMwiine"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/brindon-mwiine/"
      }
    ],
    "role": "Founder of Gorilla Sats & Bitcoin Kampala."
  },
  {
    "rank": 14,
    "name": "Glenn Jooste",
    "country": "South Africa",
    "flag": "🇿🇦",
    "paragraphs": [
      "<strong>Bitcoin Ubuntu Founder:</strong> Established an educational outreach initiative in Swellendam, Western Cape, educating locals through games, meet-ups, and engaging sessions on Bitcoin.",
      "<strong>Co-host of \"OrangSunSpaces\":</strong> Actively participates in in-depth Bitcoin discussions via online regular spaces on Twitter.",
      "Glenn’s efforts towards Bitcoin adoption in Africa is glaring and we admire that his presence can be felt in every Bitcoin gathering."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Glenn-Jooste-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Fourteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/BitcoinUbuntu"
      }
    ],
    "role": "Founder of Bitcoin Ubuntu."
  },
  {
    "rank": 15,
    "name": "Obi Nwosu",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Fedi's Innovative Approach:</strong> Fedi, under Obi's guidance, is renowned for its innovative approach to Bitcoin solutions, aiming to democratize access and revolutionize the African Bitcoin landscape.",
      "<strong>Advocacy for Bitcoin Adoption:</strong> As the chair of Fedi, Obi is a prominent advocate for Bitcoin adoption in Africa, fostering technological growth and financial inclusivity.",
      "<strong>Board Membership at BTrust:</strong> Exhibits multifaceted involvement in diverse Bitcoin-focused entities, contributing significantly to Bitcoin's advancement in Africa.",
      "Obi Nwosu’s visionary leadership and relentless advocacy have been instrumental in propelling Bitcoin’s transformative potential across Africa. His diverse roles in innovative solutions and advocacy platforms signify his impactful contributions to the continent’s Bitcoin landscape."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Obi-Nwosu-MIAB-2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners-MIAB-Fifteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/obi"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/obinwosu/"
      }
    ],
    "role": "Founder of Fedi."
  },
  {
    "rank": 16,
    "name": "Megasley",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Routing Nodes Management:</strong> Oversees 4 free routing nodes, with three strategically positioned in Africa, facilitating Bitcoin education and node operations across the continent.",
      "<strong>Education and Node Advocacy:</strong> Actively educates Africans on running Bitcoin nodes and serves as a relentless advocate for Bitcoin adoption across Africa.",
      "Megasley is a relentless Bitcoin advocate and one of the very special Bitcoin personalities in Africa. Megasley has been remarkable in his efforts and contributions to seeing Bitcoin usage spread across Africa by hosting several Bitcoin nodes across several countries in Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Megasley-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#FFDBA0",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Sixteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/megasley"
      }
    ],
    "role": "Node Operator, Africa Free Routing."
  },
  {
    "rank": 17,
    "name": "Bernard Parah",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Bitnob Leadership:</strong> Founder and CEO of Bitnob, a FinTech firm enabling cross-border payments using Bitcoin and Lightning Network.",
      "<strong>Regional Expansion:</strong> Through Bitnob, expanded payment facilitation to eight African countries, enhancing financial accessibility across the continent.",
      "<strong>Passionate Advocacy:</strong> Actively spreads Bitcoin awareness in Africa, emphasizing its advantages and potential within the continent's financial systems.",
      "Bernard Parah’s leadership in Bitnob and his active promotion of Bitcoin’s potential have significantly contributed to enhancing financial accessibility and Bitcoin adoption across multiple African nations."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Bernard-Parah-Bitnob.jpg",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Seventeenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/bernard_parah"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/bernard-parah-22437386?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bb34TNUxUSaG9enQ9hf9kTA%3D%3D"
      }
    ],
    "role": "Founder and CEO of Bitnob."
  },
  {
    "rank": 18,
    "name": "Meron Estefanos",
    "country": "Eritrea",
    "flag": "🇪🇷",
    "paragraphs": [
      "<strong>Bitcoin Innovation Hub:</strong> Founder of a Bitcoin-focused organization providing education and skills training, especially to women, in Bitcoin development and other tech-related fields.",
      "<strong>Advocacy for Refugees:</strong> An outspoken advocate for refugee rights, particularly for Eritrean refugees.",
      "<strong>Voice for Freedom and Sovereignty:</strong> Recognizes Bitcoin's significance in pursuing freedom and sovereignty, and actively advocates for its adoption across Africa.",
      "Meron Estefanos’ commitment to empowering women through Bitcoin education, combined with her advocacy for refugee rights, underscores her dedication to fostering financial independence and awareness of Bitcoin’s potential for freedom and sovereignty in Africa."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Meron-Estefanos-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#F1975A",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Eighteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/meronina"
      }
    ],
    "role": "Founder of Bitcoin innovation hub and Human Rights Activist."
  },
  {
    "rank": 19,
    "name": "Kumi Nkansah",
    "country": "Ghana",
    "flag": "🇬🇭",
    "paragraphs": [
      "<strong>Founder of Bitcoin Cowries:</strong> Established a local Bitcoin community in Ghana, emphasizing urban Bitcoin awareness.",
      "<strong>Initiatives for Bitcoin Adoption:</strong> Founded platforms like My Sats-Farm and BitcoinBrite, aiming to facilitate Bitcoin purchase and foster day-to-day Bitcoin usage in the local economy.",
      "<strong>Educational Efforts:</strong> Utilizing skills as a radio broadcaster and digital marketer, educates Ghanaians, including government officials, about Bitcoin's potential and benefits.",
      "Kumi Nkansah’s multifaceted initiatives, from founding Bitcoin communities to fostering Bitcoin usage and education through various platforms, demonstrate his commitment to raising awareness and promoting Bitcoin adoption in Ghana."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Kumi-Nkansah-MIAB-2023.png",
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
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Nineteenth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/CowriesKumi"
      },
      {
        "platform": "LinkedIn",
        "url": "http://linkedin.com/in/cowrieskumi"
      }
    ],
    "role": "Founder of Bitcoin Cowries, My Sats Farm, and BitcoinBrite."
  },
  {
    "rank": 20,
    "name": "Sebastien Gouspillou",
    "country": "France",
    "flag": "🇫🇷",
    "paragraphs": [
      "<strong>Renewable Energy Mining:</strong> Founder of BigBlock Datacenter and BBGS, advocates for renewable energy use in Bitcoin mining, contributing to energy sustainability in Africa.",
      "<strong>Virunga National Park Initiative:</strong> Instrumental in leveraging Bitcoin mining to generate electricity and stabilize the financial state of Virunga National Park in the Democratic Republic of the Congo, aiding nearby communities.",
      "Sebastien Gouspillou’s pioneering initiatives in combining Bitcoin mining with renewable energy solutions have positively impacted African regions like the Virunga National Park, aiding in their financial recovery and energy sustainability."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Sebastien-Gouspillou-MIAB-2023.png",
    "contentBg": "#FFF7ED",
    "photoBg": "#DAE7D1",
    "photoOnLeft": false,
    "photoPosition": "center top",
    "photoSize": "cover",
    "photoOverlay": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/11/Sebastien-Gouspillou-overlay.png",
    "overlayWidth": "90%",
    "overlayAlign": "center",
    "overlayPadTop": "300px",
    "overlayWidthPx": 499,
    "overlayHeightPx": 211,
    "rankBadgeImage": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MIAB-Twentieth-Bitcoiner.png",
    "socials": [
      {
        "platform": "X",
        "url": "https://twitter.com/SebGouspillou"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/s%C3%A9bastien-gouspillou-7663b7aa/"
      }
    ],
    "role": "Founder of BigBlock Datacenter and CEO of BBGS."
  },
  {
    "rank": 21,
    "name": "Charlene Fadirepo",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "paragraphs": [
      "<strong>Authorship:</strong> Published two Bitcoin-focused books, \"Bitcoin and The American Dream\" and \"Sade’s Satoshi,\" aimed at making Bitcoin accessible to the African audience.",
      "<strong>Podcast Host:</strong> Leads a significant Bitcoin podcast, \"Bitcoin in Africa,\" utilizing this platform to discuss and promote Bitcoin's relevance in Africa.",
      "<strong>Banking and Finance Advocacy:</strong> As a banker, engages in writings, social media interactions, and podcasts, aiming to reshape and innovate the African banking and finance sector through Bitcoin integration.",
      "Charlene Fadirepo’s diverse engagements, from authoring informative Bitcoin literature to hosting a prominent podcast, reflect her commitment to spreading Bitcoin awareness and fostering its integration into African financial systems."
    ],
    "photo": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Charlene-Fadirepo-MIAB-2023.png",
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
        "url": "https://twitter.com/CharFadirepo"
      },
      {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/charlenefadirepo/"
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
    "role": "CEO, Author, Podcast Host, Banking & Finance Advocate."
  }
]