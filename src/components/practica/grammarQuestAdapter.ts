import type { GQItem, GrammarMistake, GrammarTopic } from '@/data/practica/grammar-types'

export type GrammarQuestLevelMode = 'choice' | 'input' | 'correction' | 'sprint'
export type GrammarQuestItemMode = 'choice' | 'input'

export interface GrammarQuestItem {
  id: string
  mode: GrammarQuestItemMode
  prompt: string
  options?: string[]
  answer: string
  accepted: string[]
  explanation: string
  source: string
  isZeroAnswer?: boolean
}

export interface GrammarQuestLevel {
  id: string
  title: string
  tag: string
  footer: string
  intro: string
  focus: string
  mode: GrammarQuestLevelMode
  durationSeconds?: number
  items: GrammarQuestItem[]
}

export interface GrammarQuestGuide {
  goal: string
  decisionTitle: string
  decisions: string[]
  levelVerbs: string[]
}

export interface GrammarQuest {
  guide: GrammarQuestGuide
  levels: GrammarQuestLevel[]
}

interface TopicQuestMeta {
  goal: string
  decisions: string[]
  levelVerbs: string[]
}

const DEFAULT_META: TopicQuestMeta = {
  goal: 'Pasar de reconocer la forma correcta a producirla sin opciones.',
  decisions: [
    'Identifica la función gramatical antes de elegir la palabra.',
    'Comprueba sujeto, número, tiempo o contexto antes de responder.',
    'Evita traducir literalmente desde el español.',
  ],
  levelVerbs: ['Reconoce', 'Contrasta', 'Conecta', 'Escribe', 'Corrige', 'Automatiza'],
}

