export type AdvancedTopicStatus = 'available' | 'planned'

export interface AdvancedTopic {
  slug: string
  category: 'Sesgos' | 'Vida social' | 'Carácter'
  title: string
  titleEn: string
  premise: string
  level: 'B2–C1'
  minutes: number
  status: AdvancedTopicStatus
  caution?: string
}

export interface AdvancedVocabularyItem {
  term: string
  partOfSpeech: string
  meaning: string
  example: string
}

export interface AdvancedQuestion {
  id: string
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export interface AdvancedReadingSection {
  heading: string
  paragraphs: string[]
}

export const ADVANCED_TOPICS: AdvancedTopic[] = [
  {
    slug: 'efecto-encuadre',
    category: 'Sesgos',
    title: 'El efecto de encuadre',
    titleEn: 'The framing effect',
    premise: 'Cómo una descripción puede mover una decisión aunque los hechos no cambien.',
    level: 'B2–C1',
    minutes: 32,
    status: 'available',
  },
  {
    slug: 'dunning-kruger-sin-la-curva',
    category: 'Sesgos',
    title: 'Dunning–Kruger, sin la curva viral',
    titleEn: 'Calibration and competence',
    premise: 'Metacognición, sobreconfianza y por qué la evidencia es más matizada que el meme.',
    level: 'B2–C1',
    minutes: 35,
    status: 'planned',
    caution: 'Incluirá replicaciones y objeciones estadísticas, no solo el estudio de 1999.',
  },
  {
    slug: 'hipergamia-dato-o-relato',
    category: 'Vida social',
    title: 'Hipergamia: ¿dato, patrón o relato?',
    titleEn: 'Hypergamy: data, pattern or story?',
    premise: 'Cómo separar definiciones, tendencias demográficas y generalizaciones sobre pareja y estatus.',
    level: 'B2–C1',
    minutes: 38,
    status: 'planned',
    caution: 'Se estudiará como una hipótesis discutida, con límites y contraargumentos.',
  },
  {
    slug: 'firmeza-fuerza-generosidad',
    category: 'Carácter',
    title: 'Firmeza, fuerza y generosidad',
    titleEn: 'Firmness, strength and generosity',
    premise: 'Una propuesta ética para sostener límites sin perder capacidad ni humanidad.',
    level: 'B2–C1',
    minutes: 34,
    status: 'planned',
    caution: 'Se presentará como marco para debatir y aplicar, no como ley psicológica.',
  },
  {
    slug: 'sesgo-confirmacion',
    category: 'Sesgos',
    title: 'El sesgo de confirmación',
    titleEn: 'Confirmation bias',
    premise: 'Buscar, interpretar y recordar información sin convertir una intuición en una sentencia.',
    level: 'B2–C1',
    minutes: 31,
    status: 'planned',
  },
  {
    slug: 'pensamiento-suma-cero',
    category: 'Vida social',
    title: 'Cuando todo parece suma cero',
    titleEn: 'When everything looks zero-sum',
    premise: 'Qué cambia cuando entendemos una relación como reparto fijo, cooperación o creación de valor.',
    level: 'B2–C1',
    minutes: 33,
    status: 'planned',
  },
]

export const ADVANCED_CYCLE = [
  { id: 'orientar', label: 'Orientar', detail: 'Activa una intuición antes de explicar.' },
  { id: 'escuchar', label: 'Escuchar', detail: 'Comprende la idea sin depender del texto.' },
  { id: 'leer', label: 'Leer', detail: 'Añade evidencia, matices y contraargumentos.' },
  { id: 'afilar', label: 'Vocabulario', detail: 'Convierte conceptos en lenguaje preciso.' },
  { id: 'practicar', label: 'Practicar', detail: 'Distingue, aplica y justifica.' },
  { id: 'producir', label: 'Producir', detail: 'Formula una postura propia y vuelve al inicio.' },
] as const

export const FRAMING_LESSON = {
  slug: 'efecto-encuadre',
  title: 'The framing effect',
  subtitle: 'Los mismos hechos. Una decisión distinta.',
  objective:
    'Al terminar podrás reconocer un encuadre, comprobar si dos afirmaciones son equivalentes y reformular un mensaje sin borrar información relevante.',
  level: 'B2–C1',
  minutes: 32,
  opening: {
    prompt: 'A treatment is being evaluated. Which sentence makes you feel more willing to choose it?',
    options: [
      'Ninety out of every 100 patients are alive five years later.',
      'Ten out of every 100 patients are not alive five years later.',
    ],
    reveal:
      'The two statements report the same outcome. If one felt safer, the facts stayed still while the reference point moved.',
  },
  listening: {
    title: 'A number never arrives alone',
    script:
      'Imagine that a doctor is discussing a treatment with two patients. She tells the first patient that ninety out of every one hundred people are alive five years after treatment. She tells the second that ten out of every one hundred are not. The arithmetic is identical, yet the first description may sound reassuring while the second sounds alarming. This is framing: a choice can be influenced by the way equivalent information is presented. A frame does not have to contain a lie. It can work through emphasis, reference points, verbs, or the decision to describe gains instead of losses. That does not mean every frame is manipulation. Communication always selects some details and leaves others in the background. The practical question is whether a frame helps people understand a decision or quietly prevents them from seeing an important alternative. One useful defense is to translate percentages into absolute numbers and then state both sides. Ninety survive; ten do not. When both descriptions are visible, the emotional difference becomes easier to examine rather than simply obey.',
    questions: [
      {
        id: 'listen-1',
        prompt: 'Why can the two descriptions produce different reactions?',
        options: [
          'They report different probabilities.',
          'They place attention on different reference points.',
          'Only one uses medical evidence.',
        ],
        answer: 1,
        explanation: 'Both report the same probability; one foregrounds survival and the other foregrounds death.',
      },
      {
        id: 'listen-2',
        prompt: 'What does the speaker recommend as a first defense?',
        options: [
          'Ignore all emotional language.',
          'Trust the more positive statement.',
          'Use absolute numbers and state both sides.',
        ],
        answer: 2,
        explanation: 'Showing both complementary outcomes makes the equivalence and the emotional contrast visible.',
      },
    ] satisfies AdvancedQuestion[],
  },
  reading: {
    title: 'When the facts stay still but the choice moves',
    dek: 'Framing is not merely a trick used by advertisers. It is a property of communication—and therefore a responsibility.',
    sections: [
      {
        heading: 'A choice has a point of view',
        paragraphs: [
          'We often imagine that information reaches us as a neutral package: facts go in, preferences come out. Real language is less mechanical. A speaker must choose a subject, a verb, a comparison, a time horizon and a denominator. Each choice directs attention. “Employment reached 94%” and “unemployment remained at 6%” may describe the same labour market, but they invite different emotional readings. The frame is the structure that makes one part of the situation more prominent than another.',
          'This does not prove that people are irrational whenever wording matters. Words can reveal consequences that a bare number conceals. Calling a budget reduction “savings” highlights efficiency; calling it a “cut” highlights what may disappear. Both perspectives can carry relevant information. The problem begins when a single frame presents its emphasis as if it were the whole reality.',
        ],
      },
      {
        heading: 'The classic reversal',
        paragraphs: [
          'In a landmark 1981 study, Amos Tversky and Daniel Kahneman asked participants to imagine an outbreak expected to affect 600 people. In one version, the options were described through lives saved. A certain option saved 200 people, while a risky option offered a one-third chance that everyone would be saved. Most participants preferred certainty. In another version, the outcomes were described through deaths. A certain option meant 400 people would die, while a risky option offered a one-third chance that nobody would die. The numerical outcomes were equivalent, but preferences shifted toward the gamble.',
          'The finding mattered because the frame did more than change tone: it changed risk preference. Gains made certainty attractive; losses made a gamble feel more tolerable. This pattern became part of prospect theory, which examines decisions relative to reference points rather than treating every final outcome as psychologically identical.',
        ],
      },
      {
        heading: 'The grammar of emphasis',
        paragraphs: [
          'Advanced language learners can detect framing at sentence level. Active voice can make an agent visible: “The company removed 120 positions.” Passive voice can move that agent into the background: “One hundred and twenty positions were eliminated.” Nominalisation can make a contested action sound like a neutral object: “the restructuring.” None of these forms is automatically dishonest. Their effect depends on what information the context requires and what the speaker allows the audience to inspect.',
          'Denominators matter too. A treatment that doubles a risk sounds dramatic, but a change from one case in 10,000 to two cases in 10,000 is also an increase of one case per 10,000. Relative and absolute risk answer different questions. A careful reader asks for both before deciding how large the change is.',
        ],
      },
      {
        heading: 'Not every frame is a trap',
        paragraphs: [
          'There is no view from nowhere. A teacher frames a historical event by choosing where the explanation begins. A friend frames a conflict by naming one moment as the cause. Even the command “be objective” frames emotion as possible interference. The goal, therefore, cannot be to eliminate every frame. It is to make consequential frames available for comparison.',
          'A positive frame may help someone act when fear has paralysed them. A loss frame may make a neglected danger vivid. Ethical communication depends less on banning emotion than on preserving agency: can the listener recover the underlying quantities, see meaningful alternatives and understand who benefits from the chosen description?',
        ],
      },
      {
        heading: 'A practical reframing protocol',
        paragraphs: [
          'When a claim pushes you toward a quick reaction, pause and perform three translations. First, state the complement: if 70% succeeded, 30% did not. Second, keep the denominator stable: compare 7 out of 10 with 3 out of 10, not with an unrelated percentage. Third, name the missing agent and time horizon: who changed what, and over which period? These moves do not tell you which decision is correct. They make the decision more inspectable.',
          'The strongest response to framing is not cynicism. “Everything is manipulation” is itself a frame that erases differences between careful explanation and deception. Better judgment comes from bilingual thinking in the broadest sense: being able to restate one reality in more than one legitimate form, then notice what each version illuminates and what it hides.',
        ],
      },
    ] satisfies AdvancedReadingSection[],
    source: {
      label: 'Tversky & Kahneman (1981), Science',
      href: 'https://doi.org/10.1126/science.7455683',
    },
  },
  vocabulary: [
    {
      term: 'to foreground',
      partOfSpeech: 'verb',
      meaning: 'Poner algo en primer plano o darle prominencia.',
      example: 'The headline foregrounds the cost while pushing the benefit into the background.',
    },
    {
      term: 'reference point',
      partOfSpeech: 'noun phrase',
      meaning: 'Punto de comparación desde el cual se percibe una ganancia o pérdida.',
      example: 'A salary can feel generous or disappointing depending on the reference point.',
    },
    {
      term: 'equivalent',
      partOfSpeech: 'adjective',
      meaning: 'Igual en valor, función o significado relevante.',
      example: 'The percentages are mathematically equivalent but emotionally different.',
    },
    {
      term: 'denominator',
      partOfSpeech: 'noun',
      meaning: 'Cantidad total respecto de la cual se expresa una proporción.',
      example: 'Without a stable denominator, the comparison can mislead.',
    },
    {
      term: 'to elicit',
      partOfSpeech: 'verb',
      meaning: 'Provocar u obtener una respuesta o reacción.',
      example: 'Loss-framed language may elicit a stronger emotional response.',
    },
    {
      term: 'consequential',
      partOfSpeech: 'adjective',
      meaning: 'Que tiene efectos importantes o relevantes.',
      example: 'Small wording choices become consequential in medical consent.',
    },
    {
      term: 'to obscure',
      partOfSpeech: 'verb',
      meaning: 'Ocultar, volver menos visible o más difícil de entender.',
      example: 'A relative increase can obscure how small the absolute risk remains.',
    },
    {
      term: 'inspectable',
      partOfSpeech: 'adjective',
      meaning: 'Que puede examinarse con claridad y someterse a comprobación.',
      example: 'Good communication makes its assumptions inspectable.',
    },
  ] satisfies AdvancedVocabularyItem[],
  practice: [
    {
      id: 'practice-1',
      prompt: 'Which pair is numerically equivalent?',
      options: [
        'A 20% success rate / an 80% failure rate',
        'A 75% success rate / a 25% failure rate',
        'A risk of 1 in 20 / a safety rate of 20 in 20',
      ],
      answer: 1,
      explanation: 'Success and failure are complements: 75% + 25% = 100%.',
    },
    {
      id: 'practice-2',
      prompt: '“Mistakes were made during the launch.” What does the passive frame most clearly obscure?',
      options: ['The time horizon', 'The agent responsible', 'The numerical denominator'],
      answer: 1,
      explanation: 'The passive construction omits who made the mistakes.',
    },
    {
      id: 'practice-3',
      prompt: 'A risk rises from 1 in 10,000 to 2 in 10,000. Which report is most transparent?',
      options: [
        'The risk doubled.',
        'The risk increased by only 1%.',
        'The risk doubled, rising by one additional case per 10,000.',
      ],
      answer: 2,
      explanation: 'It provides both the relative change and the absolute quantities.',
    },
    {
      id: 'practice-4',
      prompt: 'Which conclusion best matches the reading?',
      options: [
        'Any emotional wording is manipulative.',
        'All frames should be eliminated from responsible communication.',
        'Important frames should be compared so the underlying decision remains inspectable.',
      ],
      answer: 2,
      explanation: 'Communication always selects; responsibility comes from making consequential alternatives visible.',
    },
  ] satisfies AdvancedQuestion[],
  production: {
    prompt:
      'Rewrite this claim in a balanced way: “Our new policy keeps 96% of users completely safe.” Preserve the useful number, add its complement and identify one fact you would still need before deciding.',
    checklist: [
      'I kept the denominator stable.',
      'I stated both the positive and negative outcome.',
      'I named one missing piece of context.',
      'I used at least two terms from the vocabulary bank.',
    ],
    model:
      'The company reports that 96 out of every 100 users remain safe under the new policy, while 4 out of 100 do not. Before judging the policy, we would need to know how “safe” is defined and how the result compares with the previous policy.',
  },
} as const

export function getAdvancedTopic(slug: string) {
  return ADVANCED_TOPICS.find((topic) => topic.slug === slug)
}
