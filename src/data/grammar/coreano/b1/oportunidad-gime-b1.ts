import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'oportunidad-gime-b1',
  order: '11',
  color: '#c60c30',
  category: 'Tiempo y oportunidad',
  level: 'B1',
  title: '-는 김에: Aprovechando la Oportunidad en Coreano B1',
  shortTitle: '-는 김에 (mientras, ya que)',
  metaTitle: '-는 김에 en Coreano B1 — Expresar Oportunidad y Aprovechamiento',
  description:
    '-는 김에 expresa "ya que estoy haciendo X, aprovecho para hacer Y". Literal: "-는" (presente) + "김" (momento, situación) + "에" (en). Se usa cuando aprovechas una oportunidad para hacer algo más: "ya que estoy fuera, compro leche también", "mientras trabajamos, aprendemos". Fundamental para expresar eficiencia temporal en B1.',
  lead: 'Domina -는 김에 para aprovechar oportunidades: "ya que..., también..."',
  outcomes: [
    'Forma expresiones de aprovechamiento con -는 김에',
    'Expresa acciones adicionales aprovechando una situación',
    'Usa en contextos de eficiencia y oportunidad',
    'Distingues de -으면서 (mientras, simultaneidad)',
  ],

  guide: {
    goal: 'Expresar que aprovechas una situación para hacer algo más.',
    model: '나가는 김에 장을 봐야겠어요. 공부하는 김에 친구도 만나요. (Ya que salgo, debo comprar comida. Mientras estudio, también veo a amigos.)',
    formula: '동사 + -는 김에 + 다른 동사',
    decisions: [
      '-는 김에: aprovechamiento de oportunidad',
      '현재 진행 중인 상황에서 추가 동작',
      '효율성 표현: 두 가지를 함께 하다',
      '"는 김에" con verbo presente simple',
      'No es simultaneidad pura como -으면서; es oportunismo',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-는 김에', 'Aprovechar situación', '나가는 김에 → ya que salgo, aprovecho para...'],
      ['vs -으면서', 'Simultaneidad simple', '나가면서 → mientras salgo (sin énfasis en aprovechamiento)'],
    ],
    mistakes: [
      '"-는 김에 뭐 해요?" ✓ (qué aprovechas para hacer?) vs "-으면서" (simplemente mientras).',
      'No confundas con "-기 때문에" (causa formal).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -는 김에?',
      paragraphs: [
        '-는 김에 expresa que aprovechas una situación para hacer algo más. Implica eficiencia: estás haciendo A, y mientras lo haces, también haces B. Es "matanza de dos pájaros con un tiro".',
        'Muy coreano: enfatiza pragmatismo y eficiencia temporal. Se usa constantemente en conversación para sugerir hacer múltiples cosas en un viaje o situación.',
      ],
    },
    {
      heading: 'Contextos de uso: viajes, tiempo compartido',
      paragraphs: [
        'Viajes: "출장 가는 김에 친구도 만날 거야" (mientras voy por trabajo, también veo a un amigo). "서울에 가는 김에 박물관도 가자" (ya que vamos a Seúl, visitemos el museo también).',
        'Tiempo compartido: "공부하는 김에 카페에도 가자" (ya que estudiamos, vamos a un café). "일하는 김에 점심도 먹어야지" (ya que trabajamos, deberíamos almorzar).',
      ],
    },
    {
      heading: '-는 김에 vs -으면서',
      paragraphs: [
        '-으면서 es simple simultaneidad: "걷으면서 음악 들어요" (escucho música mientras camino — dos cosas a la vez). -는 김에 es aprovechamiento: "나가는 김에 물도 사올 거야" (ya que salgo, también compraré agua — aprovechar la salida).',
        'Diferencia: -으면서 es "hacer X e Y juntos"; -는 김에 es "hacer X, y aprovecho para hacer Y también".',
      ],
    },
    {
      heading: 'Con verbos presentes y acciones cotidianas',
      paragraphs: [
        'Siempre verbo presente (o -는 형): "가는 김에", "먹는 김에", "일하는 김에". No se usa con pasado porque implica oportunidad en el momento actual.',
        'Ejemplos: "밥 먹는 김에 영화도 보자" (mientras comemos, veamos una película). "약국에 가는 김에 편의점도 들렀어" (en el camino a la farmacia, también pasé por la tienda de conveniencia).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-는 김에: aprovechamiento de oportunidad vs -으면서 (simultaneidad simple).',
    graphicPrompt: 'Tabla: -는 김에 (aprovechar) vs -으면서 (hacer juntos). Ejemplos.',
    scene: [
      ['나가는 김에 장을 봐야겠어요.', 'Ya que salgo, debo comprar.'],
      ['서울에 가는 김에 박물관도 가자.', 'Ya que vamos a Seúl, visitemos el museo.'],
      ['공부하는 김에 친구도 만나요.', 'Mientras estudio, también veo amigos.'],
      ['밥 먹는 김에 영화도 보자.', 'Mientras comemos, veamos una película.'],
      ['약국에 가는 김에 편의점도 들렀어요.', 'De camino a la farmacia, también pasé por la tienda.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['기회 활용', '효율', '-으면서 대비'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -는 김에',
        tag: 'Múltipla escolha',
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
            lines: [['', '영화 보___ 팝콘도 먹어. (aprovechamiento)']],
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
        text: '서울에 가___ 친구도 만날까? 밥 먹___ 영화도 봐. 출장 가___ 쇼핑도 해야겠어.',
        blanks: [
          { options: ['는 김에', '으면서'], answer: '는 김에', explain: '-는 김에 con viaje.' },
          { options: ['는 김에', '으면서'], answer: '는 김에', explain: '-는 김에 con comida.' },
          { options: ['는 김에', '으면서'], answer: '는 김에', explain: '-는 김에 con trabajo.' },
        ],
      },
      {
        id: 'level-3',
        title: 'Escritura de aprovechamiento',
        tag: 'Oportunidad',
        intro: 'Escribe sugerencias aprovechando situaciones.',
        type: 'freeText',
        scene: 'Propuestas de aprovechar oportunidades.',
        text: '1. [[0]] (Ya que salimos, compremos leche). 2. [[1]] (De camino al trabajo, vemos amigos). 3. [[2]] (Mientras estudiamos, comer también).',
        blanks: [
          { answer: '나가는 김에 우유도 사와', accepted: ['는 김에', '사오'], explain: '-는 김에 con compras.' },
          { answer: '출근하는 김에 친구도 만나자', accepted: ['는 김에', '만나'], explain: '-는 김에 con viaje.' },
          { answer: '공부하는 김에 밥도 먹자', accepted: ['는 김에', '먹'], explain: '-는 김에 con comida.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Análise de -는 김에 vs -으면서',
        tag: 'Análise',
        intro: 'Explica la diferencia de implicatura.',
        type: 'write',
        items: [
          {
            scene: 'Aprovechamiento vs simultaneidad',
            prompt: '"나가는 김에 물도 사오겠어요" vs "나가면서 물도 사오겠어요": ¿cuál es la diferencia?',
            answer: '-는 김에 enfatiza aprovechamiento: ya que estoy saliendo, también compraré agua (eficiencia). -으면서 es solo simultaneidad: mientras salgo, también compro agua (dos cosas a la vez, sin énfasis).',
            accepted: ['기회', '효율', '동시'],
            explain: '-는 김에 es oportunismo; -으면서 es simultaneidad simple.',
          },
        ],
      },
    ],
  },
}

export default topic
