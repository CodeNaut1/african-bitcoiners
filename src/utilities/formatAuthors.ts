// Placeholder — kept for future use when author display is implemented
export const formatAuthors = (authors: { name?: string | null }[]): string => {
  const names = authors.map((a) => a.name).filter(Boolean) as string[]
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}
