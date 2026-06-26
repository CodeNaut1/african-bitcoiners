export type LanguageLink = { label: string; href: string }

export type ResourceRow = {
  title: string
  author: string
  source: string
  languages: LanguageLink[]
}

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const HERO_BG = `${R2}/uploads/2023/12/Languages-Resources-banner.png`

export const TABLE_ROWS: ResourceRow[] = [
  {
    title: 'Welcome to Bitcoin newcomers!',
    author: 'Jameson Lopp',
    source: 'Exonumia',
    languages: [
      { label: 'Oshiwambo', href: 'https://exonumia.africa/ago/ng/' },
      { label: 'Kirundi', href: 'https://exonumia.africa/bdi/rn/' },
      { label: 'Lingala', href: 'https://exonumia.africa/cod/ln/' },
      { label: 'العربية', href: 'https://exonumia.africa/egy/ar/' },
      { label: 'Amharic', href: 'https://exonumia.africa/eth/am' },
      { label: 'Twi', href: 'https://exonumia.africa/gha/twi/' },
      {
        label: 'Kiswahili',
        href: 'https://exonumia.africa/ken/sw/#haya-hapa-maswali-yanayoulizwa-mara-kwa-mara',
      },
      { label: 'Berber (Arabic script)', href: 'https://exonumia.africa/mar/ber/' },
      { label: 'Chewa', href: 'https://exonumia.africa/mwi/ny/#mafuso-ofusidwa-kawiri-kawiri' },
      { label: 'Oshikwanyama', href: 'https://exonumia.africa/nam/kj/#here-s-your-faq' },
      {
        label: 'Khoekhoegowab',
        href: 'https://exonumia.africa/nam/naq/#neti-ge-a-amsase-ra-dihe-didi-tsi-ereamdi-tsina',
      },
      {
        label: 'Oshindonga',
        href: 'https://exonumia.africa/nam/ng/#mpaka-otapu-landula-omapulo-ngoka-hagapulwa-olundji',
      },
      { label: 'Hausa', href: 'https://exonumia.africa/nga/ha/#ga-faq-%C9%97in-ku' },
      { label: 'Igbo', href: 'https://exonumia.africa/nga/ig/#nke-a-bu-ajuju-gi-a-na-ajukari' },
      {
        label: 'Yoruba',
        href: 'https://exonumia.africa/nga/yo/#awon-won-yin-ni-ohun-ti-e-ma-n-beere-julo-faq',
      },
      { label: 'Kinyarwanda', href: 'https://exonumia.africa/rwa/rw/#dore-ibibazo-byawe' },
      { label: 'Somali', href: 'https://exonumia.africa/som/so/#waa-tan-faq' },
      { label: 'Forro Creole', href: 'https://exonumia.africa/stp/cri/#aqui-esta-o-seu-faq' },
      { label: 'Luganda', href: 'https://exonumia.africa/uga/' },
      { label: 'Shona', href: 'https://exonumia.africa/zwe/sn/#mibvunzo-inonyanyo-kubvunzwa' },
      { label: 'Afrikaans', href: 'https://exonumia.africa/zaf/af/#hier-is-jou-algemene-vrae' },
      {
        label: 'IsiNdebele',
        href: 'https://exonumia.africa/zaf/nr/#nasi-imibuzo-ethandwa-ukubuza-ngabatjha-neempendulo-zayo',
      },
      {
        label: 'Sepedi',
        href: 'https://exonumia.africa/zaf/nso/#ke-tse-dipotsiso-tsa-gago-tseo-di-botsiswago-gantsi-faq',
      },
      { label: 'Xitsonga', href: 'https://exonumia.africa/zaf/ts/#hi-leyi-faq-ya-wena' },
      { label: 'Sesotho', href: 'https://exonumia.africa/zaf/st/#mona-ke-dipotso-tsa-hao-tse-botsoang-ha-ngata' },
      { label: 'TshiVenda', href: 'https://exonumia.africa/zaf/ve/#mbudziso-dzi-dzulelaho-u-fhudziswa-khedzi' },
      { label: 'IsiXhosa', href: 'https://exonumia.africa/zaf/xh/#nantsi-imibuzo-ebuzwa-rhoqo' },
      { label: 'IsiZulu', href: 'https://exonumia.africa/zaf/zu/#nayi-imibuzo-ebuzwa-njalo' },
    ],
  },
  {
    title: 'Bitcoin Flyer',
    author: '',
    source: 'Bitcoin For Fairness',
    languages: [
      {
        label: 'Swahili/Kiswahili',
        href: 'https://bffbtc.org/wp-content/uploads/2022/11/BFF-SWA-Bitcoin-flyer.pdf',
      },
      {
        label: 'Luganda/Oluganda',
        href: 'https://bffbtc.org/wp-content/uploads/2022/11/BFF-Luganda-Bitcoin-flyer.pdf',
      },
      { label: 'English', href: 'https://bffbtc.org/flyer/' },
    ],
  },
  {
    title: 'Bitcoin Whitepaper',
    author: '',
    source: 'Bitcoin Mtaani',
    languages: [
      {
        label: 'Yoruba',
        href: 'https://rumble.com/v13erqr-bitcoin-white-paper-translation-to-yoruba.html?mref=14hubh&mc=cvg6r',
      },
      {
        label: 'Swahili',
        href: 'https://rumble.com/v13il1i-bitcoin-white-paper-translation-to-swahili.html?mref=14hubh&mc=cvg6r',
      },
      {
        label: 'Zulu',
        href: 'https://rumble.com/v13dljn-bitcoin-white-paper-translation-to-isizulu.html?mref=14hubh&mc=cvg6r',
      },
      {
        label: 'Lingala',
        href: 'https://rumble.com/v13erqr-bitcoin-white-paper-translation-to-yoruba.html?mref=14hubh&mc=cvg6r',
      },
    ],
  },
  {
    title: 'What is Bitcoin',
    author: '',
    source: 'Bitcoin Mtaani',
    languages: [
      {
        label: 'Swahili',
        href: 'https://rumble.com/v1edt1h-build-with-bitcoin-swahili.html?mref=14hubh&mc=cvg6r',
      },
    ],
  },
  {
    title: 'Munn Wallet Tutorial',
    author: '',
    source: 'Bitcoin Mtaani',
    languages: [
      {
        label: 'Lingala',
        href: 'https://rumble.com/v18xh3a-lingala-muun-wallet-tutorial.html?mref=14hubh&mc=cvg6r',
      },
      {
        label: 'Yoruba',
        href: 'https://rumble.com/v17xq85-muun-wallet-tutorial-in-yoruba.html?mref=14hubh&mc=cvg6r',
      },
      {
        label: 'Zulu',
        href: 'https://rumble.com/v17z2j9-muun-wallet-tutorial-in-zulu.html?mref=14hubh&mc=cvg6r',
      },
    ],
  },
  {
    title: 'Become a Bitcoin Expert',
    author: '',
    source: 'Kive Clair',
    languages: [{ label: 'French', href: 'https://kiveclair.com/formations/' }],
  },
]
