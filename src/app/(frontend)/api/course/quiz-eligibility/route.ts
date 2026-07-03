import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { checkCertificateEligibility, findCourseSignup } from '@/lib/course-completion'
import { formatAvailableDate, getCertificateAvailableDate } from '@/lib/certificate-shared'

export const dynamic = 'force-dynamic'

type Body = {
  email?: string
  uniqueCode?: string
  language?: 'en' | 'fr'
}

function formatSignupDate(dateInput: string, language: 'en' | 'fr'): string {
  const date = new Date(dateInput)
  return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body
    const email = body.email?.trim()
    const uniqueCode = body.uniqueCode?.trim()
    const language = body.language === 'fr' ? 'fr' : 'en'

    if (!email && !uniqueCode) {
      return NextResponse.json({ eligible: false, error: 'missing_identifier' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const signup = await findCourseSignup(payload, email, uniqueCode)

    if (!signup) {
      const message =
        language === 'fr'
          ? uniqueCode
            ? "Nous n'avons pas trouvé d'inscription au cours avec ce code. Veuillez utiliser le même code que lors de votre inscription."
            : "Nous n'avons pas trouvé d'inscription au cours avec cette adresse email. Veuillez utiliser la même adresse email que lors de votre inscription."
          : uniqueCode
            ? "We couldn't find a course signup with this code. Please use the same code you signed up with."
            : "We couldn't find a course signup with this email. Please use the same email you signed up with."

      return NextResponse.json({ eligible: false, error: 'not_found', message }, { status: 404 })
    }

    const eligibility = await checkCertificateEligibility(payload, email, uniqueCode)
    if (!eligibility.eligible && signup.signupDate) {
      const signupDate = formatSignupDate(signup.signupDate, language)
      const availableDate = formatAvailableDate(getCertificateAvailableDate(signup.signupDate))
      const message =
        language === 'fr'
          ? `Vous vous êtes inscrit(e) le ${signupDate}. Le quiz sera disponible le ${availableDate}. Veuillez d'abord terminer les 21 jours du cours.`
          : `You signed up on ${signupDate}. The quiz will be available on ${availableDate}. Please complete all 21 days of the course first.`

      return NextResponse.json(
        { eligible: false, error: 'too_early', message, signupDate, availableDate },
        { status: 403 },
      )
    }

    return NextResponse.json({
      eligible: true,
      name: signup.name ?? '',
    })
  } catch (err) {
    console.error('[course/quiz-eligibility]', err)
    return NextResponse.json({ eligible: false, error: 'server_error' }, { status: 500 })
  }
}
