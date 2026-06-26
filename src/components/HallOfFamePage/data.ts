const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2025/01/African-Bitcoiners-Hall-of-fame-bg.png`,
  abubakarThumb: `${R2}/uploads/2025/12/hall-of-fame-abubakar.png`,
  abubakarFull: `${R2}/uploads/2026/01/hall-of-fame-abubakar-square-879x1024.png`,
  lorraineThumb: `${R2}/uploads/2025/01/Lorraine-Marcel.png`,
  lorraineFull: `${R2}/uploads/2025/01/Lorraine-Marcel-full.png`,
  kgothatsoThumb: `${R2}/uploads/2025/01/Kgothatso-Ngako.png`,
  kgothatsoFull: `${R2}/uploads/2025/01/Kgothatso-Ngako-full.png`,
  faridaThumb: `${R2}/uploads/2025/01/Farida-Nabourema.png`,
  faridaFull: `${R2}/uploads/2025/01/Farida-Nabourema-full.png`,
}

export const COPY = {
  eyebrow: 'AFRICAN BITCOINERS',
  titleMain: 'HALL',
  titleOf: 'of',
  titleFame: 'FAME',
  introParagraphs: [
    'Since its inception, the “<strong>Most Impactful African Bitcoiners</strong>” initiative has spotlighted exceptional individuals who have significantly advanced Bitcoin adoption, education, and innovation across Africa. Each year, we honor changemakers who are shaping the continent\'s Bitcoin narrative.',
    'However, some individuals exhibit a consistent thread of impact that cannot be overstated. Their contributions extend beyond a single moment of recognition—they embody the enduring spirit of leadership, vision, and dedication. To honor these extraordinary pioneers, we are proud to introduce the African Bitcoiners Hall of Fame.',
  ],
  celebratingTitle: 'Celebrating Legacy and Consistency',
  celebratingBody:
    'The Hall of Fame is our way of forever cementing the impact of those who have been ranked as the <strong>#1 Most Impactful African Bitcoiner</strong>. While these remarkable individuals cannot be featured on the list again, their unwavering efforts continue to inspire and drive change across the continent.',
}

export const FEATURED = [
  {
    thumb: IMG.faridaThumb,
    year: 2022,
    href: '/the-most-impactful-african-bitcoiners-of-2022/',
    alt: 'Farida Nabourema',
  },
  {
    thumb: IMG.kgothatsoThumb,
    year: 2023,
    href: '/the-most-impactful-african-bitcoiners-of-2023/',
    alt: 'Kgothatso Ngako',
  },
  {
    thumb: IMG.lorraineThumb,
    year: 2024,
    href: '/the-most-impactful-african-bitcoiners-of-2024/',
    alt: 'Lorraine Marcel',
  },
  {
    thumb: IMG.abubakarThumb,
    year: 2025,
    href: '/the-most-impactful-african-bitcoiners-of-2025/',
    alt: 'Abubakar Nur Khalil',
  },
]

export const OTHER_YEARS = [
  { label: 'The Most Impactful African Bitcoiners of 2024', href: '/the-most-impactful-african-bitcoiners-of-2024/' },
  { label: 'The Most Impactful African Bitcoiners of 2023', href: '/the-most-impactful-african-bitcoiners-of-2023/' },
  { label: 'The Most Impactful African Bitcoiners of 2022', href: '/the-most-impactful-african-bitcoiners-of-2022/' },
]

export type HofMember = {
  name: string
  flag: string
  country: string
  year: number
  miabHref: string
  photo: string
  imageOnLeft: boolean
  bioHtml: string
}

export const MEMBERS: HofMember[] = [
  {
    name: 'Abubakar Nur Khalil',
    flag: '🇳🇬',
    country: 'Nigeria',
    year: 2025,
    miabHref: '/the-most-impactful-african-bitcoiners-of-2025/',
    photo: IMG.abubakarFull,
    imageOnLeft: true,
    bioHtml: `<p><strong>Abubakar Nur Khalil</strong> is a prominent Nigerian figure in the global Bitcoin ecosystem, known for his deep involvement in Bitcoin development, investment, and ecosystem building across Africa and the Global South.</p>
<p>He is a Bitcoin Core contributor and the CEO of <a href="https://x.com/rcrsvcapital?s=21" target="_blank" rel="noopener noreferrer"><strong>Recursive Capital</strong></a>, a Bitcoin-focused venture capital firm dedicated to supporting companies and infrastructure aligned with the Bitcoin network.</p>
<p>In addition to his role at Recursive Capital, Abubakar serves as a board member and interim CEO of <a href="https://x.com/btrustteam?s=21" target="_blank" rel="noopener noreferrer"><strong>Btrust</strong></a>, a non-profit organization focused on training and supporting Bitcoin developers in Africa and the Global South through initiatives. His work with Btrust has been instrumental in strengthening local technical capacity and fostering a new generation of African Bitcoin developers.</p>
<p>Beyond his operational roles, Abubakar Nur Khalil actively contributes to public discourse around Bitcoin as a <strong>Forbes Digital Assets Contributor</strong>, sharing insights on Bitcoin development, investment, and the importance of open-source collaboration.</p>`,
  },
  {
    name: 'Lorraine Marcel',
    flag: '🇰🇪',
    country: 'Kenya',
    year: 2024,
    miabHref: '/the-most-impactful-african-bitcoiners-of-2024/',
    photo: IMG.lorraineFull,
    imageOnLeft: false,
    bioHtml: `<p>Lorraine Marcel is a dedicated financial activist and Bitcoin advocate with over six years of experience in East Africa's tech ecosystem. She is the founder of <a href="https://btcdada.com/" target="_blank" rel="noopener noreferrer">Bitcoin Dada</a> and <a href="https://x.com/DadaDevs" target="_blank" rel="noopener noreferrer">Dada Devs</a> initiatives focused on empowering African women through financial education and access to technology resources.</p>
