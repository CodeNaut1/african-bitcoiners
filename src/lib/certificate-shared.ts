export const CERT_NUMBER_START = 720
export const CERTIFICATE_ELIGIBILITY_DAYS = 17

export type CertificateLanguage = 'English' | 'French'
export type CertificateTier = 'ba' | 'ad' | 'pr'

export const CERT_TEMPLATES = {
  basic:
    'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/01/BFB_COURSE_CERTIFICATE-CANVAS.png',
  advanced:
    'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/05/BFB_COURSE_CERTIFICATE-ADVANCED.png',
  premium:
    'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/05/BFB_COURSE_CERTIFICATE-PREMIUM.png',
  french:
    'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2025/08/BFB_COURSE_CERTIFICATE_FRENCH.png',
} as const

export type CertificateTemplateKey = keyof typeof CERT_TEMPLATES

export function parseCertNumberValue(certNumber?: string | null): number | null {
  if (!certNumber) return null
  const match = certNumber.match(/^BC0*(\d+)$/i)
  if (!match) return null
  return Number.parseInt(match[1], 10)
}

export function formatCertNumber(value: number): string {
  return `BC${String(value).padStart(6, '0')}`
}

export function getCertificateTemplateKey(
  language: CertificateLanguage,
  tierLevel?: CertificateTier | null,
): CertificateTemplateKey {
  if (language === 'French') return 'french'

  switch (tierLevel) {
    case 'ad':
      return 'advanced'
    case 'pr':
      return 'premium'
    default:
      return 'basic'
  }
}

export function getCertificateTemplateUrl(
  language: CertificateLanguage,
  tierLevel?: CertificateTier | null,
): string {
  return CERT_TEMPLATES[getCertificateTemplateKey(language, tierLevel)]
}

export function formatCertificateDate(dateInput: string): string {
  const date = new Date(dateInput)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function getCertificateAvailableDate(signupDate: string): Date {
  const available = new Date(signupDate)
  available.setDate(available.getDate() + CERTIFICATE_ELIGIBILITY_DAYS)
  return available
}

export function formatAvailableDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function normalizeCourseLanguage(value?: string | null): CertificateLanguage {
  return value === 'French' || value === 'fr' ? 'French' : 'English'
}
