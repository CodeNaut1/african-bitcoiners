export type ResourceItem = {
  title: string
  description: string
  image: string
  href: string
  buttonLabel: string
}

export type ResourceSection = {
  id: string
  heading: string
  items: ResourceItem[]
}

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: 'bitcoin-resources',
    heading: 'Bitcoin Resources',
    items: [
      {
        title: 'Bitcoin for Beginners Course',
        description:
          'Sign up for a 21-day journey to financial empowerment with our free Bitcoin for Beginners Course! Join our engaging and user-friendly course to grasp the fundamentals of Bitcoin, understand wallet management, and why Bitcoin is the only free and fair money.',
        image: `${R2}/uploads/2023/11/African-Bitcoiners-official_logo.png`,
        href: '#get-course',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Robert Breedlove: The Saylor Series',
        description:
          'This 17 part series is an essential guide to understanding “What is Money”. So many of us take money for granted, but when we take the time to understand it better, suddenly we see the world differently and it becomes obvious why Bitcoin is so important.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Robert_Breedlove.jpg`,
        href: 'https://www.youtube.com/playlist?list=PL2jAZ0x9H0bQFY6wIbQfnrnIlqMcSHd6X',
        buttonLabel: 'Watch/Listen to Series',
      },
      {
        title: 'The Bitcoin Standard',
        description:
          'Discover why Bitcoin is the best form of money ever created in this groundbreaking book by economist Saifedean Ammous. The Bitcoin Standard explores the history of money, the failures of fiat currencies, and how Bitcoin restores sound monetary principles in a digital age.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_The_Bitcoin_Standard.webp`,
        href: 'https://library.lol/main/7D394651158ABC9470CBCCE538FAAA49',
        buttonLabel: 'Read',
      },
      {
        title: 'The Bitcoin White Paper',
        description:
          'This is the groundbreaking document that introduced the world to the concept of decentralised digital currency. It outlines the fundamentals of the Bitcoin protocol, emphasising a peer-to-peer electronic cash system. This document serves as the foundational blueprint, illustrating how Bitcoin transcends borders, eliminates intermediaries, and empowers individuals financially.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Bitcoin-whitepaper.jpg`,
        href: '/learn-bitcoin/bitcoin-whitepaper/',
        buttonLabel: 'Read',
      },
      {
        title: 'Mastering Bitcoin',
        description:
          'This book is an essential resource for those who wish to gain a thorough understanding of the world’s first digital currency. It carefully explores the various aspects of Bitcoin, from its technical intricacies to practical applications. Mastering Bitcoin presents clear explanations, enabling a confident grasp of every facet of digital currency.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Mastering_Bitcoin.jpg`,
        href: 'https://unglueit-files.s3.amazonaws.com/ebf/05db7df4f31840f0a873d6ea14dcc28d.pdf',
        buttonLabel: 'Read',
      },
      {
        title: 'Simple Bitcoin',
        description:
          'Simple Bitcoin is your gateway to starting a rewarding Bitcoin journey. Recommended for anyone new to Bitcoin, their gamified learning approach, user-friendly dashboard, and regular Bitcoin news summaries make understanding and studying Bitcoin easy and accessible.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Simple-Bitcoin-logo.png`,
        href: 'https://www.simple-bitcoin.app/',
        buttonLabel: 'Read',
      },
    ],
  },
  {
    id: 'bitcoin-podcasts',
    heading: 'Bitcoin Podcasts/Shows',
    items: [
      {
        title: 'Btc Sessions',
        description:
          'BTC Sessions is a popular Bitcoin YouTube channel that provides simple bitcoin tutorials to help you understand Bitcoin. You will receive tutorials on wallets, hardware, security, and exchanges, as well as the most recent news and interviews with Bitcoin industry professionals.',
        image: `${R2}/uploads/2024/02/Btc-Sessions-image.jpg`,
        href: 'https://www.youtube.com/c/BTCSessions',
        buttonLabel: 'Watch',
      },
      {
        title: 'Bitcoin Review Podcast',
        description:
          'Immerse yourself in Bitcoin analysis with the “Bitcoin Review Podcast.” Gain a comprehensive understanding of the latest trends, softwares, developments, and market dynamics as this podcast takes you on an informative journey through the intricacies of Bitcoin.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Bitcoin-Review-Podcast.jpg`,
        href: 'https://bitcoin.review/',
        buttonLabel: 'Listen',
      },
      {
        title: 'Stephan Livera Podcast',
        description:
          'Dive deep into the Bitcoin rabbit hole with the Stephen Livera Podcast. Stephen Livera engages in insightful conversations with prominent figures in the Bitcoin space, providing listeners with a wealth of knowledge and perspectives.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Stephan-Livera-Podcast-image.jpg`,
        href: 'https://stephanlivera.com/episodes/',
        buttonLabel: 'Listen',
      },
      {
        title: 'The Bitcoin Podacst Network',
        description:
          'The Bitcoin Podcast Network amplifies the voice of Bitcoin, offering a rich range of insights for enthusiasts and learners alike. Tune in to an array of Bitcoin podcasts that cater to diverse interests within the Bitcoin community, fostering a sense of connection and knowledge-sharing.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_The-Bitcoin-Podcast-network.png`,
        href: 'https://thebitcoinpodcast.com/',
        buttonLabel: 'Listen',
      },
      {
        title: 'What Bitcoin Did',
        description:
          'Explore the diverse landscape of Bitcoin with Peter McCormack on What Bitcoin Did. This podcast offers an array of discussions, interviews, and insights, making it a valuable resource for anyone seeking a comprehensive understanding of the evolving world of Bitcoin.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_What-Bitcoin-Did.jpg`,
        href: 'https://www.whatbitcoindid.com/podcast?offset=1671626475696',
        buttonLabel: 'Listen',
      },
      {
        title: 'Fountain Podcast App',
        description:
          'Step into a world of Bitcoin knowledge with the Fountain Podcast App, a platform designed to provide you insightful Bitcoin conversations. Immerse yourself in a stream of podcasts that cover a wide range of Bitcoin topics, from market trends to the technical intricacies.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Fountain-Podcast.png`,
        href: 'https://www.fountain.fm/',
        buttonLabel: 'Listen',
      },
      {
        title: 'Rabbit Hole Recap',
        description:
          'Uncover the depths of the Bitcoin world with “Rabbit Hole Recap,” a captivating weekly Bitcoin podcast featuring the dynamic duo Odell and Marty. Join them as they navigate the Bitcoin landscape, offering valuable insights and thought-provoking discussions.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Rabbit_Hole_Recap_Podcast.jpg`,
        href: 'https://rhr.tv/',
        buttonLabel: 'Listen',
      },
    ],
  },
  {
    id: 'free-bitcoin-courses',
    heading: 'Free Bitcoin Courses',
    items: [
      {
        title: 'PRDV151: Bitcoin for Everybody',
        description:
          'Bitcoin for Everybody, is a comprehensive course designed for individuals eager to grasp the fundamentals of Bitcoin. This course offers accessible insights into the world of digital currency, making it an ideal starting point for those looking to understand Bitcoin’s universal appeal and practical applications.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Saylor-academy-Bitcoin-for-Everybody.png`,
        href: 'https://learn.saylor.org/course/PRDV151',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'CS120: Bitcoin for Developers I',
        description:
          'Bitcoin for Developers I is tailor-made for developers seeking to delve into the intricacies of Bitcoin. Uncover the coding essentials and explore the technical foundations that underpin this revolutionary cryptocurrency. It provides a solid foundation for aspiring developers looking to contribute to the technology.',
        image: `${R2}/uploads/2024/02/Saylor-academy-Bitcoin-for-Developers-I.png`,
        href: 'https://learn.saylor.org/course/CS120',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Crack the Orange',
        description:
          'Embark on an educational journey to financial sovereignty with “Crack the Orange,” a course meticulously crafted by Anita Posch for Bitcoin educators and community builders in the Global South. It has a scholarship program for individuals who can’t afford the program -apply for the Bitcoin for Fairness scholarship and become a student for a year.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Anita_Posch_Crack_The_Orange.jpeg`,
        href: 'https://my.cracktheorange.com/scholarship/',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Btrust Builders Fellowhip for Developers',
        description:
          'The Btrust Builders Fellowship provides a unique opportunity to hone your skills and contribute to the advancement of Bitcoin technology. Join this fellowship to collaborate with like-minded individuals and make meaningful contributions to the innovative world of Bitcoin development.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Btrust-builders-logo.jpg`,
        href: 'https://qala.homerun.co/btrust-builders-application/en/apply?&step=1',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Free Bitcoin Crash Course by 99Bitcoins',
        description:
          'Accelerate your Bitcoin knowledge with the Free Bitcoin Crash Course, a quick and accessible way to grasp the essentials of this digital currency. Ideal for those seeking a rapid yet comprehensive overview, this crash course ensures you’re equipped with the fundamental concepts of Bitcoin.',
        image: `${R2}/uploads/2024/02/99-Bitcoins-img-scaled.jpg`,
        href: 'https://www.youtube.com/@99Bitcoins',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Udemy X Draper University: The Bitcoin Basics',
        description:
          'Join Udemy and Draper University for “The Bitcoin Basics” course, an educational collaboration offering a comprehensive exploration of Bitcoin’s core concepts. Perfect for learners of all levels, this course ensures a solid understanding of the foundational elements of Bitcoin.',
        image: `${R2}/uploads/2024/02/Udemy.webp`,
        href: 'https://www.udemy.com/course/the-bitcoin-course/',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Bitcoin: What is it? By Khan Academy',
        description:
          'This is an insightful resource breaking down the complexities of Bitcoin in an accessible manner. Perfect for learners of all levels, this educational content simplifies the intricate concepts of Bitcoin, making it engaging and informative.',
        image: `${R2}/uploads/2024/02/khan-academy-logo-e1708327580250.png`,
        href: 'https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking/bitcoin/v/bitcoin-what-is-it',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'A Beginners Guide to Bitcoin',
        description:
          'Navigate the world of Bitcoin confidently with this course. This comprehensive guide is crafted for newcomers, offering a step-by-step exploration of Bitcoin’s basics, use cases, and practical tips for navigating the Bitcoin landscape.',
        image: `${R2}/uploads/2024/02/101-Blockchains-A-Beginners-Guide-to-Bitcoin.webp`,
        href: 'https://101blockchains.com/bitcoin-guide/',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Self-custody your Bitcoin',
        description:
          'Learn the art of self-custody with this invaluable course. Gain insights into securing and managing your Bitcoin independently, empowering you to take control of your digital assets with confidence and security.',
        image: `${R2}/uploads/2024/02/Self-custody-your-Bitcoin-Udemy-e1708327985848.jpg`,
        href: 'https://www.udemy.com/course/bitcoin-crypto-self-custody/',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Bitcoin Technologies',
        description:
          'This course helps you explore the diverse technologies driving the evolution of Bitcoin with this in-depth course. From Segregated Witness to Lightning Network, delve into the technical innovations shaping the future of Bitcoin.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Coursera-logo.png`,
        href: 'https://www.coursera.org/learn/cryptocurrency',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Bitcoin Magazine: 21 Days of Bitcoin',
        description:
          'Immerse yourself in the informative journey offered by Bitcoin Magazine’s “21 Days of Bitcoin.” This series unfolds daily insights, covering a wide range of topics to provide a holistic understanding of Bitcoin over the course of three weeks.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Bitcoin-Magazine-logo.jpg`,
        href: 'https://mailchi.mp/b4a28e31041a/qd6tc53wb4',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Coingeek: Bitcoin for Beginners',
        description:
          'Coingeek presents “Bitcoin for Beginners,” a resource designed to demystify the world of Bitcoin. Whether you’re new to Bitcoin or seeking a refresher, this course provides a clear and concise overview of Bitcoin’s fundamentals.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Coingeek_logo.webp`,
        href: 'https://coingeek.com/bitcoin101/',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'How does Bitcoin actually work?',
        description:
          'Uncover the intricacies of Bitcoin’s functionality with this insightful course. From transactions to mining, gain a clear understanding of how Bitcoin operates at a technical level.',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Learning_Resources_Looking-glass.jpg`,
        href: 'https://lookingglasseducation.com/',
        buttonLabel: 'Sign Up',
      },
      {
        title: 'Bitcoin Design Projects',
        description:
          'Whether you’re an aspiring designer or a developer looking to enhance your design skills, this course provides a dynamic platform to shape the visual landscape of the Bitcoin ecosystem, inviting participants to explore the creative side of Bitcoin development.',
        image: `${R2}/uploads/2024/02/Bitcoin-Design-Communityy.jpg`,
        href: 'https://bitcoin.design/',
        buttonLabel: 'Sign Up',
      },
    ],
  },
]

export const HERO_BG = `${R2}/uploads/2024/02/Bitcoin-learning-resources-hero.png`
export const BULB_ICON = `${R2}/uploads/2024/03/African_Bitcoiners_Learning_Resources_idea-bulb-icon.png`
