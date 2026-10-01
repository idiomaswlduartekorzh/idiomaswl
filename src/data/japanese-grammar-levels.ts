import type { GrammarTopic } from '@/data/grammar/types'

export type JapaneseGrammarLevel = 'a1' | 'a2' | 'b1'

type GrammarResource = {
  image: string
  imageAlt: string
  audio: string
  audioText: string
  glyph: string
  studyMinutes: number
}

const FAMILY_ALT: Record<string, string> = {
  'action-sequence': 'Escena cotidiana japonesa para practicar secuencias, preparación y acciones simultáneas',
  'time-experience': 'Viajeros en una estación japonesa organizando experiencias y planes',
  'ability-obligation': 'Situación comunitaria japonesa para practicar capacidad, permiso y obligación',
  perspective: 'Estudiantes intercambiando ayuda y objetos para comprender el punto de vista japonés',
  'reasons-conditions': 'Conversación considerada en un restaurante japonés para practicar razones y condiciones',
  'comparison-focus': 'Personas comparando opciones en un mercado japonés',
  'change-decisions': 'Profesional organizando cambios, decisiones y consecuencias',
  'voice-agency': 'Equipo japonés distribuyendo responsabilidades y puntos de vista',
  'evidence-inference': 'Estudiante observando indicios para formular una inferencia',
  'logic-nuance': 'Conversación reflexiva para construir opiniones matizadas',
  'time-process': 'Acción interrumpida en una estación para narrar procesos e intentos',
  'degree-obligation': 'Plan de estudio visual para expresar grado, consejo y obligación',
}

function familyFor(level: 'a2' | 'b1', topic: GrammarTopic): string {
  const slug = topic.slug
  if (level === 'a2') {
    if (/dake|shika|bakari|hikaku/u.test(slug)) return 'comparison-focus'
    if (/ukemi|ageru|morau|kureru|noun/u.test(slug)) return 'perspective'
    if (/kanou|nakereba|te-mo-ii/u.test(slug)) return 'ability-obligation'
    if (/to-omou|kamo|deshou|n-desu|tara|to-condicional|node/u.test(slug)) return 'reasons-conditions'
    if (/ta-koto|tari|tsumori|volitiva/u.test(slug)) return 'time-experience'
    return 'action-sequence'
  }
  if (/shieki|ukemi/u.test(slug)) return 'voice-agency'
  if (/sou|hazu|ni-chigainai|kamo/u.test(slug)) return 'evidence-inference'
  if (/toutsutsu|tokoro|tabi|you-to-suru/u.test(slug)) return 'time-process'
  if (/bakari|hodo|nakereba|beki|yooni/u.test(slug)) return 'degree-obligation'
  if (/wake|mono|tameni|noni|ippou/u.test(slug)) return 'logic-nuance'
  return 'change-decisions'
}

function japaneseModel(model: string): string {
  const withoutReading = model.replace(/\([^)]*[A-Za-zÁ-ÿ][^)]*\)/gu, '').replace(/\s*=.*$/u, '')
  const first = withoutReading.split(/\s+\/\s+|\s+—\s+/u)[0].trim()
  return first || model
}

function glyphFrom(topic: GrammarTopic): string {
  const match = topic.shortTitle.match(/[ぁ-んァ-ヶ一-龯々〜～]+/u)
  return match?.[0]?.slice(0, 5) || topic.shortTitle.slice(0, 5)
}

export function getJapaneseGrammarLevelResource(topic: GrammarTopic, level: 'a2' | 'b1'): GrammarResource {
  const family = familyFor(level, topic)
  const usesSystemVoice = level === 'b1' || topic.slug === 'volitiva-you-to-omou-a2'
  return {
    image: `/images/japanese-grammar/${level}/${family}.png`,
    imageAlt: FAMILY_ALT[family],
    audio: `/audio/japones/${level}/grammar/${topic.slug}.${usesSystemVoice ? 'm4a' : 'mp3'}`,
    audioText: japaneseModel(topic.guide.model),
    glyph: glyphFrom(topic),
    studyMinutes: level === 'b1' ? 50 : 40,
  }
}
