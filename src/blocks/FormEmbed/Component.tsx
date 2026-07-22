import React from 'react'
import dynamic from 'next/dynamic'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

// Dynamic imports — forms are client components, keep them out of SSR bundle
const ContactForm = dynamic(() => import('@/components/forms/ContactForm').then((m) => m.ContactForm))
const NewsletterSignupForm = dynamic(() => import('@/components/forms/NewsletterSignupForm').then((m) => m.NewsletterSignupForm))
const SavingsChallengeForm = dynamic(() => import('@/components/forms/SavingsChallengeForm').then((m) => m.SavingsChallengeForm))
const DonationForm = dynamic(() => import('@/components/forms/DonationForm').then((m) => m.DonationForm))
const JobSubmissionForm = dynamic(() => import('@/components/forms/JobSubmissionForm').then((m) => m.JobSubmissionForm))
const MapLocationForm = dynamic(() => import('@/components/forms/MapLocationForm').then((m) => m.MapLocationForm))
const MeetupSubmissionForm = dynamic(() => import('@/components/forms/MeetupSubmissionForm').then((m) => m.MeetupSubmissionForm))
const VolunteerForm = dynamic(() => import('@/components/forms/VolunteerForm').then((m) => m.VolunteerForm))
const FeedbackBountyForm = dynamic(() => import('@/components/forms/FeedbackBountyForm').then((m) => m.FeedbackBountyForm))
const PartnershipForm = dynamic(() => import('@/components/forms/PartnershipForm').then((m) => m.PartnershipForm))
const MiningDirectoryForm = dynamic(() => import('@/components/forms/MiningDirectoryForm').then((m) => m.MiningDirectoryForm))
const MiabNominationForm = dynamic(() => import('@/components/forms/MiabNominationForm').then((m) => m.MiabNominationForm))
const NpsForm = dynamic(() => import('@/components/NpsForm').then((m) => m.NpsForm))

const FORM_MAP: Record<string, React.ComponentType<any>> = {
  'contact-general': ContactForm,
  'newsletter-signup': NewsletterSignupForm,
  'savings-challenge': SavingsChallengeForm,
  donation: DonationForm,
  'job-submission': JobSubmissionForm,
  'map-location': MapLocationForm,
  'meetup-submission': MeetupSubmissionForm,
  volunteer: VolunteerForm,
  'feedback-rating': FeedbackBountyForm,
  'partnership-inquiry': PartnershipForm,
  'mining-directory': MiningDirectoryForm,
  'miab-nomination': MiabNominationForm,
  'nps-feedback': NpsForm,
}

const FORM_LABELS: Record<string, string> = {
  'contact-general': 'Contact Form',
  'newsletter-signup': 'Newsletter Signup',
  'savings-challenge': 'Savings Challenge Signup',
  donation: 'Donate Bitcoin',
  'job-submission': 'Submit a Job',
  'map-location': 'Add a Map Location',
  'meetup-submission': 'Submit a Meetup',
  volunteer: 'Volunteer Application',
  'feedback-rating': 'Feedback Bounty Submission',
  'partnership-inquiry': 'Partnership Application',
  'mining-directory': 'Mining Directory Submission',
  'miab-nomination': 'MIAB Nomination',
  'nps-feedback': 'NPS Feedback',
  'idea-submission': 'Idea Submission',
  'project-application': 'Project Application',
  'bootcamp-enrollment': 'Bootcamp Enrollment',
  'event-rsvp': 'Event RSVP',
  'speaker-application': 'Speaker Application',
  'payload-form': 'Custom Form',
}

type Props = {
  formType: string
  heading?: string
  subheading?: string
  backgroundColor?: 'white' | 'cream'
}

export function FormEmbedBlockComponent({ formType, heading, subheading, backgroundColor = 'white' }: Props) {
  const FormComponent = FORM_MAP[formType]
  const fallbackLabel = FORM_LABELS[formType] ?? formType

  return (
    <section className={cn('py-16', backgroundColor === 'cream' ? 'bg-brand-cream' : 'bg-white')}>
      <Container narrow>
        {(heading || subheading) && (
          <SectionHeading
            heading={heading || fallbackLabel}
            subheading={subheading}
            align="center"
            className="mb-10"
          />
        )}

        <div className="rounded-card border border-brand-border-light bg-white shadow-card p-8">
          {FormComponent ? (
            <FormComponent />
          ) : (
            <p className="text-sm text-center text-brand-text-muted font-medium">
              [{fallbackLabel}] — form component not yet implemented.
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
