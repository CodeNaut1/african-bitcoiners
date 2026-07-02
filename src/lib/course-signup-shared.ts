export type CourseSignupFormSlug =
  | 'course-signup'
  | 'course-signup-english'
  | 'course-signup-french'
  | 'course-signup-telegram-english'
  | 'course-signup-telegram-french'

export function resolveCourseSignupFormSlug(
  deliveryMethod: string,
  courseLang: string,
  formSlug?: string,
): CourseSignupFormSlug {
  if (formSlug?.startsWith('course-signup')) {
    return formSlug as CourseSignupFormSlug
  }

  if (deliveryMethod === 'telegram') {
    return courseLang === 'French' ? 'course-signup-telegram-french' : 'course-signup-telegram-english'
  }

  return courseLang === 'French' ? 'course-signup-french' : 'course-signup-english'
}

export function isTelegramCourseSignupFormSlug(formSlug: string): boolean {
  return formSlug.startsWith('course-signup-telegram')
}
