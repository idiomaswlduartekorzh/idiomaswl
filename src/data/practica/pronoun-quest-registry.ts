import { ENGLISH_PRONOUN_QUEST } from './english-pronoun-quest.ts'
import { FRENCH_PRONOUN_QUEST } from './french-pronoun-quest.ts'
import { GERMAN_PRONOUN_QUEST } from './german-pronoun-quest.ts'
import { ITALIAN_PRONOUN_QUEST } from './italian-pronoun-quest.ts'
import { JAPANESE_PRONOUN_QUEST } from './japanese-pronoun-quest.ts'
import { KOREAN_PRONOUN_QUEST } from './korean-pronoun-quest.ts'
import { PORTUGUESE_PRONOUN_QUEST } from './portuguese-pronoun-quest.ts'
import type { PronounQuestConfig } from './pronoun-quest-types.ts'
import { RUSSIAN_PRONOUN_QUEST } from './russian-pronoun-quest.ts'

export type PronounQuestEntry = {
  slug: string
  eyebrow: string
  description: string
  keywords: string[]
  config: PronounQuestConfig<string>
}

export const PRONOUN_QUESTS: readonly PronounQuestEntry[] = [
  { slug: 'italiano', eyebrow: 'ITALIANO', description: 'Sujeto, demostrativos, posesivos, objetos directos e indirectos, reflexivos y combinados.', keywords: ['pronombres italiano', 'pronomi diretti', 'pronomi indiretti', 'pronomi combinati'], config: ITALIAN_PRONOUN_QUEST },
  { slug: 'ingles', eyebrow: 'ENGLISH', description: 'Sujeto, objeto, dos sistemas posesivos, demostrativos, reflexivos y relativos.', keywords: ['pronombres inglés', 'subject pronouns', 'object pronouns', 'possessive pronouns'], config: ENGLISH_PRONOUN_QUEST },
  { slug: 'frances', eyebrow: 'FRANÇAIS', description: 'Formas sujeto y tónicas, complementos directos e indirectos, y/en, reflexivos, demostrativos y posesivos.', keywords: ['pronombres francés', 'pronoms compléments', 'pronoms y en', 'pronoms possessifs'], config: FRENCH_PRONOUN_QUEST },
  { slug: 'portugues', eyebrow: 'PORTUGUÊS', description: 'Portugués brasileño: sujeto, formas preposicionales, objetos, reflexivos, demostrativos y posesivos.', keywords: ['pronombres portugués', 'pronomes oblíquos', 'português brasileiro', 'possessivos'], config: PORTUGUESE_PRONOUN_QUEST },
  { slug: 'aleman', eyebrow: 'DEUTSCH', description: 'Casos nominativo, acusativo y dativo, reflexivos, posesivos, demostrativos y relativos.', keywords: ['pronombres alemán', 'Personalpronomen', 'Possessivpronomen', 'Relativpronomen'], config: GERMAN_PRONOUN_QUEST },
  { slug: 'ruso', eyebrow: 'РУССКИЙ', description: 'Casos personales, formas con н-, свой, себя, demostrativos y el relativo который.', keywords: ['pronombres ruso', 'местоимения', 'свой себя', 'который'], config: RUSSIAN_PRONOUN_QUEST },
  { slug: 'japones', eyebrow: '日本語', description: 'Registro personal, tratamiento, referencia por nombre, series こ・そ・あ, posesión con の y 自分.', keywords: ['pronombres japonés', 'こそあ', 'jibun', 'partícula no'], config: JAPANESE_PRONOUN_QUEST },
  { slug: 'coreano', eyebrow: '한국어', description: 'Registro personal, tratamientos, referencia por nombre, series 이・그・저, posesión y 자기.', keywords: ['pronombres coreano', '대명사', '지시 표현', '자기'], config: KOREAN_PRONOUN_QUEST },
]

export const PRONOUN_QUEST_BY_SLUG = new Map(PRONOUN_QUESTS.map((entry) => [entry.slug, entry]))
