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

export interface AdvancedLesson {
  slug: string
  sequence: number
  category: AdvancedTopic['category']
  breadcrumbTitle: string
  title: string
  subtitle: string
  objective: string
  level: AdvancedTopic['level']
  minutes: number
  opening: {
    title: string
    instruction: string
    prompt: string
    options: string[]
    revealTitle: string
    reveal: string
    returnTitle: string
    returnPrompt: string
    returnConclusion: string
  }
  listening: {
    title: string
    instruction: string
    duration: string
    script: string
    questions: AdvancedQuestion[]
  }
  reading: {
    title: string
    dek: string
    sections: AdvancedReadingSection[]
    sources: { label: string; href: string }[]
  }
  vocabularyTitle: string
  vocabulary: AdvancedVocabularyItem[]
  practice: {
    eyebrow: string
    title: string
    instruction: string
    success: string
    questions: AdvancedQuestion[]
  }
  production: {
    title: string
    prompt: string
    draftLabel: string
    placeholder: string
    checklist: string[]
    model: string
  }
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
    status: 'available',
    caution: 'Incluye replicaciones y objeciones estadísticas, no solo el estudio de 1999.',
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
  sequence: 1,
  category: 'Sesgos',
  breadcrumbTitle: 'Efecto de encuadre',
  title: 'The framing effect',
  subtitle: 'Los mismos hechos. Una decisión distinta.',
  objective:
    'Al terminar podrás reconocer un encuadre, comprobar si dos afirmaciones son equivalentes y reformular un mensaje sin borrar información relevante.',
  level: 'B2–C1',
  minutes: 32,
  opening: {
    title: '¿Qué versión te inspira más confianza?',
    instruction: 'No calcules demasiado. Registra tu primera reacción.',
    prompt: 'A treatment is being evaluated. Which sentence makes you feel more willing to choose it?',
    options: [
      'Ninety out of every 100 patients are alive five years later.',
      'Ten out of every 100 patients are not alive five years later.',
    ],
    revealTitle: 'El número no cambió.',
    reveal:
      'The two statements report the same outcome. If one felt safer, the facts stayed still while the reference point moved.',
    returnTitle: '¿Cuál frame elegirías ahora?',
    returnPrompt: 'No buscamos que cambies de opción. Buscamos que puedas explicar por qué ambas son equivalentes y qué información falta.',
    returnConclusion: 'El aprendizaje está en la explicación: 90 de 100 sobreviven y 10 de 100 no.',
  },
  listening: {
    title: 'A number never arrives alone',
    instruction: 'Escucha una vez sin transcripción. En la segunda escucha, toma dos notas: how frames work y one defense.',
    duration: '1:25 aprox.',
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
    sources: [
      {
        label: 'Tversky & Kahneman (1981), Science',
        href: 'https://doi.org/10.1126/science.7455683',
      },
    ],
  },
  vocabularyTitle: 'Ocho palabras para desmontar un encuadre.',
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
  practice: {
    eyebrow: 'Practicar · equivalencia, agencia y matiz',
    title: 'Que no te baste con reconocer la definición.',
    instruction: 'Responde las cuatro. Cada explicación señala qué debes inspeccionar.',
    success: 'Distingues el número, el agente y el matiz.',
    questions: [
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
  },
  production: {
    title: 'Ahora tú controlas el encuadre.',
    prompt:
      'Rewrite this claim in a balanced way: “Our new policy keeps 96% of users completely safe.” Preserve the useful number, add its complement and identify one fact you would still need before deciding.',
    draftLabel: 'Tu reformulación en inglés',
    placeholder: 'The policy keeps 96 out of every 100 users safe...',
    checklist: [
      'I kept the denominator stable.',
      'I stated both the positive and negative outcome.',
      'I named one missing piece of context.',
      'I used at least two terms from the vocabulary bank.',
    ],
    model:
      'The company reports that 96 out of every 100 users remain safe under the new policy, while 4 out of 100 do not. Before judging the policy, we would need to know how “safe” is defined and how the result compares with the previous policy.',
  },
} satisfies AdvancedLesson

export const DUNNING_KRUGER_LESSON = {
  slug: 'dunning-kruger-sin-la-curva',
  sequence: 2,
  category: 'Sesgos',
  breadcrumbTitle: 'Dunning–Kruger',
  title: 'Calibration and competence',
  subtitle: 'No es una montaña. Es un problema de medición.',
  objective:
    'Al terminar podrás distinguir el hallazgo original de su versión viral, explicar dos objeciones estadísticas y formular una conclusión calibrada en inglés.',
  level: 'B2–C1',
  minutes: 35,
  opening: {
    title: '¿Cuál afirmación se acerca más a la evidencia?',
    instruction: 'Elige antes de leer. Volverás a esta decisión con mejores herramientas.',
    prompt: 'Which statement best describes the Dunning–Kruger effect?',
    options: [
      'Beginners are usually more confident than experts.',
      'Some low performers misjudge their relative performance, but the size and causes of the pattern are debated.',
    ],
    revealTitle: 'La curva famosa no es el estudio.',
    reveal:
      'The original studies examined calibration within specific tasks. They did not produce the viral “mountain of confidence,” and later researchers have debated how much of the pattern is metacognitive and how much is statistical.',
    returnTitle: '¿Qué afirmación defenderías ahora?',
    returnPrompt: 'No basta con escoger la opción matizada: debes poder nombrar el hallazgo, una limitación y el tipo de evidencia que cambiaría tu conclusión.',
    returnConclusion: 'Una conclusión calibrada conserva el hallazgo posible sin convertirlo en un diagnóstico universal sobre las personas.',
  },
  listening: {
    title: 'The graph you remember was not in the paper',
    instruction: 'Escucha una vez sin transcripción. Después anota: what was measured, what the meme adds y one statistical objection.',
    duration: '1:45 aprox.',
    script:
      'You may have seen a dramatic curve called the Dunning–Kruger effect. A beginner reaches a peak of confidence, falls into a valley of despair, and then slowly becomes wise. It is memorable, but it is not the graph reported by Justin Kruger and David Dunning in 1999. Their participants completed tasks involving humour, grammar, and logic, then estimated how well they had performed. On average, people in the lowest-performing quartile placed themselves much higher than their measured percentile. The researchers proposed a metacognitive explanation: some of the knowledge needed to perform a task is also needed to recognise a poor performance. That is a hypothesis about calibration inside a domain, not permission to call every confident person incompetent. Later researchers also showed that familiar statistical forces can create part of the pattern. Noisy measurements pull extreme scores toward the average, and many people rate themselves above average. A 2020 analysis argued that the effect might be much smaller than commonly claimed; a later replication found a small but significant effect. The responsible conclusion is neither “the meme is a law” nor “the phenomenon is imaginary.” Ask what skill was measured, how performance and confidence were compared, and how large the effect remained under better tests.',
    questions: [
      {
        id: 'dk-listen-1',
        prompt: 'What did the 1999 studies compare?',
        options: [
          'A universal confidence curve across a person’s entire career.',
          'Task performance and estimates of that performance in particular domains.',
          'Intelligence scores before and after formal education.',
        ],
        answer: 1,
        explanation: 'The studies compared measured task performance with participants’ estimates in humour, grammar and logic tasks.',
      },
      {
        id: 'dk-listen-2',
        prompt: 'Why does the speaker reject both extreme conclusions?',
        options: [
          'Because no later study examined the effect.',
          'Because every measure of confidence is equally accurate.',
          'Because statistical artefacts explain part of the pattern while later work still finds a smaller effect.',
        ],
        answer: 2,
        explanation: 'The size and explanation are disputed; that calls for calibration, not total certainty in either direction.',
      },
    ],
  },
  reading: {
    title: 'From a useful finding to a social insult',
    dek: 'Good psychological vocabulary should improve self-correction. When it becomes a label for other people, it often does the opposite.',
    sections: [
      {
        heading: 'The mountain that research did not draw',
        paragraphs: [
          'Search for the Dunning–Kruger effect and you will probably meet a smooth journey: a novice climbs a “peak of Mount Stupid,” collapses into a “valley of despair,” and eventually reaches a stable plateau of wisdom. The picture tells a satisfying moral story. A little knowledge creates arrogance; real expertise creates humility. Yet that curve was not published in the 1999 paper, and it does not represent the design of its four studies. It is a later illustration that combines several intuitions into one memorable shape.',
          'This distinction matters because a graph silently makes claims. The viral curve suggests that absolute confidence first rises, then crashes, then recovers as skill increases. The original work asked a different question: how accurately do people at different performance levels estimate their own performance? Confidence and calibration are not synonyms. An expert can be highly confident and well calibrated; a novice can be uncertain and still overestimate a very low score.',
        ],
      },
      {
        heading: 'What the original studies actually tested',
        paragraphs: [
          'Kruger and Dunning recruited Cornell University students for tasks involving humour, logical reasoning and English grammar. Participants completed a task and estimated both their raw performance and their position relative to other participants. The best-known result concerns the bottom quartile. Across the studies, these participants estimated their relative standing far above where their test scores placed them. In one summary, an average performance near the 12th percentile was estimated near the 62nd percentile.',
          'The authors proposed a “double burden.” Weak skill could produce errors and also remove some of the knowledge needed to recognise those errors. Grammar offers an intuitive example: if you cannot identify the rule that distinguishes a correct sentence from an incorrect one, you may also lack the rule needed to audit your answer. Training in logical reasoning improved both performance and participants’ ability to recognise their earlier limitations, which supported a metacognitive interpretation.',
          'But the scope must remain visible. The participants were not classified as globally incompetent people. They performed relatively poorly on particular tests in a particular sample. The claim is therefore domain-specific: knowing little about one task may interfere with judging your performance on that task. It does not follow that a person who is mistaken in one domain lacks insight everywhere else.',
        ],
      },
      {
        heading: 'Why the familiar graph can appear',
        paragraphs: [
          'Later critics focused on the method used to display the effect. Researchers often divide people into quartiles using an observed performance score, then compare that score with a self-estimate. Any test contains measurement error. Someone can land in the bottom group partly because their measured score was unusually low that day. A second, imperfect measurement tends to be less extreme. This is regression toward the mean, and it can create the appearance that the lowest group overestimates while the highest group underestimates.',
          'A second ingredient is the better-than-average effect: many people rate themselves somewhat above the midpoint. Combine noisy scores, grouping by an extreme measurement, and self-ratings clustered closer to average, and a Dunning–Kruger-shaped plot can emerge even without a special metacognitive deficit among low performers. This does not prove that metacognition is irrelevant. It shows that the classic quartile graph cannot, by itself, identify the cause of the gap.',
        ],
      },
      {
        heading: 'A dispute about size, not a licence for certainty',
        paragraphs: [
          'In 2020, Gilles Gignac and Marcin Zajenkowski tested self-assessed intelligence with methods designed to reduce those confounds. They found an essentially linear relationship between measured and self-assessed intelligence and no statistically significant pattern showing that lower-ability participants were uniquely less accurate. Their conclusion was cautious: the proposed phenomenon might exist for some skills, but its magnitude could be much smaller than earlier presentations suggested.',
          'A 2023 response used a larger, more representative dataset and similar statistical tests. It reported a small but statistically significant effect. The two papers do not restore the viral mountain. Together they sharpen the live question: under which tasks, samples and measurements does poorer performance predict worse calibration, and by how much? “Small but detectable” is scientifically different from both “universal law” and “nothing at all.”',
        ],
      },
      {
        heading: 'Turn the concept into a mirror',
        paragraphs: [
          'In conversation, Dunning–Kruger is often used as an insult with a laboratory costume. A speaker diagnoses an opponent’s confidence as evidence of incompetence. The move is self-sealing: disagreement becomes proof that the other person lacks the insight to recognise being wrong. This application is almost impossible to falsify and ignores the measurements that gave the concept meaning.',
          'A more disciplined use begins with yourself and a specific domain. Before making a strong claim, state your confidence, identify what competent performance would look like, and choose feedback that can prove you wrong. After receiving the result, compare confidence with accuracy. Repeated comparisons create a calibration record. The lesson is not “doubt everything.” It is “attach confidence to evidence, preserve uncertainty where the measurement is weak, and update when reality answers back.”',
        ],
      },
    ],
    sources: [
      {
        label: 'Kruger & Dunning (1999), JPSP',
        href: 'https://doi.org/10.1037/0022-3514.77.6.1121',
      },
      {
        label: 'Gignac & Zajenkowski (2020), Intelligence',
        href: 'https://doi.org/10.1016/j.intell.2020.101449',
      },
      {
        label: 'Dunkel, Nedelec & van der Linden (2023), Intelligence',
        href: 'https://doi.org/10.1016/j.intell.2022.101717',
      },
    ],
  },
  vocabularyTitle: 'Ocho términos para hablar de competencia sin caricaturas.',
  vocabulary: [
    {
      term: 'calibration',
      partOfSpeech: 'noun',
      meaning: 'Correspondencia entre la confianza expresada y la precisión real.',
      example: 'Good calibration means that 80% confidence is followed by success roughly 80% of the time.',
    },
    {
      term: 'to overestimate',
      partOfSpeech: 'verb',
      meaning: 'Estimar una capacidad, cantidad o resultado por encima de su valor real.',
      example: 'Participants in the lowest quartile tended to overestimate their relative performance.',
    },
    {
      term: 'quartile',
      partOfSpeech: 'noun',
      meaning: 'Cada uno de cuatro grupos iguales en los que se divide una distribución ordenada.',
      example: 'The bottom quartile contained the lowest-scoring quarter of the sample.',
    },
    {
      term: 'metacognition',
      partOfSpeech: 'noun',
      meaning: 'Capacidad de observar, evaluar y regular el propio pensamiento.',
      example: 'Metacognition helps a learner notice why an answer may be wrong.',
    },
    {
      term: 'regression toward the mean',
      partOfSpeech: 'noun phrase',
      meaning: 'Tendencia de una medición extrema a ser seguida por otra menos extrema cuando existe azar o error.',
      example: 'Regression toward the mean can exaggerate gaps between observed scores and later estimates.',
    },
    {
      term: 'measurement error',
      partOfSpeech: 'noun phrase',
      meaning: 'Diferencia introducida por la imperfección de una prueba o medición.',
      example: 'Measurement error makes one test score an imperfect picture of true ability.',
    },
    {
      term: 'domain-specific',
      partOfSpeech: 'adjective',
      meaning: 'Limitado a un campo, tarea o área de conocimiento concreta.',
      example: 'Calibration is domain-specific: a careful driver may be a careless investor.',
    },
    {
      term: 'to update',
      partOfSpeech: 'verb',
      meaning: 'Revisar una creencia a partir de información nueva.',
      example: 'A calibrated thinker is willing to update after receiving diagnostic feedback.',
    },
  ],
  practice: {
    eyebrow: 'Practicar · separar hallazgo, explicación y meme',
    title: 'Una etiqueta conocida no reemplaza el método.',
    instruction: 'Responde las cuatro y usa cada explicación para precisar el alcance de la afirmación.',
    success: 'Distingues confianza, calibración, dominio y tamaño del efecto.',
    questions: [
      {
        id: 'dk-practice-1',
        prompt: 'Which claim is NOT supported by the original 1999 studies?',
        options: [
          'Some bottom-quartile participants overestimated their relative performance.',
          'Training could improve performance and recognition of prior errors.',
          'Every beginner is more confident than every expert.',
        ],
        answer: 2,
        explanation: 'The studies examined average calibration patterns in specific tasks, not a universal ranking of novice and expert confidence.',
      },
      {
        id: 'dk-practice-2',
        prompt: 'Why can grouping participants by an extreme observed score be misleading?',
        options: [
          'Extreme groups always contain the same people.',
          'Measurement error and regression toward the mean can create part of the apparent gap.',
          'Percentiles cannot be used in psychological research.',
        ],
        answer: 1,
        explanation: 'An imperfect extreme score tends to be followed by a less extreme measure even without a special psychological mechanism.',
      },
      {
        id: 'dk-practice-3',
        prompt: 'Which sentence is best calibrated to the later evidence?',
        options: [
          'The Dunning–Kruger effect has been completely disproved.',
          'The Dunning–Kruger effect explains why confident people are incompetent.',
          'A smaller calibration effect may remain in some settings, while its magnitude and explanation are contested.',
        ],
        answer: 2,
        explanation: 'It preserves uncertainty about magnitude, mechanism and generalisability without erasing the possible effect.',
      },
      {
        id: 'dk-practice-4',
        prompt: 'What is the most responsible personal application?',
        options: [
          'Use confidence as proof that another person lacks competence.',
          'Track predictions, seek diagnostic feedback and compare confidence with results.',
          'Avoid confidence whenever you are still learning.',
        ],
        answer: 1,
        explanation: 'Repeated prediction and feedback make calibration testable; labelling other people usually does not.',
      },
    ],
  },
  production: {
    title: 'Replace the meme with a measured claim.',
    prompt:
      'Rewrite this viral claim in 80–120 words: “People who know the least are always the most confident.” State what the original studies found, add one statistical limitation and finish with one practical use of calibration.',
    draftLabel: 'Tu síntesis calibrada en inglés',
    placeholder: 'The original studies did not show that every beginner is more confident than every expert...',
    checklist: [
      'I separated confidence from calibration.',
      'I limited the claim to a task or domain.',
      'I included one statistical limitation.',
      'I used at least two terms from the vocabulary bank.',
    ],
    model:
      'The original studies did not show that every beginner is more confident than every expert. They found that low performers on particular tasks often estimated their relative performance too generously, possibly because skill also supports self-evaluation. However, measurement error and regression toward the mean can reproduce part of this pattern, and later studies disagree about its size. A useful response is to practise calibration: make a prediction, record your confidence, seek diagnostic feedback and update your belief when the result arrives.',
  },
} satisfies AdvancedLesson

export const ADVANCED_LESSONS: AdvancedLesson[] = [FRAMING_LESSON, DUNNING_KRUGER_LESSON]

export function getAdvancedTopic(slug: string) {
  return ADVANCED_TOPICS.find((topic) => topic.slug === slug)
}

export function getAdvancedLesson(slug: string) {
  return ADVANCED_LESSONS.find((lesson) => lesson.slug === slug)
}
