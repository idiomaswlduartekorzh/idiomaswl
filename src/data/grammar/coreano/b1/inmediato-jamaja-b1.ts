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
    '-자마자 expresa que una acción sucede inmediatamente después de otra: «tan pronto como A, B». Se une directamente a la raíz verbal y no recibe una marca de pasado propia. Es fundamental para narrar secuencias rápidas con precisión.',
  lead: 'Domina -자마자 para enlazar dos hechos sin intervalo: «tan pronto como ocurre A, sucede B» en narraciones y planes.',
  outcomes: [
    'Forma secuencia inmediata con -자마자',
    'Expresa acciones que suceden sin intervalo',
    'Usa en narrativa temporal precisa',
    'Distingues -자마자 de -고 나서 (después, con intervalo posible)',
  ],

  guide: {
    goal: 'Expresar que una acción sucede inmediatamente después de otra.',
    model: '학교에 가자마자 숙제를 했어요. 전화가 오자마자 받았어요. (Tan pronto llegué a la escuela, hice la tarea. Tan pronto sonó el teléfono, lo contesté.)',
    formula: '동사 + -자마자',
    decisions: [
      '-자마자: inmediatamente después, sin intervalo',
      'Se añade directamente a la raíz verbal: 가다 → 가자마자, 오다 → 오자마자',
      'La primera acción no marca tiempo; el tiempo aparece en el verbo principal',
      'Las dos cláusulas pueden compartir sujeto o tener sujetos diferentes',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['V-자마자', 'Inmediatamente después', '도착하자마자 → tan pronto como llegué'],
      ['vs -고 나서', 'Con intervalo', '도착하고 나서 → después de llegar (hay intervalo)'],
    ],
    mistakes: [
      'No conjugues la primera acción en pasado: "왔자마자" ❌ → "오자마자" ✓.',
      'No separes la forma: "자 마자" ❌ → "자마자" ✓.',
      'El verbo principal sí marca el tiempo: 도착하자마자 전화했어요 / 전화할게요.',
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
      heading: '¿Cuál es la diferencia entre -자마자 y -고 나서?',
      paragraphs: [
        '-자마자: "tan pronto como X, Y" (inmediato). 학교에 오자마자 밥을 먹었어요 (tan pronto llegué a la escuela, comí).',
        '-고 나서: "después de X, Y" (con posible intervalo). 학교 오고 나서 밥을 먹었어요 (después de llegar a la escuela, comí — hay intervalo). Diferencia clara: -자마자 es rapidísimo; -고 나서 permite tiempo.',
      ],
    },
    {
      heading: '¿Cómo se usa -자마자 con el tiempo pasado?',
      paragraphs: [
        '-자마자 no lleva tiempo propio: se une a la raíz verbal y el tiempo aparece en el verbo principal. Por eso se dice 오자마자, 하자마자 y 듣자마자, nunca 왔자마자 o 했자마자.',
        'Puede describir pasado o futuro: 도착하자마자 비가 내리기 시작했어요 (tan pronto llegué, empezó a llover) / 도착하자마자 전화할게요 (te llamaré apenas llegue).',
      ],
    },
    {
      heading: '¿Pueden cambiar los sujetos con -자마자?',
      paragraphs: [
        'Las dos cláusulas pueden compartir sujeto: 집에 오자마자 잤어요 (apenas llegué a casa, dormí). También pueden tener sujetos diferentes: 내가 집에 도착하자마자 비가 내리기 시작했어요 (apenas llegué a casa, empezó a llover).',
        'Cuando los sujetos cambian, conviene expresarlos para evitar ambigüedad. La relación central sigue siendo temporal: la segunda acción ocurre inmediatamente después de la primera.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-자마자: sucesión inmediata vs -고 나서 (con intervalo).',
    graphicPrompt: 'Tabla: -자마자 (instantáneo) vs -고 나서 (con pausa). Ejemplos.',
    scene: [
      ['집에 도착하자마자 쉬었어요.', 'Tan pronto llegué a casa, descansé.'],
      ['전화가 오자마자 받았어요.', 'Tan pronto sonó el teléfono, lo contesté.'],
      ['강의가 끝나자마자 나갔어요.', 'Tan pronto terminó la clase, me fui.'],
      ['편지를 받자마자 읽었어요.', 'Tan pronto recibí la carta, la leí.'],
      ['집에 도착하자마자 전화할게요.', 'Te llamaré apenas llegue a casa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['즉시성', '과거형', '-고 나서 대비'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -자마자',
        tag: 'Opción múltiple',
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
            lines: [['', '도착하___ 폭우가 내렸어요. (instantáneo)']],
            options: ['자마자', '고 나서', '면서', '면'],
            answer: '자마자',
            explain: '도착하다 → 도착하자마자. La primera acción no se conjuga en pasado.',
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
          { answer: '집에 도착하자마자 잤어요', accepted: ['-자마자', '도착'], explain: '도착하다 → 도착하자마자 para expresar «apenas llegué».' },
          { answer: '편지를 받자마자 읽었어요', accepted: ['-자마자', '받'], explain: '-자마자 con recepción.' },
          { answer: '영화가 시작하자마자 떠들었어요', accepted: ['-자마자', '시작'], explain: '-자마자 con inicio.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Análisis de -자마자 vs -고 나서',
        tag: 'Análisis',
        intro: 'Explica la diferencia de intervalo.',
        type: 'write',
        items: [
          {
            scene: 'Inmediatez vs intervalo',
            prompt: '"오자마자" vs "오고 나서": ¿cuál implica intervalo?',
            answer: '"오자마자" = instantáneo, sin intervalo. "오고 나서" = después de venir, con posibilidad de una pausa antes de la siguiente acción.',
            accepted: ['즉시', '간격', '시간 차이'],
            explain: '-자마자 es inmediato; -고 나서 permite intervalo.',
          },
        ],
      },
    ],
  },
}

export default topic
