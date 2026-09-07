export type SentenceProduction = {
  tokens: string[]
  answers: string[]
  verb?: string
}

export function normalizeSentenceAnswer(value: string, locale: string) {
  return value
    .normalize('NFKC')
    .replace(/[’‘]/g, "'")
    .trim()
    .toLocaleLowerCase(locale)
    .replace(/\s+/g, ' ')
    .replace(/^[“”„«»"]+\s*/u, '')
    .replace(/\s*[.!?…]+[“”„«»"]*$/u, '')
}

function stableHash(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function tokenizeSentence(sentence: string) {
  if (/\s/u.test(sentence)) return sentence.trim().split(/\s+/u)
  return [...new Intl.Segmenter('ja', { granularity: 'word' }).segment(sentence)]
    .map(({ segment }) => segment.trim())
    .filter(Boolean)
}

export function createSentenceProduction(
  sentences: string | readonly string[],
  verb?: string,
  verbForms: readonly string[] = [],
): SentenceProduction {
  const candidates = typeof sentences === 'string' ? [sentences] : sentences
  const findMatch = (candidate: string) => verbForms
    .map((form) => ({ form, start: candidate.toLocaleLowerCase().indexOf(form.toLocaleLowerCase()) }))
    .find(({ start }) => start >= 0)
  const preferred = verbForms.length ? candidates.find((candidate) => findMatch(candidate)) : undefined
  const sentence = preferred ?? candidates.reduce((longest, candidate) => (
    tokenizeSentence(candidate).length > tokenizeSentence(longest).length ? candidate : longest
  ))
  const match = findMatch(sentence)
  const before = match ? sentence.slice(0, match.start) : ''
  const after = match ? sentence.slice(match.start + match.form.length) : ''
  const sentenceWithLemma = match && verb
    ? /\s/u.test(sentence)
      ? `${before} ${verb} ${after}`.replace(/\s+/gu, ' ').trim()
      : `${before}${verb}${after}`
    : sentence
  const acceptedAnswers = match
    ? [...new Set([sentence, ...verbForms.map((form) => `${before}${form}${after}`)])]
    : [sentence]
  const sourceTokens = tokenizeSentence(sentenceWithLemma)
  let tokens = sourceTokens
    .map((token, index) => ({ token, order: stableHash(`${sentence}:${index}:${token}`) }))
    .sort((left, right) => left.order - right.order)
    .map(({ token }) => token)
  if (tokens.length > 1 && tokens.every((token, index) => token === sourceTokens[index])) {
    tokens = [...tokens.slice(1), tokens[0]]
  }
  return {
    tokens,
    answers: acceptedAnswers,
    verb: match ? verb : undefined,
  }
}
