import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condicional-erado-eurely-b1',
  order: '05',
  color: '#c60c30',
  category: 'Estructura condicional',
  level: 'B1',
  title: '-더라도 / -더라고 해도: Condicionales Concesivos en Coreano B1',
  shortTitle: '-더라도 (condicional concesivo)',
  metaTitle: '-더라도 / -더라고 해도 en Coreano B1 — Condicionales Concesivos y Adversativos',
  description:
    '-더라도 (y su variante -더라고 해도) expresa condicionales concesivos: "aunque...", "incluso si...". A diferencia de -면 (simple condicional), -더라도 añade matiz de concesión: aceptas la condición pero afirmas la consecuencia de todas formas. Esencial para argumentación en B1.',
  lead: 'Domina -더라도 / -더라고 해도 para expresar condicionales concesivos: "aunque..., aún así..."',
  outcomes: [
    'Forma condicionales concesivos con -더라도',
    'Distingues -면 (si) de -더라도 (aunque, incluso si)',
    'Usas -더라고 해도 para variante más coloquial',
    'Expresas argumentos que persisten a pesar de la condición',
  ],

  guide: {
    goal: 'Expresar condicionales concesivos donde la consecuencia se mantiene independientemente de la condición.',
    model: '비가 와도 가겠어요. / 돈이 많더라도 행복하지 않아요. (Aunque llueva, iré. / Aunque tenga mucho dinero, no es feliz.)',
    formula: 'Verbo + -더라도 / Verbo + -더라고 해도',
    decisions: [
      '-더라도: condicional concesivo formal, "aunque, incluso si"',
      '-더라고 해도: variante más coloquial de -더라도',
      'Con verbos: 가다 → 가더라도, 먹다 → 먹더라도',
      'Con adjetivos: 예쁘다 → 예쁘더라도, 비싸다 → 비싸더라도',
      'Diferencia: -면은 simple condicional (si A, entonces B); -더라도 concesivo (aunque A, sigue siendo B)',
      '시간이 없더라도 = aunque no tengas tiempo / 시간이 없으면 = si no tienes tiempo',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-더라도', 'Concesivo formal', '아무리 바쁘더라도 와요 — aunque esté muy ocupado, vengo'],
      ['-더라고 해도', 'Concesivo coloquial', '힘들더라고 해도 포기 안 해요 — aunque sea difícil, no renuncio'],
      ['-면 vs -더라도', 'Simple vs concesivo', '비가 오면 안 가요 vs 비가 와도 가요 — si llueve no voy vs aunque llueva, voy'],
    ],
    mistakes: [
      '"-면도" no existe; es "-더라도" o "-더라고 해도" para concesión.',
      '"-더라도" con sentido de "si" simple es incorrecto; usa "-면".',
      'No confundas -더라도 (concesión en presente/futuro) con -었더라도 (concesión contrafáctica).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -더라도 en coreano?',
      paragraphs: [
        '-더라도 es un sufijo que expresa condicionales concesivos: "aunque", "incluso si". A diferencia del simple condicional -면, -더라도 implica que la consecuencia ocurre A PESAR de la condición, no como resultado lógico de ella.',
        'Es fundamental para expresar argumentos firmes: "aunque llueva, iré"; "aunque sea caro, lo quiero". TOPIK II incluye este patrón frecuentemente.',
      ],
    },
    {
      heading: 'Diferencia entre -면 (si) y -더라도 (aunque)',
      paragraphs: [
        '-면 es condicional simple: describe relación de causa-efecto lógica. "-면" = "si ocurre A, ocurre B como resultado". 비가 오면 안 가요 (si llueve, no voy). Es lógico: lluvia → no ir.',
        '-더라도 es condicional concesivo: la consecuencia se mantiene A PESAR de la condición. "비가 와도 가요" (aunque llueva, voy). El énfasis está en que la lluvia no te detiene.',
      ],
    },
    {
      heading: 'Uso con verbos y adjetivos',
      paragraphs: [
        'Con verbos: 가다 → 가더라도 (aunque vaya), 먹다 → 먹더라도 (aunque coma), 연락하다 → 연락하더라도 (aunque contacte).',
        'Con adjetivos: 예쁘다 → 예쁘더라도 (aunque sea bonito), 비싸다 → 비싸더라도 (aunque sea caro), 어렵다 → 어렵더라도 (aunque sea difícil).',
      ],
    },
    {
      heading: '-더라고 해도: variante coloquial',
      paragraphs: [
        '-더라고 해도 es la forma más coloquial de -더라도, muy común en oralidad coreana. Tiene el mismo significado: concesión.',
        'Ejemplo: 힘들더라고 해도 계속할 거예요 (aunque sea difícil, seguiré). Es más natural en conversación que -더라도 formal.',
      ],
    },
    {
      heading: 'Contextos de uso típicos en TOPIK II',
      paragraphs: [
        'Expresar obstáculos que no frenan tu acción: 돈이 없더라도 해보겠어요 (aunque no tenga dinero, lo intentaré). 날씨가 안 좋더라도 운동할 거예요 (aunque el clima sea malo, haré ejercicio).',
        'Argumentar puntos de vista: 반대하더라도 진행할 거요 (aunque se opongan, seguiremos adelante). 얘기가 길더라도 들어봐요 (aunque sea larga la historia, escúchala).',
      ],
    },
    {
      heading: '-었더라도 (concesión contrafáctica del pasado)',
      paragraphs: [
        'Para situaciones pasadas imposibles: 돈이 많았더라도 행복하지 않았을 거예요 (aunque hubiera tenido dinero, no habría sido feliz). Expresa especulación sobre alternativas del pasado.',
        'Estructura: verbo pasado (-었-) + -더라도. La consecuencia se expresa en condicional pasado (-을 거예요 o -였을 거예요).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-더라도 vs -면: concesivo vs simple. Variante -더라고 해도.',
    graphicPrompt: 'Tabla: -면 (si, lógico) vs -더라도 (aunque, concesivo). Ejemplos en ambas formas.',
    scene: [
      ['비가 와도 가요.', 'Aunque llueva, voy.'],
      ['아무리 비싸더라도 사고 싶어요.', 'Aunque sea muy caro, quiero comprarlo.'],
      ['힘들더라고 해도 포기 안 했어요.', 'Aunque fuera difícil, no renuncié.'],
      ['시간이 없더라도 도와줄 거예요.', 'Aunque no tenga tiempo, te ayudaré.'],
      ['뭐라고 해도 이 결정은 변 안 할 거예요.', 'Sin importar qué digas, no cambiaré esta decisión.'],
      ['얼마나 멀더라도 찾아가겠어요.', 'Por lejos que sea, iré a buscarte.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['-더라도 vs -면', '에 컨 대사', '고정 표현'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica -더라도 correcto',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta con -더라도.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -더라도',
            lines: [['', '비가 와도 ___. (가다)']],
            options: ['가요', '가더라도', '가더라고', '갔어도'],
            answer: '가더라고',
            explain: '가다 → 가더라도 (aunque vaya).',
          },
          {
            scene: 'Adjetivo + -더라도',
            lines: [['', '이 물건은 ___ 사고 싶어요. (비싸다)']],
            options: ['비싸서', '비싸도', '비싸더라도', '비싸면'],
            answer: '비싸더라도',
            explain: '비싸다 → 비싸더라도 (aunque sea caro).',
          },
          {
            scene: '-면 vs -더라도',
            lines: [['', '시간이 없으면 / 없더라도 안 와요.']],
            options: ['같은 뜻', '다른 뜻', '-면만 맞음', '-더라도만 맞음'],
            answer: '다른 뜻',
            explain: '-면: 인과관계 (sin tiempo → no voy). -더라도: 양보 (aunque no tenga tiempo, voy).',
          },
          {
            scene: '-더라고 해도 (coloquial)',
            lines: [['', '힘들___ 포기 안 해요.']],
            options: ['더라도', '더라고 해도', '면', '고도'],
            answer: '더라고 해도',
            explain: '-더라고 해도 es coloquial para -더라도.',
          },
        ],
      },
      {
        id: 'level-2',
        title: '-면 vs -더라도',
        tag: '2 decisiones',
        intro: 'Completa con -면 o -더라도 según el sentido.',
        type: 'dual',
        items: [
          {
            scene: 'Simple causal vs concesivo',
            lines: [['', " : 비가 오[[0]] 안 가요. (Lógico: lluvia → no voy)"]],
            blanks: [
              { options: ['-면', '-더라도'], answer: '-면', explain: '-면 para relación causal simple.' },
            ],
          },
          {
            scene: 'Concesión vs causal',
            lines: [['', " : 비가 와[[0]] 가겠어요. (Concesión: aunque llueva, voy)"]],
            blanks: [
              { options: ['-면', '-더라도'], answer: '-더라도', explain: '-더라도 para concesión.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrativa con -더라도',
        tag: 'Texto guiado',
        intro: 'Completa un párrafo con condicionales concesivos.',
        type: 'guidedText',
        scene: 'Expresión de determinación a pesar de obstáculos.',
        text: '아무리 바쁘[[0]] 약속은 지킬 거예요. 돈이 없[[1]] 꿈을 포기 안 할 거예요. 남들이 반대[[2]] 내 길을 갈 거예요. 얼마나 어렵[[3]] 절대 포기 안 해요.',
        blanks: [
          { options: ['-더라도', '-면', '-고도'], answer: '-더라도', explain: 'Concesión: aunque esté ocupado, mantendré la cita.' },
          { options: ['-더라도', '-면', '-더니'], answer: '-더라도', explain: 'Concesión: aunque no tenga dinero, no abandonaré el sueño.' },
          { options: ['-더라도', '-도', '-고'], answer: '-더라도', explain: 'Concesión: aunque se opongan, seguiré mi camino.' },
          { options: ['-더라도', '-면', '-니'], answer: '-더라도', explain: 'Concesión: por difícil que sea, nunca renunciaré.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura con -더라도',
        tag: 'Texto libre',
        intro: 'Escribe oraciones con condicionales concesivos.',
        type: 'freeText',
        scene: 'Expresión de compromiso y determinación.',
        text: '1. [[0]] (Aunque sea caro, lo compro). 2. [[1]] (Aunque no tenga tiempo, voy). 3. [[2]] (Aunque sea difícil, continúo).',
        blanks: [
          { answer: '아무리 비싸더라도 사고 싶어요', accepted: ['비싸더라도', 'ㅣ다'], explain: '-더라도 con adjetivo.' },
          { answer: '시간이 없더라도 갈 거예요', accepted: ['-더라도', '없더라도'], explain: '-더라도 con verbo estar.' },
          { answer: '어렵더라도 계속할 거예요', accepted: ['-더라도', '어렵'], explain: '-더라도 con adjetivo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de argumentos',
        tag: 'Producción',
        intro: 'Escribe argumentos con -더라도 sobre tus valores.',
        type: 'write',
        items: [
          {
            scene: 'Compromiso personal',
            prompt: 'Escribe 3 cosas que harías o no harías "aunque..." usando -더라도.',
            answer: '아무리 피곤해도 약속은 지켜요. 돈이 많더라도 욕심부리지 않을 거예요. 외로우더라도 혼자 있는 시간을 소중히 할 거예요.',
            accepted: ['-더라도', '양보', '결의'],
            explain: 'Múltiples condicionales concesivos expresando valores.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de -더라도 vs -었더라도',
        tag: 'Análise',
        intro: 'Explica la diferencia entre presente y pasado contrafáctico.',
        type: 'write',
        items: [
          {
            scene: 'Temporalidad en concesión',
            prompt: '¿Cuál es la diferencia entre "가더라도" y "갔더라도"?',
            answer: '"가더라도" es concesión actual/futura: aunque vaya/iré. "갔더라도" es contrafáctico pasado: aunque hubiera ido (en una alternativa del pasado). -었더라도 especula sobre cambios históricos.',
            accepted: ['시간', '현재', '과거', '반사실적'],
            explain: 'Diferencia entre concesión presente y contrafáctico pasado.',
          },
        ],
      },
    ],
  },
}

export default topic
