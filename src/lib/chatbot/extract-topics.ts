const STOP_WORDS = new Set([
  'the',
  'is',
  'how',
  'what',
  'can',
  'do',
  'i',
  'a',
  'an',
  'to',
  'for',
  'of',
  'in',
  'on',
  'it',
  'and',
  'or',
  'but',
  'my',
  'me',
  'you',
  'your',
  'we',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'will',
  'would',
  'could',
  'should',
  'may',
  'might',
  'must',
  'this',
  'that',
  'these',
  'those',
  'with',
  'from',
  'at',
  'by',
  'about',
  'into',
  'through',
  'during',
  'before',
  'after',
  'where',
  'why',
  'all',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'not',
  'only',
  'same',
  'so',
  'than',
  'too',
  'very',
  'just',
  'tell',
  'please',
  'help',
  'want',
  'know',
  'get',
  'am',
  'if',
  'as',
])

export function extractTopicsFromText(text: string, max = 3): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))

  const freq = new Map<string, number>()

  for (const w of words) {
    freq.set(w, (freq.get(w) ?? 0) + 1)
  }

  for (let i = 0; i < words.length - 1; i++) {
    const phrase = `${words[i]} ${words[i + 1]}`
    if (phrase.split(' ').every((p) => !STOP_WORDS.has(p))) {
      freq.set(phrase, (freq.get(phrase) ?? 0) + 2)
    }
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([word]) => word)
}

type ConversationForTopics = {
  topicTags?: { tag?: string | null }[] | null
  messages?: { role: string; content: string }[] | null
}

export function aggregateTopics(
  conversations: ConversationForTopics[],
  limit = 20,
): { topic: string; count: number }[] {
  const counts = new Map<string, number>()

  for (const conv of conversations) {
    const tagsAdded = new Set<string>()

    for (const t of conv.topicTags ?? []) {
      const tag = t.tag?.trim().toLowerCase()
      if (tag && !tagsAdded.has(tag)) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
        tagsAdded.add(tag)
      }
    }

    if (tagsAdded.size === 0) {
      const userText = (conv.messages ?? [])
        .filter((m) => m.role === 'user')
        .map((m) => m.content)
        .join(' ')

      for (const topic of extractTopicsFromText(userText, 3)) {
        counts.set(topic, (counts.get(topic) ?? 0) + 1)
      }
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([topic, count]) => ({ topic, count }))
}
