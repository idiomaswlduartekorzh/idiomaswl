export type QuizLanguageEntry = {
  slug: string
  languageCode: string
  targetName: string
  name: string
  tagline: string
  tenseTitle: string
}

export const QUIZ_LANGUAGES: readonly QuizLanguageEntry[] = [
  { slug: 'ingles', languageCode: 'en', targetName: 'ENGLISH', name: 'Inglés', tagline: 'Contrasta tiempos, aspectos, condicionales y referentes sin depender de traducciones literales.', tenseTitle: 'The aspect control room' },
  { slug: 'italiano', languageCode: 'it', targetName: 'ITALIANO', name: 'Italiano', tagline: 'Trabaja la secuencia del relato y aprende a colocar cada pronombre donde realmente corresponde.', tenseTitle: 'La macchina del tempo' },
  { slug: 'frances', languageCode: 'fr', targetName: 'FRANÇAIS', name: 'Francés', tagline: 'Practica la lógica del relato francés y sus sistemas de pronombres complementos.', tenseTitle: 'Le laboratoire du récit' },
  { slug: 'portugues', languageCode: 'pt-BR', targetName: 'PORTUGUÊS', name: 'Portugués', tagline: 'Entrena portugués brasileño hablado y formal con recorridos cerrados y progresivos.', tenseTitle: 'A central da narrativa' },
  { slug: 'aleman', languageCode: 'de', targetName: 'DEUTSCH', name: 'Alemán', tagline: 'Controla orden verbal, auxiliares, casos y referentes dentro de contextos reales.', tenseTitle: 'Die Zeitwerkstatt' },
  { slug: 'ruso', languageCode: 'ru', targetName: 'РУССКИЙ', name: 'Ruso', tagline: 'Decide tiempo, aspecto, caso y referencia sin forzar categorías de otras lenguas.', tenseTitle: 'Мастерская вида' },
  { slug: 'japones', languageCode: 'ja', targetName: '日本語', name: 'Japonés', tagline: 'Relaciona tiempo, aspecto, registro y referencia con la situación comunicativa.', tenseTitle: '時間と場面の研究室' },
  { slug: 'coreano', languageCode: 'ko', targetName: '한국어', name: 'Coreano', tagline: 'Integra tiempo, aspecto, tratamiento y registro con decisiones contextualizadas.', tenseTitle: '시간과 높임말 실험실' },
]

export const QUIZ_LANGUAGE_BY_SLUG = new Map(QUIZ_LANGUAGES.map((entry) => [entry.slug, entry]))
