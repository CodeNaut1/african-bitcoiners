const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  ctaPhoto: `${R2}/uploads/2024/04/African_Bitcoiner_Bitcoin_course_image1.png`,
  getInTouchPhoto: `${R2}/uploads/2024/04/African_Bitcoiners_get_intouch.png`,
  ipay: `${R2}/uploads/2025/02/ipay_logo-removebg-preview.png`,
  citrus: `${R2}/uploads/2025/02/CITRUS-removebg-preview.png`,
  icon1: `${R2}/uploads/2024/04/African_Bitcoiners_Generic_Partnership_page_icon1.png`,
  icon2: `${R2}/uploads/2024/04/African_Bitcoiners_Generic_Partnership_page_icon2.png`,
  support: `${R2}/uploads/2024/05/African_bitcoiners_support_icon.png`,
  icon3: `${R2}/uploads/2024/04/African_Bitcoiners_Generic_Partnership_page_icon3.png`,
  icon4: `${R2}/uploads/2024/04/African_Bitcoiners_Generic_Partnership_page_icon4.png`,
  icon5: `${R2}/uploads/2024/04/African_Bitcoiners_Generic_Partnership_page_icon5.png`,
}

export const PARTNER_LOGOS = [
  { name: 'iPayBTC', logo: IMG.ipay, url: 'https://ipaybtc.app' },
  { name: 'Citrus Rate', logo: IMG.citrus, url: 'https://citrusrate.com' },
  { name: 'iPayBTC', logo: `${R2}/uploads/2025/04/iPayBTC_Logo_Blue-scaled.png`, url: 'https://ipaybtc.app' },
  { name: 'Citrusrate', logo: `${R2}/uploads/2024/10/Citrusrate.jpg`, url: 'https://citrusrate.com' },
]

export type Feature = {
  icon: string
  title: string
  description: string
}

export const WHY_PARTNER: Feature[] = [
  {
    icon: IMG.icon1,
    title: 'Course Tailored for an African Audience',
    description:
      'Our courses are meticulously crafted to resonate with the unique needs and perspectives of African learners. We understand the cultural nuances and challenges, ensuring that the educational content is relevant and impactful',
  },
  {
    icon: IMG.icon2,
    title: 'Standard or Custom Course Integration',
    description:
      "Choose from our standard course offerings or collaborate with us to develop custom modules tailored to your audience's needs.",
  },
  {
    icon: IMG.support,
    title: 'Dedicated Support Team',
    description:
      "Gain access to a dedicated support team that is committed to providing personalized assistance and guidance throughout your partnership with us. We're here to ensure your success every step of the way.",
  },
  {
    icon: IMG.icon3,
    title: 'Customized Landing Page',
    description:
      'Showcase your brand and seamlessly integrate our educational resources into your website with a fully customized landing page.',
  },
  {
    icon: IMG.icon4,
    title: 'Certificate Customization',
    description:
      'Recognize your learners\' achievements with branded completion certificates, reinforcing your commitment to their education journey.',
  },
  {
    icon: IMG.icon5,
    title: 'Co-Branding',
    description:
      'Enhance your brand visibility by prominently featuring your logo and branding within the course materials.',
  },
]

export type Tier = {
  name: string
  monthlyPrice: string
  yearlyPrice: string
  featuresHeading: string
  features: string[]
}

export const TIERS: Tier[] = [
  {
    name: 'Basic',
    monthlyPrice: 'Free',
    yearlyPrice: 'Free',
    featuresHeading: "WHAT'S INCLUDED",
    features: [
      'Customized landing page',
      'Partner brand on the education partnership landing page',
      'Student signup tracking',
      'Graduate tracking',
      'African Bitcoiners Certificate for Graduates',
      'Dedicated support for technical integration',
      'Support for implementing the tracking codes',
    ],
  },
  {
    name: 'Advanced',
    monthlyPrice: '50,000 sats per month',
    yearlyPrice: '500,000 sats per year',
    featuresHeading: 'EVERYTHING IN BASIC, PLUS',
    features: [
      'Certificate customization with partner branding',
      'Priority access to our support team for any technical issues.',
      'Marketing Collaboration',
      'Customized course completion email',
    ],
  },
  {
    name: 'Premium',
    monthlyPrice: '100,000 sats per month',
    yearlyPrice: '1,000,000 sats per year',
    featuresHeading: 'EVERYTHING IN ADVANCED, PLUS',
    features: [
      'Certificate delivery landing page for partner integration',
      'Course Customization and Branding',
    ],
  },
]