<p>Bitcoin Dada, meaning "sister" in Swahili, is a community that provides a safe space for African women to learn about Bitcoin and share their experiences. The program offers both online and physical workshops across several African countries, including Kenya, Uganda, Nigeria, South Africa, Ghana, and Namibia. It aims to eliminate misinformation, close the gender gap, and accelerate Bitcoin adoption across the continent.</p>
<p>Under Lorraine's leadership, Bitcoin Dada has expanded its presence to 11 African countries in the past two years and has been recognized by prestigious media platforms such as Forbes and CoinDesk. She has also partnered with universities and fintech companies to advance financial education and drive innovation across Africa. Lorraine's work extends beyond regional borders; she has spoken at international conferences, highlighting the importance of financial empowerment on a global stage. She is a prominent host of fintech events, fostering collaboration, networking, and knowledge-sharing among industry leaders and enthusiasts.</p>`,
  },
  {
    name: 'Kgothatso Ngako',
    flag: '🇿🇦',
    country: 'South Africa',
    year: 2023,
    miabHref: '/the-most-impactful-african-bitcoiners-of-2023/',
    photo: IMG.kgothatsoFull,
    imageOnLeft: true,
    bioHtml: `<p>Kgothatso Ngako is a prominent figure in Africa's Bitcoin landscape, known for his innovative efforts to make Bitcoin more accessible across the continent. He is the founder of <a href="https://exonumia.africa/" target="_blank" rel="noopener noreferrer">Exonumia</a>, an open-source platform dedicated to translating Bitcoin-related content into native African languages, thereby bridging language barriers and promoting a wider understanding of Bitcoin in Africa.</p>
<p>In addition to Exonumia, Ngako developed <a href="https://8333.mobi/" target="_blank" rel="noopener noreferrer">Machankura</a>, a service that enables Bitcoin transactions via USSD, allowing individuals without internet access to send and receive Bitcoin using basic mobile phones.<br />Ngako's work has been instrumental in educating and empowering African communities by providing them with the tools and knowledge to participate in the global Bitcoin economy. His contributions have been recognized in various platforms, <a href="https://creators.spotify.com/pod/show/the-nobcast/episodes/Ep-31-Taking-Bitcoin-to-the-Grassroots-with-Machankura-Featuring-Kgothatso-Ngako" target="_blank" rel="noopener noreferrer">including interviews and discussions focused on grassroots adoption of Bitcoin in Africa</a>.</p>
<p>Through his initiatives, Ngako continues to play a vital role in the financial inclusion of unbanked populations in Africa, leveraging Bitcoin's decentralized nature to offer alternative financial solutions.</p>`,
  },
  {
    name: 'Farida Nabourema',
    flag: '🇹🇬',
    country: 'Togo',
    year: 2022,
    miabHref: '/the-most-impactful-african-bitcoiners-of-2022/',
    photo: IMG.faridaFull,
    imageOnLeft: false,
    bioHtml: `<p><a href="https://en.wikipedia.org/wiki/Farida_Nabourema" target="_blank" rel="noopener noreferrer">Farida Nabourema</a> is a trailblazing Togolese activist, author, and advocate for democracy and financial freedom. She has spent much of her life fighting against oppression in Togo and empowering others across Africa. At just 20, she founded the "Faure Must Go" movement, challenging the decades-long autocratic rule of President Faure Gnassingbé. Her courage and determination have made her a symbol of resistance in the region.</p>
<p>In 2014, Farida published <a href="https://nabourema.com/index.php/publication/" target="_blank" rel="noopener noreferrer">La Pression de l'Oppression (The Pressure of Oppression)</a>, a powerful collection of essays that analyze different forms of oppression in Africa and urge young people and women to get involved in political activism.</p>
<p>More recently, Farida has become one of Africa's leading voices for Bitcoin adoption. She sees Bitcoin as a tool to fight financial injustice and empower individuals, especially in countries with oppressive regimes. Her work highlights how Bitcoin can offer financial autonomy and support social justice movements. In December 2022, she organized the first-ever Africa Bitcoin Conference in Accra, Ghana, bringing together innovators, thought leaders, and policymakers to discuss how Bitcoin could transform Africa's financial systems.</p>`,
  },
]