const QUEST_META_BY_SLUG: Record<string, TopicQuestMeta> = {
  'articulos-a-an-the': {
    goal: 'Decidir entre a, an, the o ausencia de artículo según sonido, especificidad y uso general.',
    decisions: [
      'a/an depende del sonido inicial, no de la letra escrita.',
      'the marca algo identificable, único o ya mencionado.',
      'Plural general, incontables e idiomas suelen ir sin artículo.',
    ],
    levelVerbs: ['Sonido', 'Especifica', 'Generaliza', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'verbo-to-be': {
    goal: 'Elegir am, is o are y usarlos en afirmaciones, negativas, preguntas y usos no literales.',
    decisions: [
      'I exige am; he, she, it y singulares exigen is.',
      'you, we, they y plurales exigen are.',
      'Edad, clima, hambre y estados usan to be, no traducciones con tener o hacer.',
    ],
    levelVerbs: ['Conjuga', 'Niega', 'Pregunta', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'pronombres-personales': {
    goal: 'Sustituir personas, objetos y situaciones por el pronombre sujeto correcto.',
    decisions: [
      'El sujeto en inglés casi nunca se omite.',
      'it cubre objetos, animales no personalizados, clima y tiempo.',
      'they reemplaza grupos y plurales sin importar el género.',
    ],
    levelVerbs: ['Reconoce', 'Sustituye', 'Contextualiza', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'adjetivos-posesivos': {
    goal: 'Elegir el posesivo según el dueño, no según la cosa poseída.',
    decisions: [
      'his y her dependen de quién posee.',
      'its es posesivo; it\'s significa it is.',
      'our y their evitan repetir grupos completos.',
    ],
    levelVerbs: ['Dueño', 'Objeto', 'Familia', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'demostrativos-this-that': {
    goal: 'Distinguir distancia y número: this, that, these y those.',
    decisions: [
      'this y these señalan cercanía.',
      'that y those señalan distancia.',
      'this/that son singulares; these/those son plurales.',
    ],
    levelVerbs: ['Señala', 'Contrasta', 'Describe', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'plural-sustantivos': {
    goal: 'Formar plurales regulares, ortográficos e irregulares sin transferir reglas del español.',
    decisions: [
      'La mayoría agrega -s, pero -ch, -sh, -x, -s agregan -es.',
      'Consonante + y cambia a -ies.',
      'Algunos plurales son irregulares o incontables.',
    ],
    levelVerbs: ['Forma', 'Distingue', 'Lista', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'there-is-there-are': {
    goal: 'Expresar hay con there is o there are según singular, plural y tipo de oración.',
    decisions: [
      'there is va con singular o incontable.',
      'there are va con plural.',
      'En preguntas y negativas se conserva there, no se traduce como have.',
    ],
    levelVerbs: ['Cuenta', 'Contrasta', 'Describe', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'have-got': {
    goal: 'Usar have got/have para posesión sin mezclar auxiliares ni acciones.',
    decisions: [
      'have got expresa posesión en registro cotidiano británico.',
      'has got aparece con he, she, it y singulares.',
      'No combines do con have got en la misma pregunta.',
    ],
    levelVerbs: ['Posee', 'Conjuga', 'Pregunta', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'present-simple-afirmativo-negativo': {
    goal: 'Construir rutinas y verdades generales con tercera persona y negativos correctos.',
    decisions: [
      'He, she, it agregan -s o -es en afirmativo.',
      'don\'t va con I, you, we, they.',
      'doesn\'t va con he, she, it y devuelve el verbo a forma base.',
    ],
    levelVerbs: ['Rutina', 'Tercera', 'Niega', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'present-simple-preguntas': {
    goal: 'Formar preguntas con do/does, palabra interrogativa y verbo base.',
    decisions: [
      'do va con I, you, we, they.',
      'does va con he, she, it y verbo base.',
      'La pregunta no conserva -s después de does.',
    ],
    levelVerbs: ['Auxiliar', 'Pregunta', 'Entrevista', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'adverbios-de-frecuencia': {
    goal: 'Colocar adverbios de frecuencia en la posición natural de la oración.',
    decisions: [
      'Con verbos normales, el adverbio suele ir antes del verbo.',
      'Con to be, el adverbio suele ir después del verbo.',
      'Expresiones como twice a week suelen ir al final.',
    ],
    levelVerbs: ['Frecuencia', 'Posición', 'Rutina', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'present-continuous': {
    goal: 'Describir acciones en progreso con am/is/are + verbo en -ing.',
    decisions: [
      'Necesitas una forma de to be antes del verbo en -ing.',
      'La ortografía cambia en casos como running o making.',
      'No todos los verbos de estado se usan naturalmente en continuo.',
    ],
    levelVerbs: ['Observa', 'Forma', 'Escena', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'can-cant': {
    goal: 'Usar can y can\'t con verbo base para habilidad, permiso y posibilidad.',
    decisions: [
      'can no cambia por he, she o it.',
      'Después de can va verbo base, sin to.',
      'Las preguntas invierten can y sujeto.',
    ],
    levelVerbs: ['Habilidad', 'Permiso', 'Pregunta', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'preposiciones-de-lugar': {
    goal: 'Elegir la preposición de lugar según posición física y expresión fija.',
    decisions: [
      'in marca interior o espacio cerrado.',
      'on marca superficie o contacto.',
      'next to, in front of y behind funcionan como bloques completos.',
    ],
    levelVerbs: ['Ubica', 'Contrasta', 'Describe', 'Escribe', 'Corrige', 'Automatiza'],
  },
  'preposiciones-de-tiempo': {
    goal: 'Elegir at, on o in según hora, día, fecha, mes, estación o momento del día.',
    decisions: [
      'at se usa con horas y momentos puntuales.',
      'on se usa con días y fechas concretas.',
      'in se usa con meses, años, estaciones y periodos amplios.',
    ],
    levelVerbs: ['Calendario', 'Contrasta', 'Agenda', 'Escribe', 'Corrige', 'Automatiza'],
  },
}

const LEVEL_TEMPLATES = [
  {
    title: 'Reconocimiento guiado',
    tag: 'Opción múltiple',
    footer: 'Base',
    intro: 'Primero aseguras la forma correcta sin cargar demasiada memoria.',
    mode: 'choice' as const,
  },
  {
    title: 'Contraste mínimo',
    tag: 'Opción múltiple',
    footer: 'Distractores',
    intro: 'Ahora decides entre opciones cercanas y errores típicos.',
    mode: 'choice' as const,
  },
  {
    title: 'Contexto mezclado',
    tag: 'Opción múltiple',
    footer: 'Aplicación',
    intro: 'El tema aparece en frases más variadas para obligarte a leer el contexto.',
    mode: 'choice' as const,
  },
  {
    title: 'Texto sin red',
    tag: 'Escritura corta',
    footer: 'Sin opciones',
    intro: 'Ya no eliges: escribes la forma que completa la frase.',
    mode: 'input' as const,
  },
  {
    title: 'Corrección inteligente',
    tag: 'Producción',
    footer: 'Errores reales',
    intro: 'Corriges errores frecuentes de hispanohablantes y produces la frase limpia.',
    mode: 'correction' as const,
  },
  {
    title: 'Sprint final',
    tag: 'Racha',
    footer: '75 segundos',
    intro: 'Respuestas rápidas para automatizar la decisión gramatical.',
    mode: 'sprint' as const,
  },
]

function chunk<T>(items: T[], sizes: number[]): T[][] {
  const result: T[][] = []
  let cursor = 0
  for (const size of sizes) {
    result.push(items.slice(cursor, cursor + size))
    cursor += size
  }
  return result
}

function isZeroAnswer(answer: string) {
  return /nada|sin artículo|sin articulo|—|zero|no article/i.test(answer.trim())
}

function zeroAcceptedAnswers() {
  return ['', 'nada', 'sin articulo', 'sin artículo', '-', '—', 'zero', 'no article', '(nada)']
}

function acceptedFor(answer: string) {
  const accepted = [answer]
  if (isZeroAnswer(answer)) accepted.push(...zeroAcceptedAnswers())
  return Array.from(new Set(accepted))
}

function answerForQuestion(q: GQItem) {
  return q.opts[q.a] ?? ''
}

function toChoiceItem(q: GQItem, id: string, source: string): GrammarQuestItem {
  const answer = answerForQuestion(q)
  return {
    id,
    mode: 'choice',
    prompt: q.s,
    options: q.opts,
    answer,
    accepted: acceptedFor(answer),
    explanation: q.fb,
    source,
    isZeroAnswer: isZeroAnswer(answer),
  }
}

function toInputItem(q: GQItem, id: string, source: string): GrammarQuestItem {
  const answer = answerForQuestion(q)
  return {
    id,
    mode: 'input',
    prompt: q.s.includes('___') ? q.s : `Escribe la opción correcta: ${q.s}`,
    answer,
    accepted: acceptedFor(answer),
    explanation: q.fb,
    source,
    isZeroAnswer: isZeroAnswer(answer),
  }
}

function toCorrectionItem(m: GrammarMistake, id: string): GrammarQuestItem {
  return {
    id,
    mode: 'input',
    prompt: `Corrige esta frase: ${m.wrong}`,
    answer: m.right,
    accepted: [m.right],
    explanation: m.note,
    source: 'Error frecuente',
  }
}

function buildSprintItems(topic: GrammarTopic): GrammarQuestItem[] {
  const blankItems = topic.questions
    .filter((q) => q.s.includes('___'))
    .map((q, i) => toInputItem(q, `sprint-q-${i}`, 'Sprint'))
    .filter((item) => item.answer.length <= 24 || item.isZeroAnswer)

  const correctionItems = topic.commonMistakes
    .slice(0, 4)
    .map((m, i) => toCorrectionItem(m, `sprint-m-${i}`))
    .filter((item) => item.answer.length <= 36)

  return [...blankItems, ...correctionItems].slice(0, 12)
}

export function buildGrammarQuest(topic: GrammarTopic): GrammarQuest {
  const meta = QUEST_META_BY_SLUG[topic.slug] ?? DEFAULT_META
  const [first, second, third] = chunk(topic.questions, [4, 4, 4])
  const inputSeed = [
    ...topic.questions.slice(12),
    ...topic.questions.filter((q) => q.s.includes('___')).slice(0, 6),
  ].slice(0, 6)
  const correctionSeed = topic.commonMistakes.slice(0, 6)
  const sprintSeed = buildSprintItems(topic)

  const levelItems = [
    first.map((q, i) => toChoiceItem(q, `l1-${i}`, 'Reconocimiento')),
    second.map((q, i) => toChoiceItem(q, `l2-${i}`, 'Contraste')),
    third.map((q, i) => toChoiceItem(q, `l3-${i}`, 'Contexto')),
    inputSeed.map((q, i) => toInputItem(q, `l4-${i}`, 'Escritura')),
    correctionSeed.map((m, i) => toCorrectionItem(m, `l5-${i}`)),
    sprintSeed.map((item, i) => ({ ...item, id: `l6-${i}`, source: 'Sprint' })),
  ]

  const fallbackItems = topic.questions.slice(0, 4).map((q, i) => toChoiceItem(q, `fallback-${i}`, 'Repaso'))

  const levels = LEVEL_TEMPLATES.map((template, index): GrammarQuestLevel => {
    const items = levelItems[index].length > 0 ? levelItems[index] : fallbackItems
    return {
      id: `${topic.slug}-level-${index + 1}`,
      title: template.title,
      tag: template.tag,
      footer: template.footer,
      intro: template.intro,
      focus: meta.levelVerbs[index] ?? DEFAULT_META.levelVerbs[index],
      mode: template.mode,
      durationSeconds: template.mode === 'sprint' ? 75 : undefined,
      items,
    }
  })

  return {
    guide: {
      goal: meta.goal,
      decisionTitle: `Cómo pensar ${topic.shortTitle.toLowerCase()}`,
      decisions: meta.decisions,
      levelVerbs: meta.levelVerbs,
    },
    levels,
  }
}

export function displayQuestAnswer(answer: string) {
  return isZeroAnswer(answer) ? 'sin artículo' : answer
}
