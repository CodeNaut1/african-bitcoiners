import type { Payload } from 'payload'

import { FORM_SETTINGS_SLUG_OPTIONS } from '../src/lib/form-slug-options'

type FormSlug = (typeof FORM_SETTINGS_SLUG_OPTIONS)[number]['value']

type FormSeed = {
  formSlug: FormSlug
  formTitle: string
  confirmationHeading: string
  confirmationDescription: string
  showNpsFeedback?: boolean
  teamEmailGroup: 'community' | 'general' | 'sensitive' | 'test'
  userNotificationEnabled?: boolean
  userNotificationSubject?: string
  userNotificationBody?: string
}

export const DEFAULT_FORM_SETTINGS: FormSeed[] = [
  {
    formSlug: 'newsletter-signup',
    formTitle: 'Newsletter Signup',
    confirmationHeading: 'Thanks for subscribing!',
    confirmationDescription:
      "You'll receive our weekly Bitcoin newsletter. Check your email for confirmation.",
    showNpsFeedback: false,
    teamEmailGroup: 'test',
    userNotificationEnabled: true,
    userNotificationSubject: 'Thank you for Signing Up! 🥳',
    userNotificationBody:
      'Welcome {{name}}!\n\nThank you for subscribing to our weekly Bitcoin updates. It is going to be so much fun because we will be unraveling the latest developments and opportunities in the African Bitcoin space.',
  },
  {
    formSlug: 'contact',
    formTitle: 'Contact Form',
    confirmationHeading: 'Message received!',
    confirmationDescription: "We'll get back to you within 48 hours.",
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'course-signup-english',
    formTitle: 'BFB Course Signup (English)',
    confirmationHeading: "You're enrolled!",
    confirmationDescription:
      'Check your email for course access details. Your Bitcoin learning journey starts now!',
    showNpsFeedback: true,
    teamEmailGroup: 'general',
    userNotificationEnabled: true,
    userNotificationSubject: 'Welcome to Bitcoin for Beginners!',
    userNotificationBody:
      'Hi {{name}},\n\nWelcome to Bitcoin for Beginners! Check your email for course access details and your next steps on this Bitcoin learning journey.',
  },
  {
    formSlug: 'course-signup-french',
    formTitle: 'BFB Course Signup (French)',
    confirmationHeading: 'Vous êtes inscrit(e) !',
    confirmationDescription:
      'Consultez votre courriel pour les détails d\'accès au cours. Votre parcours d\'apprentissage Bitcoin commence maintenant !',
    showNpsFeedback: true,
    teamEmailGroup: 'general',
    userNotificationEnabled: true,
    userNotificationSubject: 'Bienvenue à Bitcoin pour les Débutants !',
    userNotificationBody:
      'Bonjour {{name}},\n\nBienvenue à Bitcoin pour les Débutants ! Consultez votre courriel pour les détails d\'accès au cours et vos prochaines étapes dans ce parcours d\'apprentissage Bitcoin.',
  },
  {
    formSlug: 'course-signup-telegram-english',
    formTitle: 'BFB Course Signup - Telegram (English)',
    confirmationHeading: "You're enrolled!",
    confirmationDescription:
      "Save your unique code below. You'll need it to access the Bitcoin for Beginners course on Telegram.",
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'course-signup-telegram-french',
    formTitle: 'BFB Course Signup - Telegram (French)',
    confirmationHeading: 'Vous êtes inscrit !',
    confirmationDescription:
      'Enregistrez votre code unique ci-dessous. Vous en aurez besoin pour accéder au cours Bitcoin pour Débutants sur Telegram.',
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'feedback-bounty',
    formTitle: 'Feedback Bounty',
    confirmationHeading: 'Feedback submitted!',
    confirmationDescription:
      "Your feedback has been received. If approved, you'll receive your sats reward.",
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'donation',
    formTitle: 'Donation',
    confirmationHeading: 'Thank you for your support!',
    confirmationDescription:
      'Your donation helps fund Bitcoin education across Africa.',
    showNpsFeedback: true,
    teamEmailGroup: 'sensitive',
    userNotificationEnabled: true,
    userNotificationSubject: 'Thank you for your generous donation!',
    userNotificationBody:
      'Hi {{name}},\n\nThank you for your generous donation to African Bitcoiners. Your support helps fund Bitcoin education across Africa.',
  },
  {
    formSlug: 'job-submission',
    formTitle: 'Job Submission',
    confirmationHeading: 'Job listing submitted!',
    confirmationDescription:
      'Your listing will be reviewed and published within 24 hours.',
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'education-partnership',
    formTitle: 'Education Partnership',
    confirmationHeading: 'Application received!',
    confirmationDescription:
      "We'll review your partnership application and respond within 5 business days.",
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: true,
    userNotificationSubject: 'Partnership Application Received',
    userNotificationBody:
      'Hi {{name}},\n\nThank you for your interest in partnering with African Bitcoiners. We have received your application and will respond within 5 business days.',
  },
  {
    formSlug: 'savings-challenge',
    formTitle: 'Savings Challenge',
    confirmationHeading: "You're in!",
    confirmationDescription:
      'Welcome to the Million Sat Challenge. Check your email for next steps.',
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: true,
    userNotificationSubject: 'Welcome to the Million Sat Challenge!',
    userNotificationBody:
      'Hi {{name}},\n\nWelcome to the Million Sat Challenge! Check your email for next steps on your savings journey.',
  },
  {
    formSlug: 'mining-org',
    formTitle: 'Mining Organization',
    confirmationHeading: 'Submission received!',
    confirmationDescription:
      'Your mining organization will be reviewed and added to the directory.',
    showNpsFeedback: false,
    teamEmailGroup: 'community',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'meetup',
    formTitle: 'Meetup Submission',
    confirmationHeading: 'Meetup submitted!',
    confirmationDescription:
      'Your meetup will be reviewed and listed on our map.',
    showNpsFeedback: false,
    teamEmailGroup: 'community',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'volunteer',
    formTitle: 'Volunteer',
    confirmationHeading: 'Thanks for volunteering!',
    confirmationDescription:
      "We'll be in touch with opportunities that match your skills.",
    showNpsFeedback: true,
    teamEmailGroup: 'community',
    userNotificationEnabled: true,
    userNotificationSubject: 'Thank you for volunteering!',
    userNotificationBody:
      'Hi {{name}},\n\nThank you for volunteering with African Bitcoiners. We will be in touch with opportunities that match your skills.',
  },
  {
    formSlug: 'graduate-program',
    formTitle: 'Graduate Program',
    confirmationHeading: 'Application received!',
    confirmationDescription:
      'Your graduate program application is being reviewed.',
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'map-location',
    formTitle: 'Map Location',
    confirmationHeading: 'Location submitted!',
    confirmationDescription:
      'Your location will be reviewed and added to our map.',
    showNpsFeedback: false,
    teamEmailGroup: 'community',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'places-earn',
    formTitle: 'Places to Earn Sats',
    confirmationHeading: 'Submission received!',
    confirmationDescription:
      'Thanks — we will review your suggestion and add it if it fits our places-to-earn list.',
    showNpsFeedback: false,
    teamEmailGroup: 'community',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'miab-nomination',
    formTitle: 'MIAB Nomination',
    confirmationHeading: 'Nomination received!',
    confirmationDescription:
      'Thank you for nominating an African Bitcoiner. Our team will review your submission.',
    showNpsFeedback: false,
    teamEmailGroup: 'general',
    userNotificationEnabled: false,
  },
  {
    formSlug: 'ecosystem',
    formTitle: 'Ecosystem Submission',
    confirmationHeading: 'Submission received!',
    confirmationDescription:
      'Your project will be reviewed and added to the ecosystem directory.',
    showNpsFeedback: false,
    teamEmailGroup: 'community',
    userNotificationEnabled: false,
  },
]

