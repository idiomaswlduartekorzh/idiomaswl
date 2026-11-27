/** Keep the full answer significant. Only normalize typography and common spellings for this lesson. */
export function normalizeClockAnswer(input: string, language: string) {
  let text = input.normalize('NFKC').toLowerCase().trim()
    .replace(/[’‘ʼ]/gu, "'").replace(/[‐‑–-]/gu, ' ')
    .replace(/[.,!?¿¡。、「」！？]/gu, '').replace(/\s+/gu, ' ').trim()
  if (language === 'ingles') text = text.replace(/\bit's\b/gu, 'it is')
  if (['coreano', 'japones', 'ruso'].includes(language) && /^[\p{Script=Latin}\p{M}\s']+$/u.test(text)) {
    text = text.normalize('NFD').replace(/\p{M}/gu, '')
  }
  if (language === 'ruso') text = text.replace(/ё/gu, 'е').replace(/\u0301/gu, '')
  if (language === 'japones' || language === 'coreano') text = text.replace(/ /gu, '')
  return text
}

export function matchesClockAnswer(input: string, answer: string, alternatives: string[], language: string) {
  const entered = normalizeClockAnswer(input, language)
  return entered.length > 0 && [answer, ...alternatives].some(value => normalizeClockAnswer(value, language) === entered)
}
