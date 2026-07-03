export function buildCourseErrorUrl(reason: string, message?: string): string {
  const params = new URLSearchParams({ reason })
  if (message) params.set('message', message)
  return `/course-error?${params.toString()}`
}
