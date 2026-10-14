import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pasiva-jeosudo-b1',
  order: '17',
  color: '#c60c30',
  category: 'Voz y perspectiva',
  level: 'B1',
  title: '피동사: voz pasiva en coreano B1',
  shortTitle: '피동사 (voz pasiva)',
  metaTitle: 'Voz pasiva coreana B1 — 피동사, -아/어지다 y -되다',
  description:
    'La voz pasiva coreana (피동) pone en primer plano a la persona o cosa que recibe una acción. Se expresa con pares verbales lexicalizados como 읽다→읽히다 y 열다→열리다, con sustantivos en 하다 que pasan a 되다, y en ciertos contextos con -아/어지다. No existe una regla mecánica única para todos los verbos.',
  lead: 'Domina 피동사 para cambiar el foco hacia la persona o cosa que recibe una acción y describir hechos de forma neutral.',
  outcomes: [
    'Reconocer pares activos y pasivos frecuentes',
    'Usar -이/-히/-리/-기 y 하다→되다 sin aplicarlos mecánicamente',
    'Marcar al agente con 에게/한테 o 에 의해 según el registro',
    'Transformar oraciones activas en pasivas naturales',
  ],
  guide: {
    goal: 'Describir una acción desde la perspectiva de quien o lo que la recibe.',
    model: '사람들이 그 책을 많이 읽어요. → 그 책이 많이 읽혀요. (La gente lee mucho ese libro → Ese libro es muy leído.)',
    formula: 'Objeto activo + 이/가 + verbo pasivo | agente + 에게/한테 | N-하다 → N-되다',
    decisions: [
      'Aprende pares frecuentes: 읽다→읽히다, 잡다→잡히다, 열다→열리다, 듣다→들리다',
      'Los sufijos -이/-히/-리/-기 no son intercambiables ni se aplican libremente a cualquier verbo',
      'Con muchos verbos en 하다 se usa 되다: 결정하다→결정되다, 출판하다→출판되다',
      'El agente animado suele marcarse con 에게/한테; 에 의해 aparece en registros formales',
      'A menudo el agente se omite cuando es desconocido, obvio o poco importante',
    ],
    table: [
      ['Activa', 'Pasiva', 'Ejemplo'],
      ['읽다 (leer)', '읽히다 (ser leído)', '이 책이 많이 읽혀요'],
      ['열다 (abrir)', '열리다 (abrirse)', '문이 열렸어요'],
      ['잡다 (atrapar)', '잡히다 (ser atrapado)', '도둑이 경찰에게 잡혔어요'],
      ['출판하다 (publicar)', '출판되다 (ser publicado)', '책이 출판되었어요'],
    ],
    mistakes: [
      'No elijas el sufijo por intuición: memoriza el verbo pasivo como una entrada de vocabulario.',
      '"책을 읽혀요" ❌ si 책 es lo leído; en pasiva debe ser "책이 읽혀요" ✓.',
      'No confundas causativas y pasivas que comparten forma: el significado y la estructura de la oración deciden la lectura.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo funciona la voz pasiva en coreano?',
      paragraphs: [
        'En una oración activa, el agente realiza la acción y el objeto la recibe: 사람들이 문을 열었어요 (la gente abrió la puerta). En la pasiva, el objeto pasa a ser el foco con 이/가: 문이 열렸어요 (la puerta se abrió/fue abierta). El agente puede omitirse.',
        'La pasiva coreana es menos productiva que la española. Conviene aprender pares completos y observar qué forma usa cada verbo en contextos reales.',
      ],
    },
    {
      heading: '¿Qué verbos pasivos con -이/-히/-리/-기 son frecuentes?',
      paragraphs: [
        'Entre los pares más frecuentes están 보다→보이다 (verse), 놓다→놓이다 (ser colocado), 읽다→읽히다 (ser leído), 잡다→잡히다 (ser atrapado), 열다→열리다 (abrirse), 듣다→들리다 (oírse), 끊다→끊기다 (cortarse) y 쫓다→쫓기다 (ser perseguido).',
        'La vocal o consonante final no basta para predecir el sufijo. Por eso se recomienda memorizar cada par con una oración breve.',
      ],
    },
    {
      heading: '¿Cuándo se usan 되다, 에게 y 에 의해?',
      paragraphs: [
        'Los sustantivos verbales con 하다 suelen formar la pasiva con 되다: 계획이 변경되었어요 (el plan fue modificado), 결과가 발표되었어요 (los resultados fueron anunciados).',
        'Si se menciona al agente, 에게 o 한테 es natural con personas: 도둑이 경찰에게 잡혔어요. 에 의해 es más formal y aparece en noticias o textos académicos: 이 건물은 유명한 건축가에 의해 설계되었어요.',
      ],
    },
  ],
  visual: {
    mode: 'contrast',
    teacherLens: 'Activa: el agente hace la acción. Pasiva: el elemento afectado ocupa el foco.',
    graphicPrompt: 'Comparación visual entre agente, objeto y sujeto pasivo con flechas de cambio.',
    scene: [
      ['이 책이 많이 읽혀요.', 'Este libro es muy leído.'],
      ['문이 자동으로 열렸어요.', 'La puerta se abrió automáticamente.'],
      ['밖에서 음악이 들려요.', 'Se oye música desde afuera.'],
      ['도둑이 경찰에게 잡혔어요.', 'El ladrón fue atrapado por la policía.'],
      ['결과가 오늘 발표되었어요.', 'Los resultados fueron anunciados hoy.'],
      ['이 건물은 1990년에 지어졌어요.', 'Este edificio fue construido en 1990.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['pares activo/pasivo', 'partícula 이/가', 'agente con 에게/에 의해'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma pasiva',
        tag: 'Opción múltiple',
        intro: 'Elige el verbo pasivo que completa cada escena.',
        type: 'choice',
        items: [
          { scene: 'Un libro popular', lines: [['', '이 책은 많은 사람에게 ___요.']], options: ['읽혀', '읽어', '읽게 해', '읽고'], answer: '읽혀', explain: '읽다→읽히다: 읽혀요 significa «es leído».' },
          { scene: 'Una puerta automática', lines: [['', '문이 자동으로 ___어요.']], options: ['열렸', '열었', '열게 했', '열고'], answer: '열렸', explain: '열다→열리다: 문이 열렸어요 = la puerta se abrió.' },
          { scene: 'Música a lo lejos', lines: [['', '밖에서 음악이 ___요.']], options: ['들려', '들어', '듣게 해', '듣고'], answer: '들려', explain: '듣다→들리다: 음악이 들려요 = se oye música.' },
          { scene: 'Noticia oficial', lines: [['', '결과가 오늘 ___었어요.']], options: ['발표되', '발표하', '발표시키', '발표해'], answer: '발표되', explain: '발표하다→발표되다: el resultado fue anunciado.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Pasiva en contexto',
        tag: 'Texto guiado',
        intro: 'Completa el relato con la forma pasiva adecuada.',
        type: 'guidedText',
        scene: '뉴스에서 사건을 설명해요.',
        text: '새 책이 어제 [[0]]. 도둑이 경찰에게 [[1]]. 중요한 소식이 모두에게 [[2]]. 회의 시간이 오후로 [[3]].',
        blanks: [
          { options: ['출판되었어요', '출판했어요', '출판시켰어요', '출판해요'], answer: '출판되었어요', explain: '출판하다→출판되다: el libro fue publicado.' },
          { options: ['잡혔어요', '잡았어요', '잡게 했어요', '잡아요'], answer: '잡혔어요', explain: '잡다→잡히다: el ladrón fue atrapado.' },
          { options: ['알려졌어요', '알았어요', '알렸어요', '알게 했어요'], answer: '알려졌어요', explain: '알려지다 expresa que algo llegó a conocerse o fue divulgado.' },
          { options: ['변경되었어요', '변경했어요', '변경시켰어요', '변경해요'], answer: '변경되었어요', explain: '변경하다→변경되다: la hora fue modificada.' },
        ],
      },
      {
        id: 'level-3',
        title: 'Transforma a voz pasiva',
        tag: 'Texto libre',
        intro: 'Escribe una oración pasiva natural para cada situación.',
        type: 'freeText',
        scene: '능동문을 피동문으로 바꾸세요.',
        text: '사람들이 이 책을 많이 읽어요 → [[0]] / 직원이 문을 열었어요 → [[1]] / 경찰이 도둑을 잡았어요 → [[2]] / 회사가 결과를 발표했어요 → [[3]]',
        blanks: [
          { answer: '이 책이 많이 읽혀요', accepted: ['이 책이 많이 읽혀요'], explain: '책 pasa a ser sujeto con 이/가 y 읽다 cambia a 읽히다.' },
          { answer: '문이 열렸어요', accepted: ['문이 열렸어요', '문이 직원에 의해 열렸어요'], explain: '문이 열렸어요 centra la atención en la puerta.' },
          { answer: '도둑이 경찰에게 잡혔어요', accepted: ['도둑이 경찰에게 잡혔어요'], explain: 'El agente humano se marca con 에게.' },
          { answer: '결과가 발표되었어요', accepted: ['결과가 발표되었어요', '결과가 회사에 의해 발표되었어요'], explain: '발표하다 forma una pasiva productiva con 되다.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Explica y produce la perspectiva pasiva',
        tag: 'Análisis',
        intro: 'Compara activa y pasiva y justifica la elección.',
        type: 'write',
        items: [
          { scene: 'Activa vs. pasiva', prompt: 'Compara 사람들이 문을 열었어요 y 문이 열렸어요. ¿Qué cambia en el foco?', answer: 'La activa destaca a 사람들이, quienes abren la puerta. La pasiva destaca 문, el elemento afectado, y puede omitir al agente.', accepted: ['사람들이', '문', '피동'], explain: 'La pasiva reorganiza la perspectiva, no solo la terminación verbal.' },
          { scene: 'Agente formal', prompt: 'Escribe una oración formal con 에 의해 y 설계되다 sobre un edificio.', answer: '이 건물은 유명한 건축가에 의해 설계되었어요.', accepted: ['에 의해', '설계되었어요'], explain: '에 의해 introduce al agente en un registro formal.' },
          { scene: 'Par verbal', prompt: 'Crea una pareja activa/pasiva con 읽다 y 읽히다.', answer: '학생들이 책을 읽어요. 그 책이 학생들에게 많이 읽혀요.', accepted: ['읽어요', '읽혀요'], explain: 'La pareja muestra cómo 책 pasa de objeto a sujeto pasivo.' },
        ],
      },
    ],
  },
}

export default topic
