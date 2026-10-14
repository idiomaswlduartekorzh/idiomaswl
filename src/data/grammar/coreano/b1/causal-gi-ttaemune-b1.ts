import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'causal-gi-ttaemune-b1',
  order: '06',
  color: '#c60c30',
  category: 'Causal y razón',
  level: 'B1',
  title: '-기 때문에: Expresar una Razón en Coreano B1',
  shortTitle: '-기 때문에 (porque, debido a)',
  metaTitle: '-기 때문에 en Coreano B1 — Expresar Causa y Razón',
  description:
    '-기 때문에 presenta una razón de manera explícita: «porque» o «debido a que». Se usa tanto al hablar como al escribir y suele dar más peso a la causa que -아/어서. Con sustantivos se emplea N 때문에, sin -기.',
  lead: 'Domina -기 때문에 para explicar con claridad por qué ocurre una consecuencia.',
  outcomes: [
    'Forma causalidad con -기 때문에',
    'Distingues el enlace cotidiano -아/어서 de una razón explícita con -기 때문에',
    'Expresas causas afirmativas, negativas y pasadas',
    'Usas N 때문에 correctamente con sustantivos',
  ],

  guide: {
    goal: 'Presentar una causa explícita y relacionarla con su consecuencia.',
    model: '시간이 없기 때문에 못 갔어요. 인구 증가 때문에 문제가 생겼어요. (No fui porque no tenía tiempo. Surgieron problemas debido al aumento poblacional.)',
    formula: 'Verbo/adjetivo + -기 때문에 + consecuencia',
    decisions: [
      '-기 때문에 presenta una causa de forma clara y relativamente neutra o formal',
      '-아서/-어서 suele sonar más conversacional y también expresa secuencia',
      'Con negación: 못 하기 때문에 / 하지 않기 때문에',
      'Con sustantivo se usa N 때문에 sin -기: 시간 때문에',
      'El tiempo aparece antes de -기: 공부했기 때문에 = porque estudié',
      'También se usa en conversación, aunque es frecuente en explicaciones y escritura',
    ],
    table: [
      ['Estructura', 'Uso', 'Ejemplo'],
      ['-기 때문에', 'Razón explícita o enfatizada', '문제가 심각하기 때문에 대책이 필요해요'],
      ['-아서/-어서', 'Causa o secuencia muy común', '아파서 병원에 갔어요'],
      ['명사 + 때문에', 'Sustantivo + a causa de', '코로나 때문에 취소됐어요 — se canceló por (a causa de) COVID'],
    ],
    mistakes: [
      '-기 때문에 conecta con una consecuencia; -기 때문이에요 cierra la oración: «es porque...».',
      'No confundas -기 때문에 (nominalizador) con "때문에" solo (que va con sustantivos).',
      '"공부했기 때문에 성공했어요" ✓ vs "-었기 때문에": -었 va DENTRO de "공부했기", no fuera.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -기 때문에 en coreano?',
      paragraphs: [
        '-기 때문에 es una construcción que expresa causalidad nominalizando la razón. Literal: "-기" (sufijo nominalizador) convierte el verbo/adjetivo en sustantivo abstracto; "때문에" significa "a causa de". Juntos: "a causa de [razón nominalizada]".',
        'Puede sonar más explícito o enfático que -아/어서 y es frecuente en explicaciones, análisis y escritura, pero también aparece en la conversación diaria.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -아/어서 y -기 때문에?',
      paragraphs: [
        '-아/어서 enlaza de manera fluida una causa o una secuencia: "배고파서 밥을 먹었어요" (tenía hambre, así que comí).',
        '-기 때문에 destaca la razón de forma más explícita: "인구가 증가하기 때문에 주택이 부족해졌어요". La diferencia es de enfoque y contexto, no una división absoluta entre informal y formal.',
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
      heading: '¿Cómo se usa 때문에 con sustantivos en coreano?',
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
      heading: 'Cómo marcar el tiempo de la causa',
      paragraphs: [
        'El tiempo se marca antes de -기: 공부했기 때문에 합격했어요 (aprobé porque estudié), 바빴기 때문에 못 왔어요 (no pudo venir porque estaba ocupado).',
        'La construcción explica la causa afirmada; por sí sola no expresa una condición contrafáctica ni afirma qué habría ocurrido sin esa causa.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-기 때문에 (razón explícita) vs -아/어서 (enlace causal o secuencial fluido).',
    graphicPrompt: 'Tabla: -기 때문에 para destacar una razón vs -아/어서 para enlazar causa o secuencia.',
    scene: [
      ['시간이 없기 때문에 못 갔어요.', 'No pude ir porque no tenía tiempo.'],
      ['코로나 때문에 취소됐어요.', 'Se canceló por COVID.'],
      ['학비가 비싸기 때문에 고민이 많아요.', 'Tengo muchas preocupaciones porque la matrícula es cara.'],
      ['인구 증가 때문에 주택 부족이 심해요.', 'La escasez de vivienda es grave debido al aumento poblacional.'],
      ['기술이 발전하기 때문에 일자리가 바뀌어요.', 'Los empleos cambian porque avanza la tecnología.'],
      ['비가 많이 왔기 때문에 길이 막혔어요.', 'Hubo congestión porque llovió mucho.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['-기 때문에', '명사 + 때문에', '형식적 인과'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Selecciona -기 때문에',
        tag: 'Opción múltiple',
        intro: 'Completa con -기 때문에 o sustantivo + 때문에.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -기 때문에',
            lines: [['', '시간이 ___ 못 갔어요.']],
            options: ['없어서', '없기 때문에', '없으니까', '없을 때'],
            answer: '없기 때문에',
            explain: '없다 → 없기 때문에: la falta de tiempo se presenta como causa.',
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
        title: 'Razón explícita vs enlace fluido',
        tag: '2 decisiones',
        intro: 'Usa -기 때문에 o -어서 según contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Análisis vs relato cotidiano',
            lines: [['', '[[0]]: 경제 불황 때문에 실업이 늘었어요. (razón explícita) / [[1]]: 피곤해서 집에 있었어요. (enlace cotidiano)']],
            blanks: [
              { options: ['어서', '기 때문에'], answer: '기 때문에', explain: 'El análisis destaca la causa con -기 때문에.' },
              { options: ['어서', '기 때문에'], answer: '어서', explain: 'El relato enlaza de forma natural el cansancio y la consecuencia.' },
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
        text: '인구 증가 때문에 도시가 커지고 있어요. 개발 속도가 빠르[[0]] 환경 문제가 생겨요. 사람들이 자동차를 많이 타[[1]] 오염이 심해졌어요. 정부가 조치를 취하지 않[[2]] 상황이 악화될 거예요.',
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
        title: 'Análisis de nominalizador -기',
        tag: 'Análisis',
        intro: 'Explica cómo -기 cambia la estructura causal.',
        type: 'write',
        items: [
          {
            scene: 'Función del nominalizador',
            prompt: '¿Cómo "공부하기 때문에"  es diferente de solo "공부해서"?',
            answer: 'En 공부하기 때문에, -기 convierte 공부하다 en una forma nominal y 때문에 presenta esa acción como razón explícita. 공부해서 también puede expresar causa, pero enlaza la causa y el resultado de manera más directa y fluida.',
            accepted: ['명사화', '인과', '분석'],
            explain: '-기 permite que 때문에 tome toda la acción como causa.',
          },
        ],
      },
    ],
  },
}

export default topic
