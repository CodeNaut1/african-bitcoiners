const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'
const SITE = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bitcoiners.africa'

const COURSE_URL = `${SITE}/learn-bitcoin/free-bitcoin-course`

export const IMG = {
  celebrate: `${R2}/uploads/2023/04/celebrate.png`,
  briefcase: `${R2}/uploads/2022/11/briefcase.png`,
  gpsPhone: `${R2}/uploads/2022/11/gps-phone.png`,
  gift: `${R2}/uploads/2022/11/gift.png`,
}

export const LINKS = {
  getCertificate: '/get-certificate',
  bitcoinerTest: 'https://bitcoinertest.com/',
}

export const SHARE_LINKS = {
  whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
    ' Looking for a fantastic and easy way to learn about Bitcoin? Then check out African Bitcoiners Bitcoin for Beginners course delivered conveniently to you daily via email: ' +
      COURSE_URL,
  )}`,
  twitter: `https://twitter.com/share?url=${encodeURIComponent(COURSE_URL)}&text=${encodeURIComponent(
    'I just passed the @afribitcoiners Bitcoin for Beginners course delivered via email. Click on the link to check it out:',
  )}&hashtags=${encodeURIComponent('#Bitcoin course')}`,
  facebook: `https://www.facebook.com/share.php?u=${encodeURIComponent(COURSE_URL)}`,
  linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(COURSE_URL)}&title=${encodeURIComponent(
    'Looking for a fantastic way to learn about Bitcoin? Check out @afribitcoiners Bitcoin for Beginners course delivered via email. I earned 10,000 sats for taking the course! Click here to subscribe to the course.',
  )}`,
}

export const MORE_CARDS = [
  {
    title: 'Bitcoiner jobs',
    description: 'Ready to work in the Bitcoin space? Check out all available jobs on our page and apply!',
    image: IMG.briefcase,
    href: '/earn-bitcoin/bitcoiner-jobs',
    cta: 'Apply',
  },
  {
    title: 'Bitcoiners map',
    description: 'See where you can spend Bitcoin in Africa and also add locations/ businesses that accept Bitcoin',
    image: IMG.gpsPhone,
    href: '/spend-bitcoin/bitcoiners-map',
    cta: 'Apply',
  },
  {
    title: 'Support our mission',
    description: 'Support Our Mission to Empower Africans through Bitcoin Education and guide them to safely own sats.',
    image: IMG.gift,
    href: '/about-us/support-us',
    cta: 'Apply',
  },
]
