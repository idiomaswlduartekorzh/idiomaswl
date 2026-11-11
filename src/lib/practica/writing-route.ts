const WRITING_LOCALES = {
  ingles: 'en', frances: 'fr', aleman: 'de', italiano: 'it', portugues: 'pt',
  ruso: 'ru', japones: 'ja', coreano: 'ko',
} as const

export function getAdvancedWritingLocale(pathname: string) {
  const match = pathname.match(/^\/practica\/(ingles|frances|aleman|italiano|portugues|ruso|japones|coreano)\/(?:b2|c1|c2)\/escritura(?:\/|$)/u)
  return match ? WRITING_LOCALES[match[1] as keyof typeof WRITING_LOCALES] : null
}

export function isAdvancedEnglishWritingPath(pathname: string) {
  return getAdvancedWritingLocale(pathname) === 'en'
}
