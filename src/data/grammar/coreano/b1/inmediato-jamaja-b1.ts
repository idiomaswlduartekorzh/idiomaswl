import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'inmediato-jamaja-b1',
  order: '12',
  color: '#c60c30',
  category: 'Tiempo y secuencia',
  level: 'B1',
  title: '-자마자: Inmediatamente Después en Coreano B1',
  shortTitle: '-자마자 (tan pronto como, inmediatamente después)',
  metaTitle: '-자마자 en Coreano B1 — Expresar Acciones Inmediatas',
  description:
    '-자마자 expresa que una acción sucede inmediatamente después de otra sin intervalo. "Tan pronto como X, Y." Literal: "-자" (tiempo/momento) + "마자" (en el instante). Muy coreano, diferente del español. Fundamental para narración temporal precisa en B1.',
  lead: 'Domina -자마자 para expresar: "tan pronto como..., inmediatamente..."',
  outcomes: [
    'Forma secuencia inmediata con -자마자',
    'Expresa acciones que suceden sin intervalo',
    'Usa en narrativa temporal precisa',
    'Distingues de -자마자 de -고 나서 (luego, con intervalo)',
  ],

  guide: {
    goal: 'Expresar que una acción sucede inmediatamente después de otra.',
    model: '학교에 가자마자 숙제를 했어요. 전화가 오자마자 받았어요. (Tan pronto llegué a la escuela, hice la tarea. Tan pronto sonó el teléfono, lo contesté.)',
    formula: '동사 + -자마자',
    decisions: [
      '-자마자: inmediatamente después, sin intervalo',
      '과거형: 갔자마자, 왔자마자',
      'No tiene futuro; expresa lo que pasó/pasa',
      '같은 주어만 가능: 나는 왔자마자 vs 내가 올 때 누군가 왔자마자 (sujetos diferentes)',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-자마자', 'Inmediatamente después', '도착하자마자 → tan pronto como llegué'],
      ['vs -고 나서', 'Con intervalo', '도착하고 나서 → después de llegar (hay intervalo)'],
    ],
    mistakes: [
      '"-자마자" con sujetos diferentes es raro; usa "-자" solo para mismo sujeto.',
      '"전화가 오자마자 받았어요" ✓ (pasivo, pero mismo evento).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -자마자?',
      paragraphs: [
        '-자마자 expresa que una acción ocurre inmediatamente después de otra, sin tiempo para ningún intervalo. Es muy coreano y diferente de construcciones en español.',
        'Se usa en narrativa para marcar sucesión temporal rápida: historias, recuentos de eventos, explicaciones de secuencias de hechos.',
      ],
    },
    {
      heading: '-자마자 vs -고 나서 (intervalo)',
      paragraphs: [
        '-자마자: "tan pronto como X, Y" (inmediato). 학교 와자마자 밥을 먹었어요 (tan pronto llegué a la escuela, comí).',
        '-고 나서: "después de X, Y" (con posible intervalo). 학교 오고 나서 밥을 먹었어요 (después de llegar a la escuela, comí — hay intervalo). Diferencia clara: -자마자 es rapidísimo; -고 나서 permite tiempo.',
      ],
    },
    {
      heading: 'Con verbos en pasado: -자마자 siempre pasado',
      paragraphs: [
        '-자마자 se usa principalmente en narrativa pasada: "왔자마자", "했자마자", "들었자마자". Raramente con presente/futuro porque implica sucesión instantánea que ya ocurrió.',
        'Ejemplo: "도착했자마자 폭우가 내리기 시작했어요" (tan pronto llegué, comenzó una lluvia torrencial). Narrativa de sucesos consecutivos rápidos.',
      ],
    },
    {
      heading: 'Con estructuras de mismo sujeto',
      paragraphs: [
        '-자마자 requiere típicamente el mismo sujeto: "내가 왔자마자 그게 울었어요" (cuando yo llegué, eso lloró). Los sujetos diferentes son posibles pero menos comunes.',
        'Más natural con sujeto implícito: "도착하자마자 누군가 날 봤어" (tan pronto llegué, alguien me vio — sujeto "alguien" es extraño).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-자마자: sucesión inmediata vs -고 나서 (con intervalo).',
    graphicPrompt: 'Tabla: -자마자 (instantáneo) vs -고 나서 (con pausa). Ejemplos.',
    scene: [
      ['집에 가자마자 쉬었어요.', 'Tan pronto llegué a casa, descansé.'],
      ['전화가 오자마자 받았어요.', 'Tan pronto sonó el teléfono, lo contesté.'],
      ['강의가 끝나자마자 나갔어요.', 'Tan pronto terminó la clase, me fui.'],
      ['편지를 받자마자 읽었어요.', 'Tan pronto recibí la carta, la leí.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['즉시성', '과거형', '-고 나서 대비'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -자마자',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -자마자',
            lines: [['', '집에 가___ 쉬었어요.']],
            options: ['자마자', '자 마자', '으면서', '-고 나서'],
            answer: '자마자',
            explain: '가다 → 가자마자.',
          },
          {
            scene: '-자마자 vs -고 나서',
            lines: [['', '도착___ 폭우가 내렸어요. (instantáneo)']],
            options: ['하자마자', '했자마자', '고 나서', '으면'],
            answer: '했자마자',
            explain: '-자마자 para sucesión inmediata.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Narrativa temporal inmediata',
        tag: 'Secuencia',
        intro: 'Completa narrativa con sucesión inmediata.',
        type: 'guidedText',
        scene: 'Recuento de eventos rápidos.',
        text: '학교에 도착하[[0]] 비가 내리기 시작했어요. 강의가 끝나[[1]] 모두 나갔어요. 핸드폰이 울리[[2]] 받았어요.',
        blanks: [
          { options: ['자마자', '고 나서'], answer: '자마자', explain: '-자마자 para inmediato.' },
          { options: ['자마자', '고 나서'], answer: '자마자', explain: '-자마자 para sucesión rápida.' },
          { options: ['자마자', '고 나서'], answer: '자마자', explain: '-자마자 para respuesta inmediata.' },
        ],
      },
      {
        id: 'level-3',
        title: 'Escritura de sucesiones',
        tag: 'Narrativa',
        intro: 'Escribe sucesiones inmediatas.',
        type: 'freeText',
        scene: 'Descripción de eventos consecutivos rápidos.',
        text: '1. [[0]] (Tan pronto llegué). 2. [[1]] (Tan pronto recibí). 3. [[2]] (Tan pronto comenzó).',
        blanks: [
          { answer: '집에 가자마자 잤어요', accepted: ['-자마자', '가'], explain: '-자마자 con llegada.' },
          { answer: '편지를 받자마자 읽었어요', accepted: ['-자마자', '받'], explain: '-자마자 con recepción.' },
          { answer: '영화가 시작하자마자 떠들었어요', accepted: ['-자마자', '시작'], explain: '-자마자 con inicio.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Análise de -자마자 vs -고 나서',
        tag: 'Análise',
        intro: 'Explica la diferencia de intervalo.',
        type: 'write',
        items: [
          {
            scene: 'Inmediatez vs intervalo',
            prompt: '"왔자마자" vs "오고 나서": ¿cuál implica intervalo?',
            answer: '"왔자마자" = instantáneo, sin intervalo. "오고 나서" = llegó, luego (hay tiempo entre llegar y lo que sigue). Diferencia clave de velocidad temporal.',
            accepted: ['즉시', '간격', '시간 차이'],
            explain: '-자마자 es inmediato; -고 나서 permite intervalo.',
          },
        ],
      },
    ],
  },
}

export default topic
