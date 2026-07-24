import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'causal-gi-ttaemune-b1',
  order: '06',
  color: '#c60c30',
  category: 'Causal y razón',
  level: 'B1',
  title: '-기 때문에: Expresión de Causalidad Formal en Coreano B1',
  shortTitle: '-기 때문에 (porque, debido a)',
  metaTitle: '-기 때문에 en Coreano B1 — Causalidad Formal y Académica',
  description:
    '-기 때문에 expresa causalidad de forma más formal y académica que -어서/-아서. Literal: "-기" (nominalizar) + "때문에" (a causa de). Se usa para explicar razones con más peso: cambios de eventos históricos, decisiones formales, análisis causal profundo. Fundamental para discurso académico en B1.',
  lead: 'Domina -기 때문에 para expresar causas formales y académicas: "debido a que...", "porque..."',
  outcomes: [
    'Forma causalidad con -기 때문에',
    'Distingues -어서/-아서 (casual) de -기 때문에 (formal)',
    'Expresas causas que permiten negación contrafáctica',
    'Usas en contextos académicos y de análisis formal',
  ],

  guide: {
    goal: 'Expresar razones de forma formal y académica, permitiendo análisis causal más profundo.',
    model: '시간이 없기 때문에 못 갔어요. 인구 증가 때문에 문제가 생겼어요. (No fui porque no tenía tiempo. Surgieron problemas debido al aumento poblacional.)',
    formula: 'Verbo/adjetivo + -기 때문에 + consecuencia',
    decisions: [
      '-기 때문에: causalidad formal, nominaliza la razón como entidad autónoma',
      '-어서/-아서: causalidad casual, implica conexión temporal cercana',
      'Con negación: 못 하기 때문에 / 하지 않기 때문에',
      'Con sustantivo: 시간 + 때문에 = tiempo + a causa de',
      'Permite contrafáctico: 공부 기 때문에 성공한 거예요 (el éxito es debido al estudio)',
      'Más académico/escrito que oral, aunque ambos son válidos',
    ],
    table: [
      ['Estructura', 'Uso', 'Ejemplo'],
      ['-기 때문에', 'Causalidad formal', '이 문제가 심각하기 때문에 대책이 필요해요 — debido a que este problema es grave, se necesita una medida'],
      ['-어서/-아서', 'Causalidad casual', '아파서 병원에 갔어요 — como estaba enfermo, fui al hospital'],
      ['명사 + 때문에', 'Sustantivo + a causa de', '코로나 때문에 취소됐어요 — se canceló por (a causa de) COVID'],
    ],
    mistakes: [
      '"-기 때문이에요" (con ser) puede ser más enfático pero -기 때문에 es suficiente.',
      'No confundas -기 때문에 (nominalizador) con "때문에" solo (que va con sustantivos).',
      '"공부했기 때문에 성공했어요" ✓ vs "-었기 때문에": -었 va DENTRO de "공부했기", no fuera.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -기 때문에 en coreano?',
      paragraphs: [
        '-기 때문에 es una construcción que expresa causalidad nominalizando la razón. Literal: "-기" (sufijo nominalizador) convierte el verbo/adjetivo en sustantivo abstracto; "때문에" significa "a causa de". Juntos: "a causa de [razón nominalizada]".',
        'Es más formal y académico que -어서/-아서. Se usa en ensayos, análisis, noticias, discursos formales. TOPIK II lo incluye frecuentemente en secciones de lectura y escritura.',
      ],
    },
    {
      heading: '-어서/-아서 vs -기 때문에',
      paragraphs: [
        '-어서/-아서 es la forma casual y temporal: expresa que dos acciones/estados están conectados en secuencia temporal. "배고파서 밥을 먹었어요" (tenía hambre, así que comí arroz) — causa y efecto en el mismo momento.',
        '-기 때문에 es la forma formal y analítica: trata la razón como una entidad separada, permitiendo análisis más profundo. "인구 증가 때문에 주택 부족이 생겼어요" (existe escasez de vivienda debido al aumento poblacional) — se analiza la razón como causa raíz.',
      ],
    },
    {
      heading: 'Uso con negación',
      paragraphs: [
        'Con negación, -기 때문에 es especialmente importante: "돈이 없기 때문에 못 갔어요" (no pude ir porque no tenía dinero). La negación "없기" se nominaliza y luego se aplica "때문에".',
        'También: "하지 않기 때문에" o "못 하기 때문에" para diferentes matices de negación. "일하지 않기 때문에 피곤하지 않아요" (como no trabajo, no estoy cansado).',
      ],
    },
    {
      heading: 'Uso con sustantivos: nombre + 때문에',
      paragraphs: [
        'Con sustantivos directo: "코로나 때문에 학교가 문을 닫았어요" (La escuela cerró por COVID). Aquí "때문에" va directo con el sustantivo sin -기 porque ya es sustantivo.',
        'Diferencia: "아프기 때문에" (porque está enfermo — verbo nominalizado) vs "감기 때문에" (por un resfriado — sustantivo directo). Ambos son causales pero con diferente estructura.',
      ],
    },
    {
      heading: 'Contextos académicos y formales',
      paragraphs: [
        'En ensayos y análisis: "경제 불황 때문에 실업률이 증가했어요" (la tasa de desempleo aumentó debido a la recesión económica). Permite análisis causal sistemático.',
        'En reportajes: "기술 발전 때문에 산업이 변화하고 있어요" (la industria está cambiando debido al avance tecnológico). Tono profesional y estructurado.',
      ],
    },
    {
      heading: 'Contrafáctico y especulación',
      paragraphs: [
        '-기 때문에 permite especulación clara: "공부했기 때문에 합격했어요" (el aprobado fue debido al estudio). Implica que SIN estudio, no habría aprobado — análisis contrafáctico implícito.',
        'Esto es difícil con -어서: "공부해서 합격했어요" suena más como descripción de secuencia que análisis causal.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-기 때문에 (formal, causal) vs -어서 (casual, temporal). Nominalizador -기.',
    graphicPrompt: 'Tabla: -기 때문에 en contextos formales vs -어서 en casuals. Ejemplos académicos.',
    scene: [
      ['시간이 없기 때문에 못 갔어요.', 'No pude ir porque no tenía tiempo.'],
      ['코로나 때문에 취소됐어요.', 'Se canceló por COVID.'],
      ['학비가 비싸기 때문에 고민이 많아요.', 'Tengo muchas preocupaciones porque la matrícula es cara.'],
      ['인구 증가 때문에 주택 부족이 심해요.', 'La escasez de vivienda es grave debido al aumento poblacional.'],
      ['기술 발전이 있기 때문에 일자리가 바뀌어요.', 'Los empleos cambian porque hay avance tecnológico.'],
      ['실수하기 때문에 배워요.', 'Aprendemos porque cometemos errores.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['-기 때문에', '명사 + 때문에', '형식적 인과'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Selecciona -기 때문에',
        tag: 'Múltipla escolha',
        intro: 'Completa con -기 때문에 o sustantivo + 때문에.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -기 때문에',
            lines: [['', '시간이 없___ 못 갔어요.']],
            options: ['없어서', '없기 때문에', '없으니까', '없을 때'],
            answer: '없기 때문에',
            explain: '없다 → 없기 때문에 (formal causal).',
          },
          {
            scene: 'Sustantivo + 때문에',
            lines: [['', '코로나 ___ 취소됐어요.']],
            options: ['때문에', '기 때문에', '어서', '-니까'],
            answer: '때문에',
            explain: 'Sustantivo directo: 코로나 + 때문에.',
          },
          {
            scene: '-어서 vs -기 때문에',
            lines: [['', '이 문제가 심각___ 대책이 필요해요. (formal análisis)']],
            options: ['해서', '기 때문에', '어서', '-니까'],
            answer: '기 때문에',
            explain: 'Contexto formal/académico: -기 때문에.',
          },
          {
            scene: 'Negación + -기 때문에',
            lines: [['', '공부 ___ 떨어졌어요.']],
            options: ['하지 않아서', '하지 않기 때문에', '하니까', '하도록'],
            answer: '하지 않기 때문에',
            explain: 'Negación formal: 하지 않기 때문에.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Causalidad formal vs casual',
        tag: '2 decisiones',
        intro: 'Usa -기 때문에 o -어서 según contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Formal vs casual',
            lines: [['', "[[0]]: 경제 불황 때문에 실업이 늘었어요. (formal) / [[1]]: 피곤해서 집에 있었어요. (casual)"]],
            blanks: [
              { options: ['어서', '기 때문에'], answer: '기 때문에', explain: 'Contexto formal/académico: -기 때문에.' },
              { options: ['어서', '기 때문에'], answer: '어서', explain: 'Contexto casual/personal: -어서.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Análisis causal formal',
        tag: 'Texto guiado',
        intro: 'Completa un análisis académico con -기 때문에.',
        type: 'guidedText',
        scene: 'Análisis de un problema social.',
        text: '인구 증가 때문에 도시가 커지고 있어요. 개발이 빨라[[0]] 환경 문제가 생겨요. 사람들이 자동차를 많이 타[[1]] 오염이 심해졌어요. 정부가 조치를 취하지 않[[2]] 상황이 악화될 거예요.',
        blanks: [
          { options: ['어서', '기 때문에', '-니까'], answer: '기 때문에', explain: 'Análisis formal: -기 때문에.' },
          { options: ['어서', '기 때문에', '-도록'], answer: '기 때문에', explain: 'Análisis causal: -기 때문에.' },
          { options: ['기 때문에', '니까', '-니까'], answer: '기 때문에', explain: 'Análisis estructurado: -기 때문에.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura causal académica',
        tag: 'Texto libre',
        intro: 'Escribe oraciones académicas con -기 때문에.',
        type: 'freeText',
        scene: 'Análisis de causas de un fenómeno.',
        text: '1. [[0]] (La tecnología avanza porque...). 2. [[1]] (Los empleos cambian debido a...). 3. [[2]] (No fui porque...).',
        blanks: [
          { answer: '기술이 발전하기 때문에 사회가 변해요', accepted: ['-기 때문에', '발전'], explain: '-기 때문에 en análisis formal.' },
          { answer: '기술 발전 때문에 일자리가 바뀌어요', accepted: ['때문에', '발전'], explain: '명사 + 때문에 en análisis.' },
          { answer: '시간이 없기 때문에 못 갔어요', accepted: ['-기 때문에', '없'], explain: '-기 때문에 con negación.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de análisis',
        tag: 'Producción',
        intro: 'Escribe un análisis causal sobre un tema.',
        type: 'write',
        items: [
          {
            scene: 'Análisis social',
            prompt: 'Escribe 3 oraciones analizando causas de un problema con -기 때문에.',
            answer: '교육 수준이 높기 때문에 사회가 발전해요. 자동차 증가 때문에 오염이 심해져요. 정부 정책이 바뀌기 때문에 경제가 달라져요.',
            accepted: ['-기 때문에', '명사 + 때문에', '분석'],
            explain: 'Análisis causal formal con múltiples causas.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de nominalizador -기',
        tag: 'Análise',
        intro: 'Explica cómo -기 cambia la estructura causal.',
        type: 'write',
        items: [
          {
            scene: 'Función del nominalizador',
            prompt: '¿Cómo "공부하기 때문에"  es diferente de solo "공부해서"?',
            answer: '"공부하기" nominaliza la acción en una entidad causal. Permite análisis: "debido a la acción de estudiar [como causa autónoma]". "공부해서" es simplemente secuencia temporal. -기 hace la causa más central y analítica.',
            accepted: ['명사화', '인과', '분석'],
            explain: 'El nominalizador -기 cambia la relación causal de temporal a analítica.',
          },
        ],
      },
    ],
  },
}

export default topic