export async function seedFormSettings(payload: Payload): Promise<void> {
  const existing = await payload.findGlobal({
    slug: 'form-settings',
    overrideAccess: true,
  })

  if (existing.forms?.length) {
    payload.logger.info('✓ Form settings: already configured, skipped')
    return
  }

  await payload.updateGlobal({
    slug: 'form-settings',
    data: {
      forms: DEFAULT_FORM_SETTINGS.map((form) => ({
        formSlug: form.formSlug,
        formTitle: form.formTitle,
        enabled: true,
        confirmationHeading: form.confirmationHeading,
        confirmationDescription: form.confirmationDescription,
        showNpsFeedback: form.showNpsFeedback ?? false,
        redirectToConfirmation: true,
        teamNotificationEnabled: true,
        teamEmailGroup: form.teamEmailGroup,
        teamNotificationSubjectTemplate: 'New Entry: {{form_title}}',
        userNotificationEnabled: form.userNotificationEnabled ?? false,
        userNotificationSubjectTemplate: form.userNotificationSubject ?? '',
        userNotificationBodyTemplate: form.userNotificationBody ?? '',
        userNotificationFromName: 'African Bitcoiners',
      })),
    },
    overrideAccess: true,
  })

  payload.logger.info(`✓ Form settings seeded with ${DEFAULT_FORM_SETTINGS.length} forms`)
}
