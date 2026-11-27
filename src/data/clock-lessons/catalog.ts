export const clockLanguages = {
  ingles: { name: 'Inglés', lang: 'en', native: 'English', title: 'Telling the time', example: 'It’s half past three.', related: 'telling-time' },
  frances: { name: 'Francés', lang: 'fr', native: 'Français', title: 'Dire l’heure', example: 'Il est trois heures et demie.', related: 'prepositions-temps' },
  aleman: { name: 'Alemán', lang: 'de', native: 'Deutsch', title: 'Die Uhrzeit', example: 'Es ist halb vier.', related: 'uhrzeit' },
  italiano: { name: 'Italiano', lang: 'it', native: 'Italiano', title: 'Che ore sono?', example: 'Sono le tre e mezza.', related: '' },
  portugues: { name: 'Portugués', lang: 'pt-BR', native: 'Português do Brasil', title: 'Que horas são?', example: 'São três e meia.', related: '' },
  coreano: { name: 'Coreano', lang: 'ko', native: '한국어', title: '몇 시예요?', example: '세 시 반이에요.', related: 'tiempo-horas' },
  japones: { name: 'Japonés', lang: 'ja', native: '日本語', title: '今、何時ですか。', example: '三時半です。', related: 'jikan-tiempo' },
  ruso: { name: 'Ruso', lang: 'ru', native: 'Русский', title: 'Который час?', example: 'Сейчас половина четвёртого.', related: 'tiempo-expresiones' },
} as const

export type ClockLanguage = keyof typeof clockLanguages
export type AdditionalClockLanguage = Exclude<ClockLanguage, 'aleman'>
export const clockLanguageKeys = Object.keys(clockLanguages) as ClockLanguage[]
export const clockHub = '/practica/la-hora'
export const clockLessonUrl = (language: ClockLanguage) => language === 'aleman'
  ? '/practica/aleman/a1/gramatica/uhrzeit'
  : `${clockHub}/${language}`

export function clockMaterials(language: AdditionalClockLanguage) {
  const root = `/api/site-materials/${language}-a1/grammar/relojes`
  return { pdf: `${root}/guia.pdf`, exercisesPdf: `${root}/ejercicios.pdf`, answerKeyPdf: `${root}/soluciones.pdf` }
}
