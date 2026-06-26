const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2024/03/African-Bitcoiners_Places_to_Spend-Sats-hero.png`,
}

export const LINKS = {
  bitcoinersMap: '/spend-bitcoin/bitcoiners-map/',
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty/',
  submitSpend: '#spend-submit',
}

export type SpendCard = {
  title: string
  category: string
  description: string
  image: string
  href: string
  external: boolean
}

export type SpendRegion = {
  region: string
  flag?: string
  cards: SpendCard[]
}

export const REGIONS: SpendRegion[] = [
  {
    region: "Africa wide",
    cards: [
      {"title": "Sats2Data", "category": "Accepts Lightning", "description": "Sats2Data is the world’s first and only platform that allows you to buy airtime using Bitcoin in just 60 seconds! You can instantly purchase airtime and buy data bundles with ease.airtime with Bitcoin!", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Sats2data-logo-white.png", "href": "https://sats2data.africa/", "external": true},
      {"title": "Bitrefill", "category": "Accepts Lightning", "description": "Bitrefill is the ultimate way to get vouchers and gift cards for your favourite stores using Bitcoin. With just a few clicks you can purchase vouchers and gift cards from stores like Amazon, Spar, Shoprite and Jumia.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2023/01/Bitrefill-logo-1.png", "href": "https://www.bitrefill.com/ke/en/", "external": true},
      {"title": "Dall.e 2", "category": "Accepts Lightning", "description": "DALL·E 2 is an AI system that can create realistic images and art from a description, which can be purchased with Bitcoin. It is the perfect tool for artists, designers, and anyone looking for an easy way to create stunning visuals.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_OpenAI-Dalle-logo.png", "href": "https://t.me/dalle2lightningbot", "external": true},
      {"title": "Silent Link eSim", "category": "Accepts Lightning", "description": "Take your anonymity to the next level with Instant eSim. You can get global mobile 4G/5G Internet access and burner phone numbers instantly and privately on any modern eSIM-compatible smartphone.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Places-to-spend-sats-Silent-Link-eSims.png", "href": "https://silent.link/", "external": true},
      {"title": "Plebeian Market", "category": "Accepts Lightning", "description": "The Plebeian Market is the ultimate destination for anyone looking to buy and sell anything for Bitcoin. The platform allows you to quickly and easily browse and purchase items from anywhere in the world.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Plebeian-Market-logo.png", "href": "https://plebeian.market/", "external": true},
      {"title": "NameCheap", "category": "Accepts Lightning", "description": "Namecheap is the premier domain registration service that accepts Bitcoin as a form of payment! Here, you can easily register and host your domains with the most secure and reliable payment method, Bitcoin.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Namecheap-logo.jpg", "href": "https://www.namecheap.com/", "external": true},
      {"title": "PikaSim", "category": "Accepts Lightning", "description": "", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2026/01/Capture-decran-2026-01-19-a-15.28.31-300x284.png", "href": "https://pikasim.com/", "external": true},
      {"title": "Raretoshi", "category": "", "description": "Raretoshi is the perfect way to invest in rare digital art. You can easily upload, collect, and transact rare digital art using Bitcoin. Raretoshi offers a secure and accessible way to purchase artwork.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Raretoshi_logo.png", "href": "https://raretoshi.com/", "external": true},
      {"title": "Gorilla Sats", "category": "", "description": "Gorilla Sats localised secure and convenient platform allows individuals and businesses to buy and transact using Bitcoin. Their educational programs also spread awareness of the benefits of a decentralized financial system.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Gorilla-Sats-logo.jpg", "href": "https://www.gorilla-sats.com/", "external": true},
    ],
  },
  {
    region: "Nigeria",
    flag: "\ud83c\uddf3\ud83c\uddec",
    cards: [
      {"title": "Web4Africa", "category": "Accepts Lightning", "description": "Web4Africa offers professional reseller and shared web hosting as well as affordable domain registration and e-commerce solutions for residents of Nigeria, and the rest of the world.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Web4Africa-logo.jpg", "href": "https://web4africa.ng/", "external": true},
      {"title": "MasterWeb Solutions", "category": "Accepts Lightning", "description": "A Modern Website design firm that provides all in one solution to website design and development, digital marketing, branding, graphics. They have built nairafinex.com a Bitcoin exchange platform for people in Nigeria and stands out by supporting the lightning network.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_MasterWeb-Solutions-logo.png", "href": "https://masterweb.com.ng/", "external": true},
      {"title": "Hancarri", "category": "Accepts Lightning", "description": "Hancarri, a footwear and men's clothing store, marks a significant shift in the fashion retail industry by accepting Bitcoin. This adoption reflects a broader trend of integrating digital currency into everyday transactions, offering customers a novel and convenient way to shop for the latest in fashion.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Hancarri-handcarry-shop_logo.png", "href": "https://www.instagram.com/hancarri.ng/", "external": true},
      {"title": "Giga Layer", "category": "", "description": "Giga Layer, a pioneering Nigerian web hosting company, stands at the intersection of technology and digital finance by accepting Bitcoin as a payment method. Catering to a wide range of web hosting needs, from shared hosting to dedicated servers and cloud services.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Giga-layer-logo.png", "href": "https://ng.linkedin.com/company/gigalayer", "external": true},
      {"title": "Obeezi", "category": "", "description": "Obeezi provides you with products you can trust ranging from Clothing, Shoes, Wrist watches, Sunglasses, Colognes, Fashion Accessories, and much more.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Obeezi-Fashion-Mall_logo.png", "href": "https://obeezi.com/", "external": true},
      {"title": "Regal Flowers", "category": "", "description": "Regal Flowers, a distinguished flower shop, embraces the digital age by accepting Bitcoin for its beautiful arrangements and bouquets. This decision to incorporate Bitcoin payments enables customers to experience the joy of giving and receiving flowers with the added convenience of using Bitcoin.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Regal-flowers-logo.png", "href": "https://regalflowers.com.ng/", "external": true},
    ],
  },
  {
    region: "South Africa",
    flag: "\ud83c\uddff\ud83c\udde6",
    cards: [
      {"title": "Speedcubes", "category": "Accepts Lightning", "description": "Speedcubes.co.za is on a mission to promote and sell real speedcubes to the South African market. In addition, they host speedcube competitions periodically and brand cubes for corporate functions.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_speedcubes-SA-logo.jpg", "href": "http://speedcubes.co.za/", "external": true},
      {"title": "Pick N Pay", "category": "Accepts Lightning", "description": "Pick ‘n Pay Group is a retail business in the Fast Moving Consumer Goods (FCMG) industry in South Africa. They are one of the largest online grocery platforms in sub-Saharan Africa.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_pick-n-pay-logo.png", "href": "https://www.pnp.co.za/", "external": true},
      {"title": "Luneburgh Cottages", "category": "Accepts Lightning", "description": "Cottages offering modern and spacious self-catering cottages. Comfortable for short term stays aimed at the commercial market, the discerning traveler and overnight guest in search of a home. Accepting Lightning.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Luneburgh-Cottages.jpg", "href": "https://www.luneburgh.co.za/?ref=coinmap.org", "external": true},
      {"title": "Seal Water Tech", "category": "", "description": "We specialize in a range of water purification systems from simple in-line filtration systems (water filters) to complex reverse osmosis &amp; de-ionizing, water softening and other purification systems for any water purification need.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Seal-Water-Tech-logo.jpg", "href": "https://www.sealwatertech.co.za/?ref=coinmap.org", "external": true},
      {"title": "BitKoyn", "category": "", "description": "Bitkoyn is an innovative South African e-commerce platform that allows users to easily buy airtime and pay for utilities with Bitcoin. With Bitkoyn, users can save time and money when sending money through traditional methods.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/02/Bitkoyn.com-logo.jpeg", "href": "https://bitkoyn.com/", "external": true},
      {"title": "My Runway", "category": "", "description": "Runway Sale stands as South Africa's premier online destination for fashion enthusiasts looking to score designer brands at significantly reduced prices and accept Bitcoin payments.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Places-to-spend-sats-My-Runway.png", "href": "https://myrunway.co.za/", "external": true},
      {"title": "Ashworth Africa", "category": "", "description": "Ashworth Africa is based in Cape Town. If you are looking to pay for a trip to Africa with Bitcoin, Ashworth Africa offers tailor-made safari itineraries in key destinations across southern and eastern Africa.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Ashworth-Africa-logo.png", "href": "https://www.ashworthafrica.com/", "external": true},
    ],
  },
  {
    region: "Kenya",
    flag: "\ud83c\uddf0\ud83c\uddea",
    cards: [
      {"title": "Bitpesa", "category": "Accepts Lightning", "description": "A digital payment platform that enables businesses and individuals to send, receive, and hold cryptocurrencies, including bitcoin. This platform caters to the growing demand for digital currency transactions, providing a secure and efficient means for global financial interactions. Whether for remittances, business transactions, or personal asset management.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Places-to-spend-sats-Bitpesa-logo.png", "href": "https://account.bitpesa.co/signin", "external": true},
      {"title": "Tando", "category": "Accepts Lightning", "description": "Tando is a mobile app that allows anyone spend bitcoin anywhere in Kenya, just like cash. Users can buy goods, pay bills, and send mobile money from your favorite Lightning wallet. It is easy and fast to use, with no sign up process. You just download the app and start using it right away. Tando covers all transaction fees as a way to incentivize more people to transition to a bitcoin standard.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/07/Tando.me_.jpg", "href": "https://tando.me/", "external": true},
    ],
  },
  {
    region: "Ghana",
    flag: "\ud83c\uddec\ud83c\udded",
    cards: [
      {"title": "Ghana Dot Com", "category": "", "description": "Ghana Dot Com develops several applications to meet needs of customers. These products are used to provide services to customers or in some cases customers obtain products for their use.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Places-To-spend-sats-Ghana-Dot-Com-logo.webp", "href": "https://ghana.com/", "external": true},
    ],
  },
  {
    region: "Uganda",
    flag: "\ud83c\uddfa\ud83c\uddec",
    cards: [
      {"title": "Orphans of Uganda Children's home", "category": "Accepts Lightning", "description": "The Orphans of Uganda Children Center in Bugiri/Uganda is a non-profit, non-government organization whose vision and goal is to create a home and sustainable projects for orphans and abandoned children in Uganda.", "image": "https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Places-to-spend-sats-Orphans-of-Uganda-logo.jpg", "href": "https://www.orphans-of-uganda.org/", "external": true},
    ],
  },
]