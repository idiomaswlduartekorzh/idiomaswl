import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'despues-gona-seo-b1',
  order: '13',
  color: '#c60c30',
  category: 'Tiempo y secuencia',
  level: 'B1',
  title: '-고 나서: Después de (con intervalo) en Coreano B1',
  shortTitle: '-고 나서 (después de)',
  metaTitle: '-고 나서 en Coreano B1 — Expresar Secuencia con Intervalo',
  description:
    '-고 나서 expresa que una acción sucede después de otra CON posibilidad de intervalo. "Después de X, Y." Diferente de -자마자 (inmediato). Literal: "-고" (conector) + "나서" (salir después). Fundamental para narrativa temporal con pauses naturales en B1.',
  lead: 'Domina -고 나서 para expresar: "después de..., luego..."',
  outcomes: [
    'Forma secuencia con intervalo usando -고 나서',
    'Expresa pasos en procesos con pausas',
    'Distingues -고 나서 de -자마자 (inmediato)',
    'Usa en narrativa de procedimientos y historias',
  ],

  guide: {
    goal: 'Expresar acciones que suceden después de otras, permitiendo intervalo temporal.',
    model: '학교에 간 후 집에 갔어요. 밥 먹고 나서 영화를 봤어요. (Después de ir a la escuela, fui a casa. Después de comer, vi una película.)',
    formula: '동사 + -고 나서',
    decisions: [
      '-고 나서: secuencia con intervalo posible',
      '과거형 사용: 갔고 나서, 먹고 나서',
      'vs -자마자: -고 나서 permite tiempo entre acciones',
      '매우 자연스러운 표현 (매일의 절차)',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-고 나서', 'Después de (con intervalo)', '먹고 나서 → después de comer (hay intervalo)'],
      ['vs -자마자', 'Inmediato (sin intervalo)', '먹자마자 → tan pronto comí (instantáneo)'],
    ],
    mistakes: [
      '「먹고 나서 영화를 봤어요」 ✓ (después de comer, vi una película — con intervalo natural). 「먹자마자 영화를 봤어요」 implica inmediatez (en cuanto comí).',
      'No confundir -고 나서 (secuencia con posible pausa) con -고 (simple conexión sin implicar orden estricto).'],
  },

  seo: [
    {
      heading: '-고 나서: Secuencia natural con pauses',
      paragraphs: [
        '-고 나서 es la forma natural de expresar secuencia en narrativa cotidiana. Permite intervalo temporal natural entre acciones: "después de ir, hice X" (hay tiempo entre ir y hacer X).',
        'Se usa constantemente en coreano para describir procesos, rutinas, historias. Mucho más natural que -자마자 en contextos ordinarios.',
      ],
    },
    {
      heading: '-고 나서 vs -자마자 (intervalo vs inmediato)',
      paragraphs: [
        '-고 나서: "밥 먹고 나서 영화를 봤어요" (comí, luego vi película — tiempo entre ambas acciones es natural).',
        '-자마자: "밥 먹자마자 나갔어요" (tan pronto comí, me fui — sin tiempo entre ellas). Diferencia clave: -고 나서 es procedimiento natural; -자마자 es reacción inmediata.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-고 나서 (secuencia con intervalo)',
    graphicPrompt: 'Tabla: -고 나서 vs -자마자.',
    scene: [
      ['밥 먹고 나서 영화를 봤어요.', 'Después de comer, vi una película.'],
      ['학교 가고 나서 집에 갔어요.', 'Después de ir a la escuela, fui a casa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['순서', '간격'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -고 나서',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -고 나서',
            lines: [['', '밥을 먹___ 영화를 봤어요.']],
            options: ['고 나서', '자마자', '으면서', '-어서'],
            answer: '고 나서',
            explain: '먹다 → 먹고 나서 (después de comer).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Secuencia narrativa',
        tag: 'Narrativa',
        intro: 'Completa una rutina con -고 나서.',
        type: 'guidedText',
        scene: 'Descripción de actividades del día.',
        text: '아침에 일어나[[0]] 밥을 먹었어요. 밥 먹[[1]] 학교에 갔어요. 학교 다니[[2]] 집에 돌아왔어요.',
        blanks: [
          { options: ['고 나서', '자마자'], answer: '고 나서', explain: '-고 나서 para rutina.' },
          { options: ['고 나서', '자마자'], answer: '고 나서', explain: '-고 나서 para procedimiento.' },
          { options: ['고 나서', '자마자'], answer: '고 나서', explain: '-고 나서 para final del día.' },
        ],
      },
      {
        id: 'level-3',
        title: 'Escritura de rutina',
        tag: 'Narrativa',
        intro: 'Describe tu rutina usando -고 나서.',
        type: 'freeText',
        scene: 'Mi día típico.',
        text: '1. [[0]] (Después de despertar). 2. [[1]] (Después de desayunar). 3. [[2]] (Después de trabajar).',
        blanks: [
          { answer: '일어나고 나서 밥을 먹어요', accepted: ['-고 나서'], explain: '-고 나서 con rutina matinal.' },
          { answer: '밥 먹고 나서 학교에 가요', accepted: ['-고 나서'], explain: '-고 나서 con salida.' },
          { answer: '일하고 나서 집에 와요', accepted: ['-고 나서'], explain: '-고 나서 con regreso.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Análise de -고 나서 vs -자마자',
        tag: 'Análise',
        intro: 'Explica cuándo usar cada forma.',
        type: 'write',
        items: [
          {
            scene: 'Diferencia de contexto',
            prompt: '"밥 먹고 나서" vs "밥 먹자마자": ¿en qué contexto usa cada uno?',
            answer: '-고 나서 en rutina normal (comer, luego algo más). -자마자 en reacción inmediata o emoción (tan pronto comí, reaccioné). -고 나서 es procedimiento; -자마자 es urgencia.',
            accepted: ['절차', '즉각', '감정'],
            explain: '-고 나서 para rutina; -자마자 para inmediatez.',
          },
        ],
      },
    ],
  },
}

export default topic
