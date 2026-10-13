import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'oportunidad-gime-b1',
  order: '11',
  color: '#c60c30',
  category: 'Tiempo y oportunidad',
  level: 'B1',
  title: '-(으)ㄴ/는 김에: aprovechar una ocasión en coreano B1',
  shortTitle: '-(으)ㄴ/는 김에 (ya que...)',
  metaTitle: '-(으)ㄴ/는 김에 en Coreano B1 — Aprovechar una Ocasión',
  description:
    '-(으)ㄴ/는 김에 expresa que una acción crea la ocasión para hacer otra relacionada: "ya que salgo, aprovecho y compro leche". La forma -는 김에 presenta una acción en curso o habitual; -(으)ㄴ 김에 parte de una acción ya realizada. El foco no es la simultaneidad, sino la oportunidad que ofrece la primera acción.',
  lead: 'Convierte una acción en oportunidad: "ya que hago A, aprovecho para hacer B".',
  outcomes: [
    'Forma expresiones de aprovechamiento con -(으)ㄴ/는 김에',
    'Expresa acciones adicionales aprovechando una situación',
    'Distingue entre una acción en curso y una ya realizada',
    'Diferencia 김에 de -(으)면서 (simultaneidad)',
  ],

  guide: {
    goal: 'Expresar que aprovechas una situación para hacer algo más.',
    model: '나가는 김에 장도 봐야겠어요. (Ya que salgo, aprovecharé para hacer las compras.)',
    formula: 'V-는 김에 (acción en curso) | V-(으)ㄴ 김에 (acción realizada) | acción adicional',
    decisions: [
      'Usa V-는 김에 cuando la primera acción está en curso o se plantea como ocasión: 나가는 김에.',
      'Usa V-(으)ㄴ 김에 cuando esa acción ya ocurrió: 온 김에, 입은 김에.',
      'La segunda acción suele estar relacionada y añade provecho a la primera ocasión.',
      'Con -(으)면서 describes dos acciones simultáneas; con 김에 destacas la oportunidad.',
      'La partícula 도 aparece con frecuencia para marcar la acción adicional: 우유도 사요.',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['V-는 김에', 'Acción en curso como ocasión', '나가는 김에 우유도 사요'],
      ['V-(으)ㄴ 김에', 'Acción realizada como ocasión', '온 김에 며칠 더 있어요'],
      ['V-(으)면서', 'Dos acciones simultáneas', '걸으면서 음악을 들어요'],
    ],
    mistakes: [
      'No traduzcas siempre 김에 como "mientras": el significado central es "aprovechando la ocasión".',
      'No uses solo -는 con una acción claramente terminada: 온 김에 ✓, 오는 김에 cambia el punto de vista.',
      'No confundas 김에 con -기 때문에: la primera acción crea una oportunidad, no solo una causa.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -는 김에?',
      paragraphs: [
        '-(으)ㄴ/는 김에 indica que una acción sirve de ocasión o punto de partida para otra acción relacionada. En español suele corresponder a "ya que...", "aprovechando que..." o "de paso...".',
        'La segunda acción no es un accidente: el hablante decide añadirla para aprovechar mejor la situación creada por la primera.',
      ],
    },
    {
      heading: '¿En qué contextos se usa -는 김에 en coreano?',
      paragraphs: [
        'Desplazamientos: "출장 가는 김에 친구도 만날 거야" (ya que voy de viaje de trabajo, también veré a un amigo). "서울에 가는 김에 박물관도 가자" (ya que vamos a Seúl, visitemos también el museo).',
        'Tareas relacionadas: "방을 청소하는 김에 창문도 닦았어요" (ya que limpiaba la habitación, aproveché para limpiar también las ventanas).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -는 김에 y -(으)면서?',
      paragraphs: [
        '-(으)면서 expresa simultaneidad: "걸으면서 음악을 들어요" (escucho música mientras camino). 김에 expresa aprovechamiento: "나가는 김에 물도 사 올게요" (ya que salgo, aprovecharé para traer agua).',
        'Diferencia: -으면서 es "hacer X e Y juntos"; -는 김에 es "hacer X, y aprovecho para hacer Y también".',
      ],
    },
    {
      heading: 'Cómo elegir entre -는 김에 y -(으)ㄴ 김에',
      paragraphs: [
        'Usa -는 김에 cuando presentas la primera acción como actual, habitual o próxima dentro del contexto: "가는 김에", "청소하는 김에". Usa -(으)ㄴ 김에 cuando esa acción ya se completó: "온 김에", "입은 김에".',
        'Ejemplos: "여기까지 온 김에 사진도 찍자" (ya que llegamos hasta aquí, tomemos también una foto). "새 옷을 입은 김에 사진을 찍었어요" (ya que me puse ropa nueva, aproveché para tomarme una foto).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-(으)ㄴ/는 김에: una acción crea la oportunidad para otra; -(으)면서 solo marca simultaneidad.',
    graphicPrompt: 'Tabla: -는 김에 (aprovechar) vs -으면서 (hacer juntos). Ejemplos.',
    scene: [
      ['나가는 김에 장을 봐야겠어요.', 'Ya que salgo, debo comprar.'],
      ['서울에 가는 김에 박물관도 가자.', 'Ya que vamos a Seúl, visitemos el museo.'],
      ['방을 청소하는 김에 창문도 닦았어요.', 'Ya que limpiaba el cuarto, limpié también las ventanas.'],
      ['여기까지 온 김에 사진도 찍자.', 'Ya que llegamos hasta aquí, tomemos una foto.'],
      ['새 옷을 입은 김에 사진을 찍었어요.', 'Ya que me puse ropa nueva, aproveché para tomar una foto.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['기회 활용', '효율', '-으면서 대비'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -(으)ㄴ/는 김에',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo presente + -는 김에',
            lines: [['', '나가___ 물도 사오겠어요.']],
            options: ['는 김에', '으면서', '기 때문에', '-고도'],
            answer: '는 김에',
            explain: '나가다 → 나가는 김에 (ya que salgo).',
          },
          {
            scene: '-는 김에 vs -으면서',
            lines: [['', '영화 보___ 팝콘도 먹자. (aprovechamiento)']],
            options: ['-는 김에', '-으면서', '-기 때문에', '-도록'],
            answer: '-는 김에',
            explain: '-는 김에 para aprovechamiento de oportunidad.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Aprovechamiento en contexto',
        tag: 'Oportunidad',
        intro: 'Completa expresiones de aprovechamiento.',
        type: 'guidedText',
        scene: 'Sugerencias para aprovechar situaciones.',
        text: '서울에 가[[0]] 친구도 만날까? 방을 청소하[[1]] 창문도 닦자. 여기까지 오[[2]] 사진도 찍자.',
        blanks: [
          { options: ['는 김에', '으면서'], answer: '는 김에', explain: '-는 김에 con viaje.' },
          { options: ['는 김에', '으면서'], answer: '는 김에', explain: '청소하는 김에: la limpieza crea la ocasión para otra tarea relacionada.' },
          { options: ['ㄴ 김에', '는 김에'], answer: 'ㄴ 김에', explain: '오다 → 온 김에: la llegada ya se completó.' },
        ],
      },
      {
        id: 'level-3',
        title: 'Escritura de aprovechamiento',
        tag: 'Oportunidad',
        intro: 'Escribe sugerencias aprovechando situaciones.',
        type: 'freeText',
        scene: 'Propuestas de aprovechar oportunidades.',
        text: '1. [[0]] (Ya que salimos, compremos leche). 2. [[1]] (Ya que viniste, quédate unos días). 3. [[2]] (Ya que limpio el escritorio, limpiaré también el tuyo).',
        blanks: [
          { answer: '나가는 김에 우유도 사와', accepted: ['는 김에', '사오'], explain: '-는 김에 con compras.' },
          { answer: '온 김에 며칠 더 있다 가', accepted: ['온 김에', '있다 가'], explain: '오다 → 온 김에 porque la llegada ya ocurrió.' },
          { answer: '책상을 닦는 김에 네 책상도 닦아 줄게', accepted: ['닦는 김에', '닦아 줄게'], explain: 'La primera limpieza crea la ocasión para limpiar el otro escritorio.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Análisis: 김에 vs -(으)면서',
        tag: 'Análisis',
        intro: 'Explica la diferencia de implicatura.',
        type: 'write',
        items: [
          {
            scene: 'Aprovechamiento vs simultaneidad',
            prompt: '"나가는 김에 물도 사오겠어요" vs "나가면서 물도 사오겠어요": ¿cuál es la diferencia?',
            answer: '-는 김에 presenta la salida como oportunidad para traer agua. -(으)면서 solo indica que dos acciones ocurren al mismo tiempo, sin destacar que una sea la ocasión de la otra.',
            accepted: ['기회', '효율', '동시'],
            explain: '-는 김에 destaca la oportunidad; -(으)면서, la simultaneidad.',
          },
        ],
      },
      {
        id: 'level-5',
        title: 'Elige el punto de vista temporal',
        tag: 'Contraste',
        intro: 'Decide si la primera acción está en curso o ya se completó.',
        type: 'choice',
        items: [
          {
            scene: 'Ya llegaste hasta este lugar.',
            lines: [['', '여기까지 ___ 사진도 찍자.']],
            options: ['온 김에', '오는 김에', '오면서', '오기 때문에'],
            answer: '온 김에',
            explain: 'La llegada ya se completó: 오다 → 온 김에.',
          },
          {
            scene: 'Todavía vas camino a Seúl.',
            lines: [['', '서울에 ___ 박물관도 가자.']],
            options: ['가는 김에', '간 김에', '가면서만', '갔기 때문에'],
            answer: '가는 김에',
            explain: 'El desplazamiento se presenta en curso o previsto: 가는 김에.',
          },
          {
            scene: 'Te pusiste ropa nueva y aprovechas para una foto.',
            lines: [['', '새 옷을 ___ 사진을 찍었어요.']],
            options: ['입은 김에', '입는 김에', '입으면서', '입기 전에'],
            answer: '입은 김에',
            explain: 'Ponerse la ropa ya ocurrió: 입다 → 입은 김에.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tarea comunicativa',
        tag: 'Producción',
        intro: 'Crea recomendaciones naturales usando una ocasión real.',
        type: 'write',
        items: [
          {
            scene: 'Sales de casa y puedes resolver otra tarea de paso.',
            prompt: 'Escribe una frase con 나가는 김에 y una acción adicional marcada con 도.',
            answer: '나가는 김에 우유도 사 올게요.',
            accepted: ['나가는 김에', '도', '사 올게요'],
            explain: 'La salida crea la oportunidad; 도 señala la tarea adicional.',
          },
          {
            scene: 'Ya llegaste a un lugar especial.',
            prompt: 'Propón aprovechar la llegada para tomar una foto.',
            answer: '여기까지 온 김에 사진도 찍자.',
            accepted: ['온 김에', '사진도', '찍자'],
            explain: '온 김에 marca la acción completada y 찍자 convierte la segunda acción en propuesta.',
          },
        ],
      },
    ],
  },
}

export default topic
