import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-intencion-b1',
  order: '02',
  color: '#c60c30',
  category: 'Tiempo verbal',
  level: 'B1',
  title: '-(으)ㄹ 것이다: Futuro e Intención en Coreano B1',
  shortTitle: '-(으)ㄹ 것이다 (Futuro/Intención)',
  metaTitle: '-(으)ㄹ 것이다 en Coreano B1 — Futuro e Intención',
  description:
    '-(으)ㄹ 것이다 es la construcción principal de futuro en coreano formal. Expresa planes, intenciones firmes, predicciones y conjeturas sobre el futuro. En habla coloquial se contrae a -(으)ㄹ 거예요. Es fundamental distinguirlo de -(으)ㄹ게요 (promesa personal) y -(으)려고 하다 (intención en proceso).',
  lead: 'Domina -(으)ㄹ 것이다 / -(으)ㄹ 거예요 para hablar del futuro, hacer predicciones y expresar intenciones con el nivel de formalidad adecuado.',
  outcomes: [
    'Formas -(으)ㄹ 것이다 correctamente con verbos con y sin recibidor',
    'Distingues el uso formal 것이다 del coloquial 거예요',
    'Expresas predicciones, planes e intenciones con el matiz correcto',
    'Diferencias -(으)ㄹ 것이다 de -(으)ㄹ게요 y -(으)려고 하다',
  ],

  guide: {
    goal: 'Usar -(으)ㄹ 것이다 para expresar futuro, predicciones e intenciones en distintos registros de formalidad.',
    model: '내일 비가 올 것 같아요. (Creo que mañana va a llover.) / 저는 내년에 한국에 갈 거예요. (Voy a ir a Corea el año que viene.)',
    formula: 'Raíz verbal + -(으)ㄹ 것이다 / -(으)ㄹ 거예요',
    decisions: [
      'Raíz termina en vocal o ㄹ: añadir -ㄹ 것이다 (가다→갈 것이다, 알다→알 것이다)',
      'Raíz termina en consonante (excepto ㄹ): añadir -을 것이다 (먹다→먹을 것이다, 읽다→읽을 것이다)',
      'Forma coloquial/conversacional: -ㄹ/을 거예요 (갈 거예요, 먹을 거예요)',
      'Forma formal/escrita: -ㄹ/을 것입니다 (갈 것입니다)',
      'Para predicciones y conjeturas: -ㄹ/을 것 같아요 (비가 올 것 같아요)',
      'Para primera persona: tanto 것이다 como -(으)ㄹ게요 son posibles, pero 것이다 es más neutral',
    ],
    table: [
      ['Raíz', 'Regla', 'Ejemplo'],
      ['Termina en vocal / ㄹ', '+ ㄹ 것이다', '가다→갈 것이다 / 알다→알 것이다'],
      ['Termina en consonante', '+ 을 것이다', '먹다→먹을 것이다 / 읽다→읽을 것이다'],
      ['Registro coloquial', '+ ㄹ/을 거예요', '갈 거예요 / 먹을 거예요'],
    ],
    mistakes: [
      '"갈 것 이에요" ❌ → "갈 거예요" ✓ — 것이에요 se contrae en el habla a 거예요; no se separan con espacio.',
      '"먹을 것이에요" ❌ → "먹을 거예요" ✓ — En conversación siempre usa la forma contraída.',
      'No confundas con -(으)ㄹ게요: 갈게요 = promesa personal (YO voy); 갈 거예요 = plan/predicción (yo/él/ellos van).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma -(으)ㄹ 것이다 en coreano?',
      paragraphs: [
        'La construcción -(으)ㄹ 것이다 se forma añadiendo -ㄹ 것이다 si la raíz del verbo termina en vocal o en ㄹ, y -을 것이다 si termina en cualquier otra consonante. Es una de las estructuras de futuro más versátiles del coreano moderno.',
        'En conversación diaria, casi siempre se usa la forma contraída 거예요 (informal polite) o 거야 (informal). En textos escritos formales, conferencias y noticias se mantiene 것입니다.',
      ],
    },
    {
      heading: 'Usos principales: planes, predicciones y conjeturas',
      paragraphs: [
        'Planes e intenciones: 저는 올해 한국어 시험을 볼 거예요. (Este año voy a hacer el examen de coreano.) La acción es decidida y planificada.',
        'Predicciones: 내일은 날씨가 좋을 거예요. (Mañana va a hacer buen tiempo.) Se hacen sobre el futuro inmediato o lejano.',
        'Conjeturas sobre el presente o futuro: 지금쯤 도착했을 거예요. (Probablemente ya habrá llegado.) Con la forma pasada -았/었을 거예요 expresa conjetura sobre algo ya ocurrido.',
      ],
      table: [
        ['Uso', 'Estructura', 'Ejemplo'],
        ['Plan/Intención', 'V + -(으)ㄹ 거예요', '내년에 결혼할 거예요'],
        ['Predicción futura', 'V + -(으)ㄹ 거예요', '비가 올 거예요'],
        ['Conjetura pasada', 'V + -았/었을 거예요', '벌써 도착했을 거예요'],
      ],
    },
    {
      heading: '-(으)ㄹ 것이다 vs -(으)ㄹ게요: diferencia crucial',
      paragraphs: [
        '-(으)ㄹ게요 es exclusivo de la primera persona y expresa una promesa o compromiso personal frente al interlocutor: 제가 할게요 (Yo lo haré — te lo prometo). Implica que el oyente está involucrado en la decisión.',
        '-(으)ㄹ 거예요 es neutral y puede usarse para todas las personas: 제가 할 거예요 / 그가 할 거예요. No implica promesa, solo describe un plan o predicción.',
      ],
    },
    {
      heading: '-(으)ㄹ 것 같다: predicciones con incertidumbre',
      paragraphs: [
        'Cuando la predicción no es segura, se añade 같다: 비가 올 것 같아요. (Creo que va a llover / Parece que va a llover.) Es una de las construcciones más naturales para opinar sobre el futuro.',
        'Esta forma también se usa para hablar del presente o pasado con incertidumbre: 그 사람이 바쁜 것 같아요 (Parece que esa persona está ocupada), 이미 끝났을 것 같아요 (Parece que ya terminó).',
      ],
    },
    {
      heading: 'Registro: formal vs coloquial',
      paragraphs: [
        'Formal escrito/discurso: -ㄹ/을 것입니다 (갈 것입니다, 먹을 것입니다). Se usa en presentaciones, noticias, textos académicos.',
        'Conversacional polite: -ㄹ/을 거예요 (갈 거예요). El más común en conversaciones cotidianas formales e informales.',
        'Informal entre amigos: -ㄹ/을 거야 (갈 거야). Solo entre personas de confianza o de mayor a menor.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-(으)ㄹ 것이다 para futuro, intenciones y predicciones, con contraste formal/coloquial.',
    graphicPrompt: 'Calendario con planes marcados, nube de lluvia para predicciones, flechas hacia el futuro.',
    scene: [
      ['저는 내년에 한국에 갈 거예요. (jeo neun naenyeon e hanguk e gal geoyeyo)', 'Voy a ir a Corea el año que viene.'],
      ['오늘 저녁에 친구를 만날 거예요. (oneul jeonyeok e chingureul mannal geoyeyo)', 'Esta tarde voy a quedar con un amigo.'],
      ['내일 비가 올 것 같아요. (naeil biga ol geot gatayo)', 'Creo que mañana va a llover.'],
      ['그 영화는 재미있을 거예요. (geu yeonghwa neun jaemiisseul geoyeyo)', 'Esa película va a ser interesante.'],
      ['저는 이번 주말에 공부할 거예요. (jeo neun ibeon jumal e gongbuhal geoyeyo)', 'Este fin de semana voy a estudiar.'],
      ['이미 도착했을 거예요. (imi dochakaesseul geoyeyo)', 'Probablemente ya habrá llegado.'],
      ['이 프로젝트는 다음 달에 끝날 것입니다. (i peurojekteu neun daeum dar e kkeutnnal geosimnida)', 'Este proyecto terminará el mes que viene.'],
      ['졸업 후에는 취직할 거예요. (joreop hue neun chwijikhal geoyeyo)', 'Después de graduarme, voy a buscar trabajo.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-(으)ㄹ 거예요 vs -(으)ㄹ게요', 'consonante/vocal + -(으)ㄹ', '것 같다 para conjeturas'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta de futuro',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de -(으)ㄹ 거예요 o la construcción relacionada correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Planificando el fin de semana',
            lines: [['', '이번 주말에 영화를 ___.']],
            options: ['볼 거예요', '봐요', '보세요', '봤어요'],
            answer: '볼 거예요',
            explain: '볼 거예요: 보다 (raíz 보-) + ㄹ 거예요. Plan futuro.',
          },
          {
            scene: 'Predicción del tiempo',
            lines: [['', '오늘 오후에 비가 ___ 것 같아요.']],
            options: ['올', '와', '오는', '왔을'],
            answer: '올',
            explain: '올 것 같아요: 오다 (raíz 오-) + ㄹ = 올. Predicción con incertidumbre.',
          },
          {
            scene: 'Planes después de la graduación',
            lines: [['', '졸업하고 나서 취직___에요.']],
            options: ['할 거', '한', '하', '해'],
            answer: '할 거',
            explain: '취직할 거예요: 하다 (raíz 하-) + ㄹ 거예요. Plan firme.',
          },
          {
            scene: 'Conjetura sobre alguien',
            lines: [['', '그 사람은 지금쯤 집에 ___을 거예요.']],
            options: ['도착했', '도착하는', '도착해', '도착'],
            answer: '도착했',
            explain: '도착했을 거예요: conjetura sobre algo que probablemente ya ocurrió (pasado + 을 거예요).',
          },
          {
            scene: 'Promesa vs plan',
            lines: [['', 'A: 누가 설거지를 해요? B: 제가 ___.']],
            options: ['할게요', '할 거예요', '할 것이에요', '해요'],
            answer: '할게요',
            explain: '할게요: promesa personal frente al interlocutor (yo me encargo). -(으)ㄹ게요 = compromiso personal.',
          },
          {
            scene: 'Hablando en un discurso formal',
            lines: [['', '저희 회사는 앞으로 더 발전___ 것입니다.']],
            options: ['할', '하는', '해', '한'],
            answer: '할',
            explain: '할 것입니다: forma formal de 할 거예요. Hada (raíz 하-) + ㄹ 것입니다. Discurso/presentación.',
          },
          {
            scene: 'Planes de estudio',
            lines: [['', '저는 오늘부터 매일 한국어를 공부___ 거예요.']],
            options: ['할', '한', '해', '하는'],
            answer: '할',
            explain: '공부할 거예요: 공부하다 (raíz 공부하-) + ㄹ 거예요. Intención firme.',
          },
          {
            scene: 'Resultado esperado',
            lines: [['', '이 약을 먹으면 금방 나___ 거예요.']],
            options: ['을', '는', '았을'],
            answer: '을',
            explain: '나을 거예요: 낫다 (raíz 나-) + 을 거예요. Raíz irregular ㅅ: 낫 → 나. Predicción.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Planes y predicciones duales',
        tag: '2 espacios',
        intro: 'Completa las oraciones con las formas correctas de futuro en los dos huecos.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando de planes de viaje',
            lines: [['', '저는 여름에 제주도에 [[0]] 거예요. 거기서 맛있는 음식도 많이 [[1]] 거예요.']],
            blanks: [
              { options: ['갈', '가는', '가', '간'], answer: '갈', explain: '갈 거예요: 가다 (raíz 가-) + ㄹ. Vocal → ㄹ.' },
              { options: ['먹을', '먹는', '먹', '먹은'], answer: '먹을', explain: '먹을 거예요: 먹다 (raíz 먹-) + 을. Consonante → 을.' },
            ],
          },
          {
            scene: 'Predicciones sobre el futuro',
            lines: [['', '10년 후에는 기술이 더 발전[[0]] 거예요. 그래서 많은 일자리가 바뀔 [[1]] 같아요.']],
            blanks: [
              { options: ['할', '하는', '해', '한'], answer: '할', explain: '발전할 거예요: 발전하다 + ㄹ. Plan/predicción.' },
              { options: ['것', '거', '건', '게'], answer: '것', explain: '바뀔 것 같아요: predicción con incertidumbre — 것 같아요.' },
            ],
          },
          {
            scene: 'Compromisos y planes distintos',
            lines: [['', 'A: 청소 누가 할 거예요? B: 제가 청소[[0]]. 음식은 오빠가 [[1]] 거예요.']],
            blanks: [
              { options: ['할게요', '할 거예요', '해요', '했어요'], answer: '할게요', explain: '할게요: promesa personal. -(으)ㄹ게요 = yo me comprometo.' },
              { options: ['만들', '만들는', '만드는', '만들어'], answer: '만들', explain: '만들 거예요: 만들다 (raíz 만들-) + ㄹ. El hermano lo hará (predicción/plan).' },
            ],
          },
          {
            scene: 'Conjetura sobre alguien ausente',
            lines: [['', '민준이가 왜 안 와요? / 아마 길이 막혀서 늦게 [[0]] 거예요. 이미 출발은 [[1]] 거예요.']],
            blanks: [
              { options: ['올', '오', '오는', '왔을'], answer: '올', explain: '올 거예요: 오다 + ㄹ. Predicción de llegada futura.' },
              { options: ['했을', '할', '하는', '해'], answer: '했을', explain: '출발했을 거예요: conjetura sobre acción pasada (ya salió, probablemente).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Mis planes para el año que viene',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas correctas de -(으)ㄹ 거예요 y -(으)ㄹ 것 같아요.',
        type: 'guidedText',
        scene: 'Un estudiante universitario habla de sus planes y predicciones para el próximo año.',
        text: '내년에는 정말 바쁜 한 해가 [[0]] 것 같아요. 먼저, 졸업 논문을 [[1]] 거예요. 그 다음에는 취업 준비를 [[2]] 거예요. 쉽지는 않겠지만, 열심히 하면 좋은 결과가 [[3]] 거예요. 그리고 틈틈이 여행도 [[4]] 거예요 — 그동안 못 [[5]] 곳들을 다 가보고 싶어요. 내년 이맘때쯤에는 지금보다 훨씬 성장해 [[6]] 것 같아요.',
        blanks: [
          { options: ['될', '되는', '돼', '된'], answer: '될', explain: '될 것 같아요: 되다 + ㄹ + 것 같아요. Predicción.' },
          { options: ['쓸', '쓰는', '써', '쓴'], answer: '쓸', explain: '쓸 거예요: 쓰다 + ㄹ. 쓰 termina en vocal → ㄹ.' },
          { options: ['할', '하는', '해', '한'], answer: '할', explain: '취업 준비를 할 거예요: 하다 + ㄹ. Plan.' },
          { options: ['있을', '있는', '있어', '있'], answer: '있을', explain: '있을 거예요: 있다 + 을. Consonante doble ㅆ → 을.' },
          { options: ['할', '하는', '해', '한'], answer: '할', explain: '여행도 할 거예요: 하다 + ㄹ. Intención.' },
          { options: ['가던', '간', '가', '갈'], answer: '간', explain: '못 간 곳들: modificador pasado (lugares a los que no pudo ir). Aquí es -ㄴ, no -던.' },
          { options: ['있을', '있는', '있어', '있었을'], answer: '있을', explain: '성장해 있을 것 같아요: predicción de estado futuro resultante.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe las formas de futuro',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de -(으)ㄹ 거예요 o la construcción indicada.',
        type: 'freeText',
        scene: 'Completa la conversación entre dos amigos sobre sus planes.',
        text: '수지: 이번 방학에 뭐 [[0]] (하다 + ㄹ 거예요)? / 민준: 저는 알바를 [[1]] (하다 + ㄹ 거예요) 그리고 스페인어도 배울 거예요. / 수지: 재미있겠다! 저는 고향에 [[2]] (가다 + ㄹ 거예요). 부모님이 많이 [[3]] (보고 싶어하다 + ㄹ 거예요) 같아요. / 민준: 맞아요. 오랜만에 [[4]] (만나다 + 면) 좋겠어요.',
        blanks: [
          { answer: '할 거예요', accepted: ['할 거예요', '할거예요'], explain: '하다 + ㄹ 거예요 → 할 거예요. ¿Qué vas a hacer?' },
          { answer: '할 거예요', accepted: ['할 거예요', '할거예요'], explain: '알바를 할 거예요. Mismo verbo, mismo plan.' },
          { answer: '갈 거예요', accepted: ['갈 거예요', '갈거예요'], explain: '가다 + ㄹ 거예요 → 갈 거예요.' },
          { answer: '보고 싶어하실 거예요', accepted: ['보고 싶어하실 거예요', '보고 싶어하실거예요', '보고 싶어할 거예요'], explain: 'Los padres probablemente querrán verla — conjetura con 것 같아요 o ㄹ 거예요.' },
          { answer: '만나면', accepted: ['만나면', '만나게 되면'], explain: '만나다 + -(으)면 → 만나면. Condicional (si se encuentran).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Planes y predicciones propias',
        tag: 'Producción',
        intro: 'Escribe oraciones completas sobre tus planes o predicciones usando -(으)ㄹ 거예요.',
        type: 'write',
        items: [
          {
            scene: 'Tus planes para esta semana',
            prompt: '¿Qué vas a hacer esta semana? Escribe una oración con -(으)ㄹ 거예요.',
            answer: '이번 주에 한국어 시험을 볼 거예요.',
            accepted: ['갈 거예요', '공부할 거예요', '볼 거예요', '만날 거예요', '할 거예요', '먹을 거예요'],
            explain: 'Ejemplo: 이번 주에 친구를 만날 거예요. / 이번 주에 열심히 공부할 거예요.',
          },
          {
            scene: 'Una predicción sobre el tiempo',
            prompt: 'Haz una predicción sobre el tiempo esta semana usando -(으)ㄹ 것 같아요.',
            answer: '이번 주에 날씨가 많이 더울 것 같아요.',
            accepted: ['것 같아요', '올 것 같아요', '비가', '더울', '추울', '맑을'],
            explain: 'Ejemplo: 내일 비가 많이 올 것 같아요. / 이번 주말에는 날씨가 맑을 것 같아요.',
          },
          {
            scene: 'Un plan a largo plazo',
            prompt: 'Habla de un plan que tienes para el futuro (año que viene, 5 años...) con -(으)ㄹ 거예요.',
            answer: '5년 후에는 제 사업을 시작할 거예요.',
            accepted: ['결혼할', '이사할', '공부할', '여행할', '취직할', '살', '배울'],
            explain: 'Ejemplo: 내년에는 한국으로 유학을 갈 거예요. / 5년 후에는 다른 도시로 이사할 거예요.',
          },
          {
            scene: 'Una conjetura sobre alguien',
            prompt: 'Haz una conjetura sobre lo que está haciendo alguien ahora usando -(으)ㄹ 것 같아요 o -(으)ㄹ 거예요.',
            answer: '지금쯤 수업이 끝났을 거예요.',
            accepted: ['거예요', '것 같아요', '자고 있을', '공부하고 있을', '먹고 있을', '도착했을'],
            explain: 'Ejemplo: 지금쯤 친구가 집에 도착했을 거예요. / 선생님은 지금 수업 중일 것 같아요.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Carta al futuro',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre tu futuro usando -(으)ㄹ 거예요 y -(으)ㄹ 것 같아요.',
        type: 'write',
        items: [
          {
            scene: 'Un plan concreto',
            prompt: 'Escribe un plan concreto que tienes para el futuro próximo (usa -(으)ㄹ 거예요).',
            answer: '저는 올해 안에 한국어 능력 시험에 합격할 거예요.',
            accepted: ['거예요', '갈 거예요', '공부할', '만날', '할', '볼', '배울', '이사할'],
            explain: 'Usa -ㄹ/을 거예요 para planes. Ejemplo: 다음 달에 새 직장을 시작할 거예요.',
          },
          {
            scene: 'Una predicción con incertidumbre',
            prompt: 'Haz una predicción sobre el futuro que no es completamente segura (usa -(으)ㄹ 것 같아요).',
            answer: '앞으로 한국어 공부가 더 재미있어질 것 같아요.',
            accepted: ['것 같아요', '같아요', '될 것', '좋아질', '어려울', '쉬울', '바빠질'],
            explain: 'Usa -(으)ㄹ 것 같아요 para predicciones inciertas. Ejemplo: 내년에는 더 바빠질 것 같아요.',
          },
          {
            scene: 'Un compromiso personal',
            prompt: 'Expresa un compromiso personal hacia alguien usando -(으)ㄹ게요.',
            answer: '앞으로는 더 열심히 연락할게요.',
            accepted: ['할게요', '갈게요', '볼게요', '만날게요', '보낼게요', '노력할게요'],
            explain: '-(으)ㄹ게요 es una promesa. Ejemplo: 약속 꼭 지킬게요. (Cumpliré la promesa.)',
          },
        ],
      },
    ],
  },
}

export default topic
